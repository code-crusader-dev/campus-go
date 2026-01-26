'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { NodeEditor } from '@/components/admin/NodeEditor';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { getProject, updateProject } from '@/lib/firebase/projects';
import { Project, Node } from '@/types';

function NodeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [startNodeId, setStartNodeId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProject(projectId);
        if (data) {
          setProject(data);
          setNodes(data.nodes || []);
          setStartNodeId(data.startNodeId);
        }
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const handleSave = async () => {
    if (!project) return;

    if (nodes.length === 0) {
      alert('Please add at least one node before saving');
      return;
    }

    if (!startNodeId) {
      alert('Please set a start node');
      return;
    }

    try {
      setSaving(true);
      await updateProject(projectId, {
        nodes,
        startNodeId,
      });
      alert('Nodes saved successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error saving nodes:', error);
      alert('Failed to save nodes');
    } finally {
      setSaving(false);
    }
  };

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin')}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Configure navigation nodes for your project
            </p>
          </div>
          <Button onClick={handleSave} loading={saving} size="lg">
            <Save className="w-5 h-5" />
            Save Nodes
          </Button>
        </div>

        {/* Node Editor */}
        <NodeEditor
          nodes={nodes}
          projectId={projectId}
          onNodesChange={setNodes}
          onStartNodeChange={setStartNodeId}
          startNodeId={startNodeId}
        />
      </motion.div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <NodeEditorPage />
    </ProtectedRoute>
  );
}
