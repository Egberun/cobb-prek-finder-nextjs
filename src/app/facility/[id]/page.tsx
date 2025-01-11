import { Suspense } from 'react';
import FacilityProfile from '@/components/FacilityProfile';
import type { Metadata } from 'next';

interface FacilityPageProps {
  params: {
    id: string;
  };
}

// This will be replaced with actual data fetching
async function getFacility(id: string) {
  // For now, return null to use the default facility data
  return null;
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const facility = await getFacility(params.id);
  
  return {
    title: facility ? `${facility.name} - Cobb Pre-K Finder` : 'Facility Details - Cobb Pre-K Finder',
    description: facility 
      ? `Learn more about ${facility.name}, a Pre-K facility in Cobb County, GA`
      : 'Detailed information about Pre-K facilities in Cobb County, GA',
  };
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const facility = await getFacility(params.id);
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <FacilityProfile facility={facility} />
      </Suspense>
    </main>
  );
}