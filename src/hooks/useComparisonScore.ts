import { useMemo } from 'react';
import type { Facility } from '../types/facility';
import type { ComparisonFilter, ComparisonMetric } from './useComparisonFilters';

function calculateMetricScore(
  facility: Facility,
  metric: ComparisonMetric,
  baseLocation?: { lat: number; lng: number }
): number {
  switch (metric) {
    case 'rating':
      return (facility.rating.stars / 5) * 100;

    case 'price':
      if (facility.price.type === 'free') return 100;
      // Assuming average monthly cost is $800
      if (!facility.price.amount) return 50;
      return Math.max(0, 100 - ((facility.price.amount / 800) * 100));

    case 'capacity':
      // Score based on available spots relative to total
      return (facility.capacity.available / facility.capacity.total) * 100;

    case 'location':
      if (!baseLocation) return 50;
      // Calculate distance score - closer is better
      const distance = Math.sqrt(
        Math.pow(facility.location.lat - baseLocation.lat, 2) +
        Math.pow(facility.location.lng - baseLocation.lng, 2)
      );
      // Assuming max relevant distance is 20 miles
      return Math.max(0, 100 - ((distance / 20) * 100));

    case 'programs':
      // More programs = better score (max 10 programs)
      return Math.min(100, (facility.programs.length / 10) * 100);

    case 'features':
      // More features = better score (max 10 features)
      return Math.min(100, (facility.features.length / 10) * 100);

    default:
      return 0;
  }
}

export function useComparisonScore(
  facility: Facility,
  filters: ComparisonFilter[],
  baseLocation?: { lat: number; lng: number }
) {
  const score = useMemo(() => {
    return filters.reduce((total, filter) => {
      const metricScore = calculateMetricScore(facility, filter.metric, baseLocation);
      return total + (metricScore * filter.weight);
    }, 0);
  }, [facility, filters, baseLocation]);

  const metricScores = useMemo(() => {
    return filters.reduce((acc, filter) => ({
      ...acc,
      [filter.metric]: calculateMetricScore(facility, filter.metric, baseLocation)
    }), {} as Record<ComparisonMetric, number>);
  }, [facility, filters, baseLocation]);

  return {
    totalScore: Math.round(score),
    metricScores
  };
}
