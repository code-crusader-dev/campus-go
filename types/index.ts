// Type definitions for Campus Go

import { Timestamp } from 'firebase/firestore';

// User types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  isAdmin: boolean;
  createdAt: Timestamp;
}

// Node connection directions
export type Direction = 'up' | 'down' | 'left' | 'right';

// Node structure for navigation
export interface Node {
  id: string;
  image: string;
  title?: string;
  connections: {
    up?: string;
    down?: string;
    left?: string;
    right?: string;
  };
}

// Project theme configuration
export interface ProjectTheme {
  primaryColor: string;
  style: 'modern' | 'classic' | 'minimal' | 'vibrant';
}

// Project content types
export type ContentType = 'external' | 'nodes';

// Main project structure
export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  theme: ProjectTheme;
  contentType: ContentType;
  externalUrl?: string;
  nodes?: Node[];
  startNodeId?: string; // ID of the first node to display
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Comment structure
export interface Comment {
  id: string;
  projectId: string;
  userName: string;
  userEmail?: string;
  text: string;
  createdAt: Timestamp;
}

// Upload options for images
export type UploadMethod = 'file' | 'url' | 'camera';

// Theme mode
export type ThemeMode = 'light' | 'dark';

// Admin dashboard stats
export interface DashboardStats {
  totalProjects: number;
  totalComments: number;
  recentProjects: Project[];
}
