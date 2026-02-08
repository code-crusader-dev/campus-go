'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, ArrowLeft, Calendar, User } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { NodeViewer } from '@/components/project/NodeViewer';
import { CommentSection } from '@/components/project/CommentSection';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { getProject } from '@/lib/firebase/projects';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils/helpers';

function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProject(projectId);
        setProject(data);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  // Handle external link projects - must be before early returns
  useEffect(() => {
    if (project && project.contentType === 'external' && project.externalUrl) {
      // Open external link in a new tab so users can come back
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
      // Navigate back to home after opening the link
      router.push('/');
    }
  }, [project, router]);

  if (loading) {
    return <Loading fullScreen text="Loading project..." />;
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Project not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Handle node-based projects
  if (project.contentType === 'nodes' && showViewer && project.nodes && project.startNodeId) {
    return (
      <NodeViewer
        nodes={project.nodes}
        startNodeId={project.startNodeId}
        onClose={() => setShowViewer(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="mb-4 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              
              <h1 className="text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created {formatDate(project.createdAt)}</span>
                </div>
                {project.contentType === 'nodes' && project.nodes && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full">
                      {project.nodes.length} nodes
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 py-12">
        {project.contentType === 'nodes' && project.nodes && project.startNodeId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Explore?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Navigate through the campus using directional controls. 
                Start your journey now!
              </p>
              <Button
                size="lg"
                onClick={() => setShowViewer(true)}
                className="px-8 py-4 text-lg"
              >
                Start Exploration
              </Button>
            </div>

            {/* Node preview grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {project.nodes.slice(0, 8).map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="aspect-video rounded-lg overflow-hidden shadow-lg relative"
                >
                  <Image
                    src={node.image}
                    alt={node.title || `Node ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400">
              This project is still being set up. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Comments section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <CommentSection projectId={projectId} />
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <ProjectPage />
    </ProtectedRoute>
  );
}
