-- My Realtor: daily rental listings table
CREATE TABLE IF NOT EXISTS public.rental_listings (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  search_date  DATE    NOT NULL DEFAULT CURRENT_DATE,
  title        TEXT    NOT NULL,
  address      TEXT,
  neighbourhood TEXT,
  price        INTEGER NOT NULL DEFAULT 0,
  bedrooms     INTEGER NOT NULL DEFAULT 4,
  bathrooms    NUMERIC(3,1),
  source       TEXT    NOT NULL,
  url          TEXT    NOT NULL DEFAULT '',
  description  TEXT,
  amenities    TEXT[]  DEFAULT '{}',
  found_at     TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rental_listings_search_date
  ON public.rental_listings (search_date DESC);

CREATE INDEX IF NOT EXISTS idx_rental_listings_price
  ON public.rental_listings (price ASC);

ALTER TABLE public.rental_listings ENABLE ROW LEVEL SECURITY;

-- Anyone can read listings (public dashboard)
CREATE POLICY "public_read_rental_listings"
  ON public.rental_listings FOR SELECT
  USING (true);

-- Only service role (edge function) can write
CREATE POLICY "service_role_write_rental_listings"
  ON public.rental_listings
  USING (auth.role() = 'service_role');
