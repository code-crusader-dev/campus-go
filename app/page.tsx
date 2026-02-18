import React from 'react';
import { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Explore Campus Projects - Campus Go',
  description: 'Discover immersive campus tours and navigation experiences. Browse interactive projects showcasing campus buildings, locations, and hidden gems.',
  openGraph: {
    title: 'Explore Campus Projects - Campus Go',
    description: 'Discover immersive campus tours and navigation experiences',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Static SEO-friendly Hero section - visible to bots */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Explore Campus Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover immersive campus tours and navigation experiences
        </p>
      </div>

      {/* Client Component with interactive features */}
      <HomePageClient />
    </div>
  );
}
