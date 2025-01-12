import type { Facility } from '../types/facility';
import type { SearchFilters, SearchResults } from '../types/search';

export async function searchFacilities(
  filters: SearchFilters,
  page = 1,
  pageSize = 10
): Promise<SearchResults> {
  const queryParams = new URLSearchParams({
    ...filters,
    programs: filters.programs.join(','),
    page: page.toString(),
    pageSize: pageSize.toString()
  });

  const response = await fetch(`/api/facilities?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch facilities');

  return response.json();
}

export async function getFacility(id: string): Promise<Facility> {
  const response = await fetch(`/api/facilities/${id}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error('Facility not found');
    throw new Error('Failed to fetch facility');
  }

  return response.json();
}

export async function getNearbySuggestions(
  latitude: number,
  longitude: number,
  radius = 5
): Promise<Facility[]> {
  const queryParams = new URLSearchParams({
    lat: latitude.toString(),
    lng: longitude.toString(),
    radius: radius.toString()
  });

  const response = await fetch(`/api/facilities/nearby?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch nearby facilities');

  return response.json();
}
