'use client';

import React from 'react';
import PreKSearch from '../components/PreKSearch';
import { PreKResults } from '../components/PreKResults';
import FacilityProfile from '../components/FacilityProfile';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Pre-K Facilities</h1>
          <PreKSearch />
        </div>
      </section>

      <section className="px-4 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Results</h2>
          <PreKResults results={[]} />
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sample Facility Profile</h2>
          <FacilityProfile />
        </div>
      </section>
    </main>
  );
}