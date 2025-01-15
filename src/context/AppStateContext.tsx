'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Facility } from '../types/facility';
import type { SearchFilters, SearchLocation } from '../types/search';

interface AppState {
  facilities: Facility[];
  searchFilters: SearchFilters;
  searchLocation: SearchLocation | null;
  selectedFacilities: string[];
  comparisonFilters: {
    metric: string;
    weight: number;
  }[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_FACILITIES'; payload: Facility[] }
  | { type: 'SET_SEARCH_FILTERS'; payload: SearchFilters }
  | { type: 'SET_SEARCH_LOCATION'; payload: SearchLocation | null }
  | { type: 'SELECT_FACILITY'; payload: string }
  | { type: 'DESELECT_FACILITY'; payload: string }
  | { type: 'SET_COMPARISON_FILTERS'; payload: { metric: string; weight: number }[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  facilities: [],
  searchFilters: {
    type: 'all',
    priceRange: 'all',
    rating: 0,
    distance: 0,
    programs: [],
    schedule: 'all'
  },
  searchLocation: null,
  selectedFacilities: [],
  comparisonFilters: [
    { metric: 'rating', weight: 0.3 },
    { metric: 'price', weight: 0.2 },
    { metric: 'location', weight: 0.2 },
    { metric: 'programs', weight: 0.15 },
    { metric: 'capacity', weight: 0.1 },
    { metric: 'features', weight: 0.05 }
  ],
  isLoading: false,
  error: null
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_FACILITIES':
      return { ...state, facilities: action.payload };

    case 'SET_SEARCH_FILTERS':
      return { ...state, searchFilters: action.payload };

    case 'SET_SEARCH_LOCATION':
      return { ...state, searchLocation: action.payload };

    case 'SELECT_FACILITY':
      if (state.selectedFacilities.length >= 3) return state;
      return {
        ...state,
        selectedFacilities: [...state.selectedFacilities, action.payload]
      };

    case 'DESELECT_FACILITY':
      return {
        ...state,
        selectedFacilities: state.selectedFacilities.filter(id => id !== action.payload)
      };

    case 'SET_COMPARISON_FILTERS':
      return { ...state, comparisonFilters: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}