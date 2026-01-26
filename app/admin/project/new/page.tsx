'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProjectForm } from '@/components/admin/ProjectForm';

function NewProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Create New Project
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Set up your campus exploration project
        </p>

        <ProjectForm />
      </motion.div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <NewProjectPage />
    </ProtectedRoute>
  );
}
