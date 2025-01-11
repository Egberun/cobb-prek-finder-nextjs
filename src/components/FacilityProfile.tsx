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

// ... [rest of the FacilityProfile component code]