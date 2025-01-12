import { type NextRequest, NextResponse } from 'next/server';
import { sampleFacilities } from '../../../../data/sampleFacilities';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const facility = sampleFacilities.find(f => f.id === params.id);

  if (!facility) {
    return new NextResponse('Facility not found', { status: 404 });
  }

  return NextResponse.json(facility);
}
