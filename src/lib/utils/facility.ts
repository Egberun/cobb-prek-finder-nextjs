import { Facility } from '@/types/facility';
import { PRICE_RANGES } from '../constants';

export function formatPrice(price: Facility['price']): string {
  if (price.type === 'free') return 'Free (Georgia Pre-K)';
  
  if (!price.amount) return 'Contact for pricing';
  
  return `$${price.amount.toLocaleString()}/${price.period}`;
}

export function formatSchedule(schedule: Facility['schedule']): string {
  const scheduleTypes = {
    full: 'Full Day',
    half: 'Half Day',
    extended: 'Extended Hours',
  };
  
  return `${scheduleTypes[schedule.type]} (${schedule.hours})`;
}

export function getPriceRange(price: Facility['price']): string {
  if (price.type === 'free') return PRICE_RANGES.FREE;
  if (!price.amount || !price.period) return 'unknown';
  
  const monthlyAmount = price.period === 'weekly' 
    ? price.amount * 4 
    : price.amount;
    
  if (monthlyAmount < 500) return PRICE_RANGES.LOW;
  if (monthlyAmount < 1000) return PRICE_RANGES.MEDIUM;
  return PRICE_RANGES.HIGH;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Number((distance * 0.621371).toFixed(1)); // Convert to miles and round to 1 decimal
}