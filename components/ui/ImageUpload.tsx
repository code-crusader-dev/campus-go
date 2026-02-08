'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, Link as LinkIcon, Camera, X, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { validateImageFile } from '@/lib/firebase/storage';

interface ImageUploadProps {
  onImageSelected: (file: File | string) => void;
  currentImage?: string;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  currentImage,
  label = 'Upload Image',
}) => {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        validateImageFile(file);
        onImageSelected(file);
        setPreview(URL.createObjectURL(file));
        setUploadMethod(null);
      } catch (error: any) {
        alert(error.message);
      }
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUrlSubmit = () => {
    try {
      new URL(imageUrl);
      onImageSelected(imageUrl);
      setPreview(imageUrl);
      setUploadMethod(null);
      setUrlError('');
    } catch {
      setUrlError('Please enter a valid URL');
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        validateImageFile(file);
        onImageSelected(file);
        setPreview(URL.createObjectURL(file));
        setUploadMethod(null);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const clearImage = () => {
    setPreview(null);
    setImageUrl('');
    setUploadMethod(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {/* Preview */}
      {preview && (
        <div className="relative mb-4 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 h-48">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload methods */}
      {!preview && !uploadMethod && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setUploadMethod('file')}
            className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary-500" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload File
            </p>
          </button>

          <button
            onClick={() => setUploadMethod('url')}
            className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
          >
            <LinkIcon className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary-500" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </p>
          </button>

          <label className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors group cursor-pointer">
            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary-500" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Take Photo
            </p>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* File upload dropzone */}
      {!preview && uploadMethod === 'file' && (
        <div>
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                : 'border-gray-300 dark:border-gray-700 hover:border-primary-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {isDragActive
                ? 'Drop the image here'
                : 'Drag & drop an image, or click to select'}
            </p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-2">
              Supports: JPEG, PNG, GIF, WebP (Max 5MB)
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUploadMethod(null)}
            className="mt-2"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* URL input */}
      {!preview && uploadMethod === 'url' && (
        <div>
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            error={urlError}
          />
          <div className="flex gap-2 mt-3">
            <Button onClick={handleUrlSubmit} size="sm">
              Add Image
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadMethod(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
