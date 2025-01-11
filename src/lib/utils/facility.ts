import { Facility, Price, QualityRating } from '@/types/facility';

export function formatPrice(price: Price): string {
  if (price.type === 'free') return 'Free (Georgia Pre-K)';
  
  if (!price.amount) return 'Contact for pricing';
  
  return `$${price.amount.toLocaleString()}/${price.period}`;
}

export function formatRating(rating: QualityRating): string {
  return `${rating.stars} Stars${rating.certifications.length ? ` • ${rating.certifications.join(', ')}` : ''}`;
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Convert to miles and round to 1 decimal
  return Number((distance * 0.621371).toFixed(1));
}

export function getAvailabilityStatus(facility: Facility): {
  status: 'open' | 'limited' | 'waitlist' | 'full';
  text: string;
} {
  const availableSpots = facility.capacity.available;
  const total = facility.capacity.total;
  
  if (availableSpots === 0) {
    return { status: 'full', text: 'Waitlist Only' };
  }
  
  if (availableSpots <= total * 0.1) {
    return { status: 'limited', text: `${availableSpots} spots left` };
  }
  
  return { status: 'open', text: 'Spots Available' };
}