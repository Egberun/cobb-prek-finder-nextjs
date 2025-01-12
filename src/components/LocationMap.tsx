import React from 'react';

interface LocationMapProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  nearby?: {
    type: string;
    name: string;
    distance: number;
    lat: number;
    lng: number;
  }[];
}

export function LocationMap({ location, nearby = [] }: LocationMapProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="h-96 bg-gray-100 rounded-t-lg flex items-center justify-center">
        {/* Map placeholder - will be replaced with actual map implementation */}
        <div className="text-gray-500 text-center">
          <p className="font-medium">Map Loading...</p>
          <p className="text-sm mt-2">Location: {location.address}</p>
          <p className="text-xs mt-1">({location.lat}, {location.lng})</p>
        </div>
      </div>

      {nearby && nearby.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
          <div className="space-y-2">
            {nearby.map((place, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">{place.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({place.type})</span>
                </div>
                <span className="text-sm text-gray-600">{place.distance} mi</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}