import { searchFacilities, getFacility, getNearbySuggestions } from '../lib/api';
import { useAppState } from '../context/AppStateContext';
import { useAppActions } from '../hooks/useAppActions';
import type { SearchFilters } from '../types/search';

export function useFacilityService() {
  const { state } = useAppState();
  const { 
    setFacilities, 
    setLoading, 
    setError,
    setSearchLocation 
  } = useAppActions();

  async function search(filters: SearchFilters, page = 1) {
    try {
      setLoading(true);
      setError(null);

      const results = await searchFacilities(filters, page);
      setFacilities(results.facilities);

      return results;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to search facilities');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function getDetails(id: string) {
    try {
      setLoading(true);
      setError(null);

      const facility = await getFacility(id);
      return facility;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch facility details');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function findNearby(latitude: number, longitude: number, radius?: number) {
    try {
      setLoading(true);
      setError(null);

      setSearchLocation({ lat: latitude, lng: longitude });
      const facilities = await getNearbySuggestions(latitude, longitude, radius);
      setFacilities(facilities);

      return facilities;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to find nearby facilities');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    search,
    getDetails,
    findNearby,
    isLoading: state.isLoading,
    error: state.error
  };
}
