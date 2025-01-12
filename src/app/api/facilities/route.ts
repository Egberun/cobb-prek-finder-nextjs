import { type NextRequest, NextResponse } from 'next/server';
import { sampleFacilities } from '../../../data/sampleFacilities';
import type { SearchFilters } from '../../../types/search';

function filterFacilities(filters: SearchFilters) {
  return sampleFacilities.filter(facility => {
    // Type filter
    if (filters.type !== 'all' && facility.type !== filters.type) return false;

    // Price range filter
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'free' && facility.price.type !== 'free') return false;
      if (filters.priceRange === 'low' && facility.price.type === 'paid' && 
          facility.price.amount && facility.price.amount > 500) return false;
    }

    // Rating filter
    if (filters.rating > 0 && facility.rating.stars < filters.rating) return false;

    // Programs filter
    if (filters.programs.length > 0) {
      const hasAllPrograms = filters.programs.every(program =>
        facility.programs.includes(program)
      );
      if (!hasAllPrograms) return false;
    }

    // Schedule filter
    if (filters.schedule !== 'all' && facility.schedule.type !== filters.schedule) return false;

    return true;
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Parse filters from query params
  const filters: SearchFilters = {
    type: (searchParams.get('type') as any) || 'all',
    priceRange: (searchParams.get('priceRange') as any) || 'all',
    rating: parseInt(searchParams.get('rating') || '0'),
    distance: parseInt(searchParams.get('distance') || '0'),
    programs: searchParams.get('programs')?.split(',') || [],
    schedule: (searchParams.get('schedule') as any) || 'all'
  };

  // Apply filters
  const filteredFacilities = filterFacilities(filters);

  // Handle pagination
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  const paginatedFacilities = filteredFacilities.slice(start, end);

  return NextResponse.json({
    facilities: paginatedFacilities,
    total: filteredFacilities.length,
    page,
    pageSize,
    hasMore: end < filteredFacilities.length
  });
}
