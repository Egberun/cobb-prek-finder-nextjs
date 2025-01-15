'use client';

import { ReactNode } from 'react';
import { AppStateProvider } from '../context/AppStateContext';

export function Providers({ children }: { children: ReactNode }) {
  return <AppStateProvider>{children}</AppStateProvider>;
}