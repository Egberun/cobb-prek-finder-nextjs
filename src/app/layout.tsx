import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cobb County Pre-K Finder',
  description: 'Find and compare Pre-K facilities in Cobb County, Georgia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}