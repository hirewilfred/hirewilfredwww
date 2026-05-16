import { ExternalLink, MapPin, BedDouble, Bath } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface RentalListing {
  id: string;
  search_date: string;
  title: string;
  address: string | null;
  neighbourhood: string | null;
  price: number;
  bedrooms: number;
  bathrooms: number | null;
  source: string;
  url: string;
  description: string | null;
  amenities: string[] | null;
}

interface ListingCardProps {
  listing: RentalListing;
  budget: number;
  rank: number;
}

const SOURCE_COLORS: Record<string, string> = {
  'REALTOR.ca': 'bg-red-100 text-red-800 border-red-200',
  'Kijiji': 'bg-green-100 text-green-800 border-green-200',
  'Rentals.ca': 'bg-blue-100 text-blue-800 border-blue-200',
  'Zumper': 'bg-purple-100 text-purple-800 border-purple-200',
  'PadMapper': 'bg-orange-100 text-orange-800 border-orange-200',
  'Facebook Marketplace': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'ViewIt': 'bg-teal-100 text-teal-800 border-teal-200',
  'Point2Homes': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export function ListingCard({ listing, budget, rank }: ListingCardProps) {
  const savings = budget - listing.price;
  const isUnderBudget = listing.price < budget;
  const isGreatDeal = savings >= 500;

  const priceColor = isGreatDeal
    ? 'text-green-600'
    : isUnderBudget
    ? 'text-yellow-600'
    : 'text-red-600';

  const sourceBadge =
    SOURCE_COLORS[listing.source] ?? 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200 border-gray-200">
      <CardContent className="p-5 flex flex-col h-full gap-3">

        {/* Rank + source + price row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-400 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              {rank}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${sourceBadge}`}>
              {listing.source}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-xl font-bold ${priceColor}`}>
              ${listing.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-400">/mo</span>
            </div>
            {isUnderBudget && savings > 0 ? (
              <div className="text-xs text-green-600 font-medium">
                Save ${savings.toLocaleString()}/mo
              </div>
            ) : !isUnderBudget ? (
              <div className="text-xs text-red-500 font-medium">
                ${Math.abs(savings).toLocaleString()} over budget
              </div>
            ) : null}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
          {listing.title}
        </h3>

        {/* Location */}
        {(listing.address || listing.neighbourhood) && (
          <div className="flex items-start gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              {listing.address ?? listing.neighbourhood}
            </span>
          </div>
        )}

        {/* Bed / bath */}
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" />
            {listing.bedrooms} bed
          </span>
          {listing.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {listing.bathrooms} bath
            </span>
          )}
        </div>

        {/* Description */}
        {listing.description && (
          <p className="text-xs text-gray-500 line-clamp-2 flex-grow">
            {listing.description}
          </p>
        )}

        {/* Amenities */}
        {listing.amenities && listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {listing.amenities.slice(0, 4).map((a) => (
              <span key={a} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                {a}
              </span>
            ))}
            {listing.amenities.length > 4 && (
              <span className="text-xs text-gray-400">+{listing.amenities.length - 4}</span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
            <a href={listing.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1.5" />
              View Listing
            </a>
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
