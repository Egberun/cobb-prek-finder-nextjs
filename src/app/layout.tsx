import './globals.css';
import { AppStateProvider } from '../context/AppStateContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppStateProvider>
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}