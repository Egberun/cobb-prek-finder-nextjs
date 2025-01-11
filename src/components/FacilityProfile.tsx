import React from 'react';
import { MapPin, Phone, Globe, Clock, Star, DollarSign, Users } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface Price {
  type: 'free' | 'paid';
  amount?: number;
  period?: 'monthly' | 'weekly';
  details?: string;
}

interface QualityRating {
  stars: number;
  lastUpdated: string;
  certifications: string[];
}

interface Capacity {
  total: number;
  available: number;
  ageGroups: {
    min: number;
    max: number;
    capacity: number;
  }[];
}

interface Contact {
  phone: string;
  email: string;
  website?: string;
}

interface Facility {
  id: string;
  name: string;
  type: 'public' | 'private' | 'faith-based';
  location: Location;
  rating: QualityRating;
  price: Price;
  schedule: {
    type: 'full' | 'half' | 'extended';
    hours: string;
    details?: string;
  };
  capacity: Capacity;
  contact: Contact;
  programs: string[];
  features: string[];
  lastUpdated: string;
  gaPreK?: {
    participates: boolean;
    slots: number;
    lotteryDeadline?: string;
  };
}

const defaultFacility: Facility = {
  id: "sample-1",
  name: "Sample Pre-K Center",
  type: "public",
  location: {
    lat: 33.9526,
    lng: -84.5499,
    address: "123 Education Lane",
    city: "Marietta",
    state: "GA",
    zip: "30064"
  },
  rating: {
    stars: 4,
    lastUpdated: "2024-12-01",
    certifications: ["Quality Rated", "NAEYC Accredited"]
  },
  price: {
    type: "free",
    details: "Georgia Pre-K Program Participant"
  },
  schedule: {
    type: "full",
    hours: "7:00 AM - 6:00 PM",
    details: "Monday through Friday"
  },
  capacity: {
    total: 120,
    available: 15,
    ageGroups: [
      { min: 4, max: 5, capacity: 80 },
      { min: 3, max: 4, capacity: 40 }
    ]
  },
  contact: {
    phone: "(770) 555-0123",
    email: "info@sampleprek.edu",
    website: "https://sampleprek.edu"
  },
  programs: ["Georgia Pre-K", "Special Needs Support", "STEAM Program"],
  features: ["Outdoor Playground", "Security System", "Certified Teachers"],
  lastUpdated: "2025-01-11",
  gaPreK: {
    participates: true,
    slots: 80,
    lotteryDeadline: "2025-02-28"
  }
};

interface FacilityProfileProps {
  facility?: Facility;
}

export function FacilityProfile({ facility = defaultFacility }: FacilityProfileProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="w-full bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{facility.name}</h1>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
              facility.type === 'public' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < facility.rating.stars
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{`${facility.location.address}, ${facility.location.city}, ${facility.location.state} ${facility.location.zip}`}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{facility.contact.phone}</span>
            </div>
            {facility.contact.website && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-4 h-4" />
                <a href={facility.contact.website} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Visit Website
                </a>
              </div>
            )}
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{facility.schedule.hours}</span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {facility.schedule.type}
              </span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Pricing Information</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                {facility.price.type === 'free' ? (
                  <span className="font-medium text-green-600">Free Program</span>
                ) : (
                  <span>${facility.price.amount}/{facility.price.period}</span>
                )}
              </div>
              {facility.price.details && (
                <p className="text-sm text-gray-600 ml-6">{facility.price.details}</p>
              )}
              {facility.gaPreK?.participates && (
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    Georgia Pre-K Participant
                  </span>
                  {facility.gaPreK.lotteryDeadline && (
                    <p className="text-sm text-gray-600 mt-1">
                      Lottery Deadline: {facility.gaPreK.lotteryDeadline}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Capacity Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Capacity & Enrollment</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>
                  Total Capacity: {facility.capacity.total} children 
                  ({facility.capacity.available} spots available)
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Age Groups:</h4>
                {facility.capacity.ageGroups.map((group, index) => (
                  <div key={index} className="ml-6 text-sm">
                    {group.min} - {group.max} years: {group.capacity} children
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Programs & Features */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Programs & Features</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Available Programs:</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.programs.map((program, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {program}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quality Rating Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Quality Rating Details</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{facility.rating.stars} out of 5 stars</span>
              </div>
              <p className="text-sm text-gray-600">
                Last Updated: {facility.rating.lastUpdated}
              </p>
              <div className="mt-2">
                <h4 className="font-medium mb-2">Certifications:</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.rating.certifications.map((cert, index) => (
                    <span key={index} className="bg-blue-50 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Last Updated: {facility.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
}