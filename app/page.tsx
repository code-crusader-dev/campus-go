'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, ExternalLink, MapPin } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useProjects } from '@/lib/hooks/useProjects';
import { AuthButton } from '@/components/auth/AuthButton';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';
import { truncateText } from '@/lib/utils/helpers';

export default function HomePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const { projects, loading: projectsLoading } = useProjects(searchTerm);
  const router = useRouter();

  if (authLoading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Welcome to Campus Go
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore your campus like never before. Navigate through buildings and locations
              with our immersive node-based system.
            </p>
            <AuthButton />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Explore Campus Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover immersive campus tours and navigation experiences
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        className="max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12"
          />
        </div>
      </motion.div>

      {/* Projects grid */}
      {projectsLoading ? (
        <Loading text="Loading projects..." />
      ) : projects.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {searchTerm ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm 
              ? 'Try a different search term' 
              : 'Check back later for new campus exploration projects'}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                hoverable
                onClick={() => router.push(`/project/${project.id}`)}
                className="h-full overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  {project.contentType === 'external' && (
                    <div className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-900/90 rounded-lg">
                      <ExternalLink className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {truncateText(project.description, 120)}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
