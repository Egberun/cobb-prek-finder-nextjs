import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Star, Clock, Users, Award } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  type: string;
  address: string;
  rating: number;
  price: string;
  schedule: string;
  capacity: string;
  qualityRating: string;
  programs: string[];
  features: string[];
}

interface PreKResultsProps {
  facilities?: Facility[];
  isLoading?: boolean;
}

const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-xl mb-1">{facility.name}</CardTitle>
          <div className="text-sm text-gray-600 flex items-center">
            <MapPin size={16} className="mr-1" />
            {facility.address}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= facility.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 mt-1">
            {facility.qualityRating} Quality Rated
          </span>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <DollarSign size={18} className="mr-2" />
            <span>{facility.price}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock size={18} className="mr-2" />
            <span>{facility.schedule}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users size={18} className="mr-2" />
            <span>Capacity: {facility.capacity}</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Programs</h4>
          <div className="flex flex-wrap gap-2">
            {facility.programs.map((program, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {program}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Key Features</h4>
        <div className="grid grid-cols-2 gap-2">
          {facility.features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-700">
              <Award size={16} className="mr-2" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          Compare
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </CardContent>
  </Card>
);

export default function PreKResults({ facilities = [], isLoading = false }: PreKResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        <div className="animate-pulse bg-gray-200 h-40 rounded-lg" />
        <div className="animate-pulse bg-gray-200 h-40 rounded-lg" />
        <div className="animate-pulse bg-gray-200 h-40 rounded-lg" />
      </div>
    );
  }

  if (facilities.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-8 text-center text-gray-500">
          <div className="text-lg mb-2">No facilities found</div>
          <div className="text-sm">Try adjusting your search filters</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Found {facilities.length} Pre-K Facilities
        </h2>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Sort by Rating</option>
          <option>Sort by Distance</option>
          <option>Sort by Price</option>
        </select>
      </div>

      <div className="space-y-4">
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
}