import React, { useState } from 'react';

interface FilterState {
  type: string;
  priceRange: string;
  rating: number;
  distance: number;
  programs: string[];
  schedule: string;
}

export default function PreKSearch() {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    priceRange: 'all',
    rating: 0,
    distance: 0,
    programs: [],
    schedule: 'all',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Find Your Perfect Pre-K</h2>
      
      {/* Search inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by facility name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <span className="absolute left-3 top-3 text-gray-400">
            🔍
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <span className="absolute left-3 top-3 text-gray-400">
            📍
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facility Type Filter */}
        <div>
          <h3 className="font-semibold mb-2">Facility Type</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="all"
                checked={filters.type === 'all'}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="mr-2"
              />
              All Types
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="public"
                checked={filters.type === 'public'}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="mr-2"
              />
              Public Pre-K
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="private"
                checked={filters.type === 'private'}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="mr-2"
              />
              Private Pre-K
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="all"
                checked={filters.priceRange === 'all'}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="mr-2"
              />
              All Prices
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="free"
                checked={filters.priceRange === 'free'}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="mr-2"
              />
              Free (Georgia Pre-K)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="low"
                checked={filters.priceRange === 'low'}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="mr-2"
              />
              Under $500/month
            </label>
          </div>
        </div>

        {/* Programs Filter */}
        <div>
          <h3 className="font-semibold mb-2">Special Programs</h3>
          <div className="space-y-2">
            {[
              'Georgia Pre-K Program',
              'Special Needs Services',
              'Language Immersion',
              'STEAM Focus'
            ].map((program) => (
              <label key={program} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.programs.includes(program)}
                  onChange={(e) => {
                    const updatedPrograms = e.target.checked
                      ? [...filters.programs, program]
                      : filters.programs.filter(p => p !== program);
                    setFilters({...filters, programs: updatedPrograms});
                  }}
                  className="mr-2"
                />
                {program}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}