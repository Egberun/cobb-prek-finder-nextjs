import { useState, useCallback, useEffect } from 'react';
import { Facility } from '@/types/facility';
import { sampleFacilities } from '@/data/sampleFacilities';
import { getPriceRange } from '@/lib/utils/facility';

interface SearchFilters {
  type: string;
  priceRange: string;
  rating: number;
  distance: number;
  programs: string[];
  schedule: string;
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    priceRange: 'all',
    rating: 0,
    distance: 0,
    programs: [],
    schedule: 'all',
  });
  const [results, setResults] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFacilities = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      let filtered = [...sampleFacilities];

      // Apply text search
      if (searchQuery) {
        filtered = filtered.filter(facility =>
          facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facility.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply filters
      filtered = filtered.filter(facility => {
        // Type filter
        if (filters.type !== 'all' && facility.type !== filters.type) return false;

        // Price range filter
        if (filters.priceRange !== 'all') {
          const facilityPriceRange = getPriceRange(facility.price);
          if (facilityPriceRange !== filters.priceRange) return false;
        }

        // Rating filter
        if (filters.rating > 0 && facility.rating < filters.rating) return false;

        // Schedule filter
        if (filters.schedule !== 'all' && 
            facility.schedule.type !== filters.schedule) return false;

        // Programs filter
        if (filters.programs.length > 0) {
          const hasAllPrograms = filters.programs.every(program =>
            facility.programs.includes(program)
          );
          if (!hasAllPrograms) return false;
        }

        return true;
      });

      setResults(filtered);
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, [searchQuery, location, filters]);

  // Trigger search when filters or query change
  useEffect(() => {
    searchFacilities();
  }, [searchFacilities]);

  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    filters,
    setFilters,
    results,
    isLoading
  };
}