import { useState, useCallback } from 'react';

export type ComparisonMetric = 
  | 'price'
  | 'rating'
  | 'capacity'
  | 'location'
  | 'programs'
  | 'features';

export type ComparisonFilter = {
  metric: ComparisonMetric;
  weight: number;
};

const DEFAULT_FILTERS: ComparisonFilter[] = [
  { metric: 'rating', weight: 0.3 },
  { metric: 'price', weight: 0.2 },
  { metric: 'location', weight: 0.2 },
  { metric: 'programs', weight: 0.15 },
  { metric: 'capacity', weight: 0.1 },
  { metric: 'features', weight: 0.05 }
];

export function useComparisonFilters() {
  const [filters, setFilters] = useState<ComparisonFilter[]>(DEFAULT_FILTERS);

  const updateFilterWeight = useCallback((metric: ComparisonMetric, weight: number) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.metric === metric 
          ? { ...filter, weight }
          : filter
      )
    );
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    updateFilterWeight,
    resetFilters
  };
}
