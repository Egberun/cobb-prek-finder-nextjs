'use client';

import React from 'react';
import { MapPin, Phone, Globe, Clock, Star, DollarSign, Users } from 'lucide-react';

export default function FacilityProfile() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Sample Facility</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>123 Main St, Atlanta, GA 30303</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <span>(404) 555-0123</span>
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-gray-500" />
          <a href="#" className="text-blue-600 hover:underline">Visit Website</a>
        </div>
      </div>
    </div>
  );
}