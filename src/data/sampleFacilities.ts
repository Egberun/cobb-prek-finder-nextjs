import { Facility } from '@/types/facility';

export const sampleFacilities: Facility[] = [
  {
    id: '1',
    name: 'South Cobb Early Learning Center',
    type: 'public',
    address: '5891 Dodgen Road, Mableton, GA 30126',
    rating: 4,
    price: {
      type: 'free',
      details: 'Georgia Pre-K Program'
    },
    schedule: {
      type: 'full',
      hours: '8:00 AM - 2:30 PM',
      details: 'Follows school district calendar'
    },
    capacity: {
      total: 100,
      available: 15,
      ageGroups: [{
        min: 4,
        max: 5,
        capacity: 100
      }]
    },
    qualityRating: {
      stars: 3,
      lastUpdated: '2024-01-01',
      certifications: ['Georgia Pre-K Certified']
    },
    programs: [
      'Georgia Pre-K Program',
      'Special Needs Services'
    ],
    features: [
      'Certified Teachers',
      'Play-Based Learning',
      'STEAM Activities',
      'Parent Involvement Programs'
    ],
    contact: {
      phone: '(770) 555-0100',
      email: 'info@southcobbelc.org',
      website: 'www.southcobbelc.org'
    },
    location: {
      lat: 33.8182,
      lng: -84.5137
    }
  },
  {
    id: '2',
    name: 'Kids R Kids North Cobb',
    type: 'private',
    address: '1234 Barrett Pkwy, Marietta, GA 30066',
    rating: 5,
    price: {
      type: 'paid',
      amount: 250,
      period: 'weekly',
      details: 'Includes meals and supplies'
    },
    schedule: {
      type: 'extended',
      hours: '6:30 AM - 6:30 PM',
      details: 'Year-round program'
    },
    capacity: {
      total: 212,
      available: 8,
      ageGroups: [
        {
          min: 0,
          max: 1,
          capacity: 40
        },
        {
          min: 1,
          max: 3,
          capacity: 72
        },
        {
          min: 3,
          max: 5,
          capacity: 100
        }
      ]
    },
    qualityRating: {
      stars: 4,
      lastUpdated: '2023-12-15',
      certifications: ['Quality Rated', 'NAEYC Accredited']
    },
    programs: [
      'Georgia Pre-K Program',
      'Language Immersion',
      'STEAM Focus'
    ],
    features: [
      'Security System',
      'Outdoor Playground',
      'Computer Lab',
      'Garden'
    ],
    contact: {
      phone: '(770) 555-0200',
      email: 'info@krknorthcobb.com',
      website: 'www.krknorthcobb.com'
    },
    location: {
      lat: 34.0083,
      lng: -84.5799
    }
  }
];
