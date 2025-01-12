import { useState, useCallback } from 'react';
import type { Facility } from '../types/facility';

const MAX_COMPARED_FACILITIES = 3;

export function useComparison() {
  const [comparedFacilities, setComparedFacilities] = useState<Facility[]>([]);

  const addToComparison = useCallback((facility: Facility) => {
    setComparedFacilities(prev => {
      // Don't add if already in comparison
      if (prev.some(f => f.id === facility.id)) return prev;
      
      // Don't add if at max capacity
      if (prev.length >= MAX_COMPARED_FACILITIES) return prev;
      
      return [...prev, facility];
    });
  }, []);

  const removeFromComparison = useCallback((facilityId: string) => {
    setComparedFacilities(prev => 
      prev.filter(f => f.id !== facilityId)
    );
  }, []);

  const clearComparison = useCallback(() => {
    setComparedFacilities([]);
  }, []);

  const isInComparison = useCallback((facilityId: string) => {
    return comparedFacilities.some(f => f.id === facilityId);
  }, [comparedFacilities]);

  const canAddMore = comparedFacilities.length < MAX_COMPARED_FACILITIES;

  return {
    comparedFacilities,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore,
    maxFacilities: MAX_COMPARED_FACILITIES
  };
}
