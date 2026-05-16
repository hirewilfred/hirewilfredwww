/**
 * My Realtor — Daily Rental Search Agent
 *
 * Searches REALTOR.ca, Kijiji, Rentals.ca, Zumper, PadMapper, and Facebook
 * Marketplace for 4-bedroom townhouses in Hamilton, Ontario under $4,600/mo.
 * Stores the 10 best results in the rental_listings table.
 *
 * Deploy:
 *   supabase functions deploy my-realtor --project-ref YOUR_PROJECT_REF
 *
 * Secrets required (set via Supabase Dashboard → Settings → Edge Functions):
 *   ANTHROPIC_API_KEY  — your Anthropic API key
 *
 * Daily automation:
 *   Supabase Dashboard → Database → Scheduled Functions → New schedule
 *   Cron: "0 13 * * *"  (1 PM UTC = 8 AM Eastern)
 *   Function: my-realtor
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'npm:@anthropic-ai/sdk'

const BUDGET = 4600  // current monthly rent in CAD
const BEDROOMS = 4
const LOCATION = 'Hamilton, Ontario'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RentalListing {
  title: string
  address: string | null
  neighbourhood: string | null
  price: number
  bedrooms: number
  bathrooms: number | null
  source: string
  url: string
  description: string | null
  amenities: string[]
  search_date: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
    })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const today = new Date().toISOString().split('T')[0]

    const systemPrompt = `You are "My Realtor", a dedicated rental search agent.

MISSION: Find ${BEDROOMS}-bedroom townhouses for rent in ${LOCATION} and surrounding areas.

SEARCH PARAMETERS:
- Current rent: $${BUDGET}/month — find something MORE AFFORDABLE
- Preferred: under $4,000/month
- Maximum: $${BUDGET}/month
- Property type: townhouse (can include semi-detached, end-unit townhome, row house)
- Bedrooms: ${BEDROOMS}
- Areas: Hamilton, Ancaster, Dundas, Stoney Creek, Waterdown, Flamborough, Binbrook, Glanbrook

OUTPUT FORMAT: Return ONLY a valid JSON array of exactly 10 listing objects. No markdown, no explanation, no backticks — just the raw JSON array starting with [ and ending with ].

Each object must have exactly these fields:
{
  "title": "descriptive property title",
  "address": "street address or null if unavailable",
  "neighbourhood": "area/neighbourhood name",
  "price": 3500,
  "bedrooms": 4,
  "bathrooms": 2.5,
  "source": "site name (e.g. Kijiji, REALTOR.ca, Rentals.ca)",
  "url": "https://direct-link-to-listing",
  "description": "2-sentence property description",
  "amenities": ["parking", "in-suite laundry", "garage"]
}

Sort results by price ascending (cheapest first). Prioritize verified, active listings.`

    const userMessage = `Today is ${today}. Search for ${BEDROOMS}-bedroom townhouses for rent in ${LOCATION} under $${BUDGET}/month.

Search all of these sources:
1. site:kijiji.ca "${BEDROOMS} bedroom townhouse Hamilton Ontario rent"
2. site:realtor.ca "townhouse Hamilton Ontario rent"
3. site:rentals.ca "Hamilton Ontario ${BEDROOMS} bedroom"
4. site:zumper.com "Hamilton Ontario ${BEDROOMS} bedroom"
5. site:padmapper.com "Hamilton Ontario ${BEDROOMS} bedrooms"
6. site:facebook.com/marketplace "${BEDROOMS} bedroom townhouse Hamilton rent"
7. site:viewit.ca "Hamilton Ontario townhouse rent"
8. site:point2homes.com "Hamilton Ontario townhouse for rent"
9. "${BEDROOMS} bedroom townhouse for rent Hamilton Ontario" (general search)
10. "Hamilton townhouse rent 2025 4 bedroom affordable"

Extract real, current listings. Return exactly 10 as a JSON array, sorted cheapest first.`

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: userMessage },
    ]

    let finalText = ''
    let iterations = 0
    const MAX_ITERATIONS = 6

    while (iterations < MAX_ITERATIONS) {
      iterations++

      const response = await anthropic.messages.create({
        model: 'claude-opus-4-7',
        max_tokens: 8192,
        thinking: { type: 'adaptive' },
        tools: [
          { type: 'web_search_20260209', name: 'web_search' },
        ],
        system: systemPrompt,
        messages,
      })

      for (const block of response.content) {
        if (block.type === 'text') {
          finalText += block.text
        }
      }

      if (response.stop_reason === 'end_turn') break

      if (response.stop_reason === 'pause_turn') {
        // Server-side tool loop hit limit — append and continue
        messages.push({ role: 'assistant', content: response.content })
        continue
      }

      break
    }

    // Extract JSON array from the response
    let listings: RentalListing[] = []
    try {
      const jsonMatch = finalText.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        listings = (Array.isArray(parsed) ? parsed : []).map((l: Record<string, unknown>) => ({
          title: String(l.title ?? 'Untitled Listing'),
          address: l.address ? String(l.address) : null,
          neighbourhood: l.neighbourhood ? String(l.neighbourhood) : null,
          price: parseInt(String(l.price ?? '0').replace(/[^0-9]/g, ''), 10) || 0,
          bedrooms: parseInt(String(l.bedrooms ?? BEDROOMS), 10) || BEDROOMS,
          bathrooms: l.bathrooms != null ? parseFloat(String(l.bathrooms)) : null,
          source: String(l.source ?? 'Unknown'),
          url: String(l.url ?? ''),
          description: l.description ? String(l.description) : null,
          amenities: Array.isArray(l.amenities) ? l.amenities.map(String) : [],
          search_date: today,
        }))
      }
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'raw:', finalText.slice(0, 300))
      return new Response(
        JSON.stringify({ error: 'Failed to parse listings from agent response' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
      )
    }

    if (listings.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Agent returned no listings', raw: finalText.slice(0, 500) }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
      )
    }

    // Replace today's listings
    await supabase.from('rental_listings').delete().eq('search_date', today)

    const { data, error: insertError } = await supabase
      .from('rental_listings')
      .insert(listings.slice(0, 10))
      .select()

    if (insertError) throw insertError

    console.log(`Stored ${data.length} listings for ${today}`)

    return new Response(
      JSON.stringify({ success: true, count: data.length, search_date: today }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('my-realtor error:', msg)
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    )
  }
})
