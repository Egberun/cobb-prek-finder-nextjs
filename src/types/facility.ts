export type FacilityType = 'public' | 'private' | 'faith-based';

export type PriceRange = 'free' | 'low' | 'medium' | 'high';

export type Schedule = 'full' | 'half' | 'extended';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Price {
  type: 'free' | 'paid';
  amount?: number;
  period?: 'monthly' | 'weekly';
  details?: string;
}

export interface QualityRating {
  stars: number;
  lastUpdated: string;
  certifications: string[];
}

export interface Capacity {
  total: number;
  available: number;
  ageGroups: {
    min: number;
    max: number;
    capacity: number;
  }[];
}

export interface Contact {
  phone: string;
  email: string;
  website?: string;
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  location: Location;
  rating: QualityRating;
  price: Price;
  schedule: {
    type: Schedule;
    hours: string;
    details?: string;
  };
  capacity: Capacity;
  contact: Contact;
  programs: string[];
  features: string[];
  lastUpdated: string;
  // For Georgia Pre-K Program participants
  gaPreK?: {
    participates: boolean;
    slots: number;
    lotteryDeadline?: string;
  };
}