'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { Loading } from '@/components/ui/Loading';
import { getProject } from '@/lib/firebase/projects';
import { Project } from '@/types';

function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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
          <p className="text-gray-600 dark:text-gray-400">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Project
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Update your project settings
        </p>

        <ProjectForm project={project} isEdit />
      </motion.div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <EditProjectPage />
    </ProtectedRoute>
  );
}
