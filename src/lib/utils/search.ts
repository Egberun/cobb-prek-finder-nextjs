import { SearchFilters, SearchQuery, SortOption } from '@/types/search';
import { Facility } from '@/types/facility';
import { calculateDistance } from './facility';

export const DEFAULT_FILTERS: SearchFilters = {
  type: 'all',
  priceRange: 'all',
  rating: 0,
  distance: 0,
  programs: [],
  schedule: 'all',
};

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Highest Rated', value: 'rating_desc', sortBy: 'rating', sortOrder: 'desc' },
  { label: 'Nearest', value: 'distance_asc', sortBy: 'distance', sortOrder: 'asc' },
  { label: 'Price: Low to High', value: 'price_asc', sortBy: 'price', sortOrder: 'asc' },
  { label: 'Price: High to Low', value: 'price_desc', sortBy: 'price', sortOrder: 'desc' },
];

export function filterFacilities(
  facilities: Facility[],
  query: SearchQuery
): Facility[] {
  return facilities.filter(facility => {
    // Text search
    if (query.text && !matchesSearch(facility, query.text)) {
      return false;
    }

    // Type filter
    if (query.filters.type !== 'all' && facility.type !== query.filters.type) {
      return false;
    }

    // Price range filter
    if (query.filters.priceRange !== 'all' && !matchesPriceRange(facility, query.filters.priceRange)) {
      return false;
    }

    // Rating filter
    if (query.filters.rating > 0 && facility.rating.stars < query.filters.rating) {
      return false;
    }

    // Distance filter
    if (query.filters.distance > 0 && query.location) {
      const distance = calculateDistance(
        query.location.lat,
        query.location.lng,
        facility.location.lat,
        facility.location.lng
      );
      if (distance > query.filters.distance) {
        return false;
      }
    }

    // Schedule filter
    if (query.filters.schedule !== 'all' && 
        facility.schedule.type !== query.filters.schedule) {
      return false;
    }

    // Programs filter
    if (query.filters.programs.length > 0) {
      const hasAllPrograms = query.filters.programs.every(program =>
        facility.programs.includes(program)
      );
      if (!hasAllPrograms) {
        return false;
      }
    }

    return true;
  });
}

function matchesSearch(facility: Facility, searchText: string): boolean {
  const text = searchText.toLowerCase();
  return (
    facility.name.toLowerCase().includes(text) ||
    facility.location.address.toLowerCase().includes(text) ||
    facility.programs.some(program => program.toLowerCase().includes(text))
  );
}

function matchesPriceRange(facility: Facility, priceRange: string): boolean {
  if (facility.price.type === 'free') return priceRange === 'free';
  if (!facility.price.amount) return true; // Include if price unknown

  const monthlyAmount = facility.price.period === 'weekly'
    ? facility.price.amount * 4
    : facility.price.amount;

  switch (priceRange) {
    case 'low':
      return monthlyAmount < 500;
    case 'medium':
      return monthlyAmount >= 500 && monthlyAmount < 1000;
    case 'high':
      return monthlyAmount >= 1000;
    default:
      return true;
  }
}