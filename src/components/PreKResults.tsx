'use client';

import React from 'react';

interface PreKResultsProps {
  results: any[];
}

export function PreKResults({ results }: PreKResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results to display. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-4">
          {/* Result content will go here */}
        </div>
      ))}
    </div>
  );
}