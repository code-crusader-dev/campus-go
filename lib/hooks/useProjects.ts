// Custom hook for projects

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { getAllProjects, searchProjects } from '@/lib/firebase/projects';

export const useProjects = (searchTerm?: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: Project[];
        if (searchTerm && searchTerm.trim()) {
          data = await searchProjects(searchTerm);
        } else {
          data = await getAllProjects();
        }
        
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchTerm]);

  return { projects, loading, error, refetch: () => {} };
};
