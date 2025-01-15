'use client';

import React from 'react';

export function PreKSearch() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Search Pre-K Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter location or facility name"
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
}