import { FacilityType, PriceRange, Schedule } from './facility';

export interface SearchFilters {
  type: FacilityType | 'all';
  priceRange: PriceRange | 'all';
  rating: number;
  distance: number;
  programs: string[];
  schedule: Schedule | 'all';
}

export interface SearchLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface SearchQuery {
  text: string;
  location?: SearchLocation;
  filters: SearchFilters;
  sortBy?: 'rating' | 'distance' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResults {
  facilities: Facility[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type SortOption = {
  label: string;
  value: string;
  sortBy: 'rating' | 'distance' | 'price';
  sortOrder: 'asc' | 'desc';
};