import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search, MapPin, DollarSign, Star, Clock, School } from 'lucide-react';

interface FilterState {
  type: string;
  priceRange: string;
  rating: number;
  distance: number;
  programs: string[];
  schedule: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: FilterOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ElementType;
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

  const programOptions = [
    'Georgia Pre-K Program',
    'Special Needs Services',
    'Language Immersion',
    'STEAM Focus',
    'Faith-Based',
    'Montessori',
  ];

  const scheduleOptions: FilterOption[] = [
    { value: 'all', label: 'All Schedules' },
    { value: 'full', label: 'Full Day' },
    { value: 'half', label: 'Half Day' },
    { value: 'extended', label: 'Extended Hours' },
  ];

  const typeOptions: FilterOption[] = [
    { value: 'all', label: 'All Types' },
    { value: 'public', label: 'Public Pre-K' },
    { value: 'private', label: 'Private Pre-K' },
    { value: 'faith', label: 'Faith-Based' },
  ];

  const priceRangeOptions: FilterOption[] = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free (Georgia Pre-K)' },
    { value: 'low', label: 'Under $500/month' },
    { value: 'medium', label: '$500-$1000/month' },
    { value: 'high', label: 'Over $1000/month' },
  ];

  const RadioGroup: React.FC<RadioGroupProps> = ({ 
    options, 
    name, 
    value, 
    onChange,
    icon: Icon 
  }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="text-blue-600"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );

  const handleFilterChange = (filterName: keyof FilterState, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Find Your Perfect Pre-K</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by facility name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter your location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Facility Type */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <School size={20} className="text-blue-600" />
              Facility Type
            </h3>
            <RadioGroup
              options={typeOptions}
              name="type"
              value={filters.type}
              onChange={(value) => handleFilterChange('type', value)}
            />
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign size={20} className="text-blue-600" />
              Price Range
            </h3>
            <RadioGroup
              options={priceRangeOptions}
              name="priceRange"
              value={filters.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
            />
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Schedule
            </h3>
            <RadioGroup
              options={scheduleOptions}
              name="schedule"
              value={filters.schedule}
              onChange={(value) => handleFilterChange('schedule', value)}
            />
          </div>
        </div>

        {/* Programs */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Special Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {programOptions.map((program) => (
              <label key={program} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.programs.includes(program)}
                  onChange={(e) => {
                    const updatedPrograms = e.target.checked
                      ? [...filters.programs, program]
                      : filters.programs.filter(p => p !== program);
                    handleFilterChange('programs', updatedPrograms);
                  }}
                  className="text-blue-600"
                />
                <span className="text-sm">{program}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}