'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Card } from '@/components/ui/Card';
import { createProject, updateProject } from '@/lib/firebase/projects';
import { uploadProjectCover } from '@/lib/firebase/storage';
import { useAuthStore } from '@/lib/store/authStore';
import { Project, ProjectTheme } from '@/types';

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

const THEME_COLORS = [
  { name: 'Blue', value: '#0ea5e9' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
];

const THEME_STYLES = [
  { name: 'Modern', value: 'modern' as const },
  { name: 'Classic', value: 'classic' as const },
  { name: 'Minimal', value: 'minimal' as const },
  { name: 'Vibrant', value: 'vibrant' as const },
];

export const ProjectForm: React.FC<ProjectFormProps> = ({ project, isEdit = false }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    contentType: project?.contentType || 'nodes' as 'nodes' | 'external',
    externalUrl: project?.externalUrl || '',
  });
  
  const [theme, setTheme] = useState<ProjectTheme>(
    project?.theme || {
      primaryColor: THEME_COLORS[0].value,
      style: 'modern',
    }
  );
  
  const [coverImage, setCoverImage] = useState<File | string | null>(
    project?.coverImage || null
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    if (formData.contentType === 'external' && !formData.externalUrl.trim()) {
      newErrors.externalUrl = 'External URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !user) return;

    try {
      setLoading(true);

      // Upload cover image if it's a file
      let coverImageUrl = typeof coverImage === 'string' ? coverImage : '';
      if (coverImage instanceof File) {
        const tempId = isEdit && project ? project.id : Date.now().toString();
        coverImageUrl = await uploadProjectCover(coverImage, tempId);
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        coverImage: coverImageUrl,
        theme,
        contentType: formData.contentType,
        externalUrl: formData.contentType === 'external' ? formData.externalUrl : undefined,
        nodes: formData.contentType === 'nodes' ? (project?.nodes || []) : undefined,
        startNodeId: project?.startNodeId,
        createdBy: user.id,
      };

      if (isEdit && project) {
        await updateProject(project.id, projectData);
        router.push('/admin');
      } else {
        const projectId = await createProject(projectData);
        
        if (formData.contentType === 'nodes') {
          // Redirect to node editor
          router.push(`/admin/project/${projectId}/nodes`);
        } else {
          router.push('/admin');
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Basic Information
        </h2>
        <div className="space-y-4">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            placeholder="e.g., Main Campus Tour"
          />

          <TextArea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={errors.description}
            placeholder="Describe your project..."
            rows={4}
          />
        </div>
      </Card>

      {/* Cover Image */}
      <Card className="p-6">
        <ImageUpload
          label="Cover Image"
          onImageSelected={setCoverImage}
          currentImage={typeof coverImage === 'string' ? coverImage : undefined}
        />
        {errors.coverImage && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.coverImage}</p>
        )}
      </Card>

      {/* Theme */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Theme
        </h2>
        
        <div className="space-y-6">
          {/* Color selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {THEME_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setTheme({ ...theme, primaryColor: color.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme.primaryColor === color.value
                      ? 'border-gray-900 dark:border-white scale-105'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {THEME_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setTheme({ ...theme, style: style.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme.style === style.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">{style.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Content Type */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Content Type
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, contentType: 'nodes' })}
            className={`p-6 rounded-lg border-2 transition-all ${
              formData.contentType === 'nodes'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Node-Based Navigation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create an immersive exploration experience with connected image nodes
            </p>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, contentType: 'external' })}
            className={`p-6 rounded-lg border-2 transition-all ${
              formData.contentType === 'external'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              External Link
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Link to an external website or resource
            </p>
          </button>
        </div>

        {formData.contentType === 'external' && (
          <Input
            label="External URL"
            type="url"
            value={formData.externalUrl}
            onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
            error={errors.externalUrl}
            placeholder="https://example.com"
          />
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={loading}
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          <Save className="w-4 h-4" />
          {isEdit ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};
