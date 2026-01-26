// Firebase Storage utilities

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload an image file to Firebase Storage
 */
export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete an image from Firebase Storage
 */
export const deleteImage = async (imagePath: string): Promise<void> => {
  try {
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Generate a unique file path for storage
 */
export const generateFilePath = (
  folder: string,
  fileName: string
): string => {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${folder}/${timestamp}_${sanitizedFileName}`;
};

/**
 * Validate image file
 */
export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a valid image file (JPEG, PNG, GIF, or WebP).');
  }
  
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }
  
  return true;
};

/**
 * Upload project cover image
 */
export const uploadProjectCover = async (file: File, projectId: string): Promise<string> => {
  try {
    validateImageFile(file);
    const path = generateFilePath(`projects/${projectId}/covers`, file.name);
    return await uploadImage(file, path);
  } catch (error) {
    console.error('Error uploading project cover:', error);
    throw error;
  }
};

/**
 * Upload node image
 */
export const uploadNodeImage = async (
  file: File,
  projectId: string,
  nodeId: string
): Promise<string> => {
  try {
    validateImageFile(file);
    const path = generateFilePath(`projects/${projectId}/nodes/${nodeId}`, file.name);
    return await uploadImage(file, path);
  } catch (error) {
    console.error('Error uploading node image:', error);
    throw error;
  }
};
