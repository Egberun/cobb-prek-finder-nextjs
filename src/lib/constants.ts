export const FACILITY_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  FAITH_BASED: 'faith-based',
} as const;

export const SCHEDULE_TYPES = {
  FULL: 'full',
  HALF: 'half',
  EXTENDED: 'extended',
} as const;

export const PRICE_RANGES = {
  FREE: 'free',
  LOW: 'low',     // Under $500/month
  MEDIUM: 'medium', // $500-$1000/month
  HIGH: 'high',    // Over $1000/month
} as const;

export const PROGRAMS = [
  'Georgia Pre-K Program',
  'Special Needs Services',
  'Language Immersion',
  'STEAM Focus',
  'Faith-Based Education',
  'Montessori',
  'Before/After School Care',
] as const;

export const FEATURES = [
  'Outdoor Playground',
  'Security System',
  'Meal Service',
  'Transportation',
  'Computer Lab',
  'Music Room',
  'Library',
  'Garden',
] as const;