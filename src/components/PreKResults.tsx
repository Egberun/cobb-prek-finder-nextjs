import React from 'react';

interface Facility {
  id: string;
  name: string;
  type: 'public' | 'private' | 'faith-based';
  address: string;
  rating: number;
  programs: string[];
  features: string[];
  price: string;
}

interface PreKResultsProps {
  facilities?: Facility[];
  isLoading?: boolean;
}

const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => (
  <div className="bg-white rounded-lg shadow mb-4 p-6">
    <div className="flex justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
        <p className="text-gray-600 mb-2">{facility.address}</p>
      </div>
      <div className="text-right">
        <div className="flex mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-xl ${star <= facility.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-gray-600">{facility.price}</p>
      </div>
    </div>

    <div className="mt-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {facility.programs.map((program, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {program}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {facility.features.map((feature, index) => (
          <div key={index} className="flex items-center text-gray-600">
            <span className="mr-2">✓</span>
            <span>{feature}</span>
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
  </div>
);

export default function PreKResults({ 
  facilities = [], 
  isLoading = false 
}: PreKResultsProps) {
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
      <div className="mt-8 text-center py-12 bg-white rounded-lg shadow">
        <p className="text-xl text-gray-600">No facilities found</p>
        <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Found {facilities.length} Pre-K Facilities
        </h2>
        <select className="border rounded-lg px-3 py-2">
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