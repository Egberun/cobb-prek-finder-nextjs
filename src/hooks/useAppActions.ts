import { useCallback } from 'react';
import { useAppState } from '../context/AppStateContext';
import type { Facility } from '../types/facility';
import type { SearchFilters, SearchLocation } from '../types/search';

export function useAppActions() {
  const { dispatch } = useAppState();

  const setFacilities = useCallback((facilities: Facility[]) => {
    dispatch({ type: 'SET_FACILITIES', payload: facilities });
  }, [dispatch]);

  const setSearchFilters = useCallback((filters: SearchFilters) => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters });
  }, [dispatch]);

  const setSearchLocation = useCallback((location: SearchLocation | null) => {
    dispatch({ type: 'SET_SEARCH_LOCATION', payload: location });
  }, [dispatch]);

  const selectFacility = useCallback((facilityId: string) => {
    dispatch({ type: 'SELECT_FACILITY', payload: facilityId });
  }, [dispatch]);

  const deselectFacility = useCallback((facilityId: string) => {
    dispatch({ type: 'DESELECT_FACILITY', payload: facilityId });
  }, [dispatch]);

  const setComparisonFilters = useCallback((filters: { metric: string; weight: number }[]) => {
    dispatch({ type: 'SET_COMPARISON_FILTERS', payload: filters });
  }, [dispatch]);

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  }, [dispatch]);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [dispatch]);

  return {
    setFacilities,
    setSearchFilters,
    setSearchLocation,
    selectFacility,
    deselectFacility,
    setComparisonFilters,
    setLoading,
    setError
  };
}
