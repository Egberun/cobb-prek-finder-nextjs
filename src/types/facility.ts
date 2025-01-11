export interface Facility {
  id: string;
  name: string;
  type: 'public' | 'private' | 'faith-based';
  address: string;
  rating: number;
  price: {
    type: 'free' | 'paid';
    amount?: number;
    period?: 'monthly' | 'weekly';
    details?: string;
  };
  schedule: {
    type: 'full' | 'half' | 'extended';
    hours: string;
    details?: string;
  };
  capacity: {
    total: number;
    available: number;
    ageGroups: {
      min: number;
      max: number;
      capacity: number;
    }[];
  };
  qualityRating: {
    stars: number;
    lastUpdated: string;
    certifications: string[];
  };
  programs: string[];
  features: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}