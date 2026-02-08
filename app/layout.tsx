import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Campus Go - Explore Your Campus',
  description: 'Campus exploration platform with node-based navigation. Discover buildings, locations, and hidden gems on your campus.',
  keywords: ['campus', 'navigation', 'exploration', 'street view', 'university', 'college'],
  authors: [{ name: 'Campus Go Team' }],
  openGraph: {
    title: 'Campus Go - Explore Your Campus',
    description: 'Campus exploration platform with node-based navigation',
    type: 'website',
  },
};

// Force dynamic rendering to avoid SSR issues with Firebase and Zustand
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
