import React, { useState, useEffect, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ListingCard, type RentalListing } from '@/components/rental/ListingCard';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  RefreshCw,
  Home,
  TrendingDown,
  DollarSign,
  Calendar,
  Search,
  MapPin,
} from 'lucide-react';

const CURRENT_RENT = 4600;
const AGENT_NAME = 'My Realtor';

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = 'text-gray-900',
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <Card className="border-gray-200">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="bg-gray-100 rounded-lg p-2.5">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className={`text-lg font-bold leading-tight ${color}`}>{value}</p>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function RentalDashboard() {
  const [listings, setListings] = useState<RentalListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rental_listings' as never)
        .select('*')
        .order('search_date', { ascending: false })
        .order('price', { ascending: true })
        .limit(10) as { data: RentalListing[] | null; error: unknown };

      if (error) throw error;
      const rows = data ?? [];
      setListings(rows);
      if (rows.length > 0) setLastUpdated(rows[0].search_date);
    } catch (err) {
      console.error('Failed to load listings:', err);
      toast({ title: 'Error loading listings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const runSearch = async () => {
    setSearching(true);
    toast({ title: `${AGENT_NAME} is searching…`, description: 'This usually takes 30–90 seconds.' });
    try {
      const { error } = await supabase.functions.invoke('my-realtor');
      if (error) throw error;
      toast({ title: 'Search complete!', description: 'Fresh listings loaded.' });
      await fetchListings();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Search failed';
      toast({ title: 'Search failed', description: msg, variant: 'destructive' });
    } finally {
      setSearching(false);
    }
  };

  // Stats derived from listings
  const todayListings = listings.filter((l) => l.search_date === lastUpdated);
  const underBudget = todayListings.filter((l) => l.price < CURRENT_RENT);
  const avgPrice =
    todayListings.length > 0
      ? Math.round(todayListings.reduce((s, l) => s + l.price, 0) / todayListings.length)
      : 0;
  const bestPrice = todayListings.length > 0 ? Math.min(...todayListings.map((l) => l.price)) : 0;
  const bestSavings = bestPrice > 0 ? CURRENT_RENT - bestPrice : 0;

  const formatDate = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-CA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Home className="h-5 w-5 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{AGENT_NAME}</h1>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                AI Agent
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              4-bedroom townhouses · Hamilton, Ontario · Under ${CURRENT_RENT.toLocaleString()}/mo
            </p>
          </div>
          <Button
            onClick={runSearch}
            disabled={searching || loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {searching ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {searching ? 'Searching…' : 'Run Search Now'}
          </Button>
        </div>

        {/* Last updated banner */}
        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white border border-gray-200 rounded-lg px-4 py-2.5 w-fit">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Last searched: <strong className="text-gray-700">{formatDate(lastUpdated)}</strong></span>
          </div>
        )}

        {/* Stats */}
        {todayListings.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard
              icon={DollarSign}
              label="Your Budget"
              value={`$${CURRENT_RENT.toLocaleString()}`}
              sub="current monthly rent"
            />
            <StatCard
              icon={TrendingDown}
              label="Best Savings"
              value={bestSavings > 0 ? `$${bestSavings.toLocaleString()}/mo` : '—'}
              sub={bestPrice > 0 ? `at $${bestPrice.toLocaleString()}/mo` : undefined}
              color={bestSavings > 0 ? 'text-green-600' : 'text-gray-900'}
            />
            <StatCard
              icon={Home}
              label="Under Budget"
              value={`${underBudget.length} of ${todayListings.length}`}
              sub="listings found today"
              color="text-blue-600"
            />
            <StatCard
              icon={DollarSign}
              label="Avg Price"
              value={avgPrice > 0 ? `$${avgPrice.toLocaleString()}` : '—'}
              sub="across today's results"
            />
          </div>
        )}

        {/* Listings grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="h-64 border-gray-200 animate-pulse">
                <CardContent className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
                  <div className="h-6 bg-gray-200 rounded mb-2 w-1/2" />
                  <div className="h-3 bg-gray-200 rounded mb-2 w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Home className="h-12 w-12 text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No listings yet</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              Click <strong>Run Search Now</strong> to let {AGENT_NAME} search REALTOR.ca, Kijiji,
              Rentals.ca, Zumper, PadMapper and more for 4-bedroom townhouses in Hamilton.
            </p>
            <Button onClick={runSearch} disabled={searching} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="h-4 w-4 mr-2" />
              Run First Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {listings.map((listing, i) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                budget={CURRENT_RENT}
                rank={i + 1}
              />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
