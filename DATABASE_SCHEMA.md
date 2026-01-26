# Campus Go - Database Schema

## Overview

Campus Go uses **Firebase Firestore** as its NoSQL database. This document outlines the complete database structure.

---

## Collections

### 1. `users`

Stores user profile information and roles.

**Document ID:** Firebase Auth UID

**Structure:**
```typescript
{
  id: string;              // Same as document ID
  email: string;           // User's email
  displayName: string;     // User's display name
  photoURL: string;        // Profile picture URL
  isAdmin: boolean;        // Admin role flag
  createdAt: Timestamp;    // Account creation timestamp
}
```

**Example:**
```json
{
  "id": "abc123xyz",
  "email": "john.doe@university.edu",
  "displayName": "John Doe",
  "photoURL": "https://lh3.googleusercontent.com/...",
  "isAdmin": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Security Rules:**
- Read: Any authenticated user
- Write: Only the user themselves

---

### 2. `projects`

Stores all campus exploration projects.

**Document ID:** Auto-generated

**Structure:**
```typescript
{
  id: string;                    // Auto-generated document ID
  title: string;                 // Project title
  description: string;           // Project description
  coverImage: string;            // Cover image URL
  theme: {
    primaryColor: string;        // Hex color code
    style: 'modern' | 'classic' | 'minimal' | 'vibrant';
  };
  contentType: 'external' | 'nodes';
  externalUrl?: string;          // Only if contentType is 'external'
  nodes?: Node[];                // Only if contentType is 'nodes'
  startNodeId?: string;          // ID of starting node
  createdBy: string;             // User ID of creator
  createdAt: Timestamp;          // Creation timestamp
  updatedAt: Timestamp;          // Last update timestamp
}
```

**Node Structure:**
```typescript
{
  id: string;                    // Unique node ID
  image: string;                 // Node image URL
  title?: string;                // Optional node title
  connections: {
    up?: string;                 // Node ID for up direction
    down?: string;               // Node ID for down direction
    left?: string;               // Node ID for left direction
    right?: string;              // Node ID for right direction
  }
}
```

**Example (External Link Project):**
```json
{
  "id": "proj_001",
  "title": "Virtual Campus Tour",
  "description": "Explore our beautiful campus",
  "coverImage": "https://storage.googleapis.com/.../cover.jpg",
  "theme": {
    "primaryColor": "#0ea5e9",
    "style": "modern"
  },
  "contentType": "external",
  "externalUrl": "https://university.edu/virtual-tour",
  "createdBy": "admin123",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Example (Node-Based Project):**
```json
{
  "id": "proj_002",
  "title": "Science Building Tour",
  "description": "Navigate through our state-of-the-art science facilities",
  "coverImage": "https://storage.googleapis.com/.../cover.jpg",
  "theme": {
    "primaryColor": "#10b981",
    "style": "vibrant"
  },
  "contentType": "nodes",
  "startNodeId": "node_001",
  "nodes": [
    {
      "id": "node_001",
      "image": "https://storage.googleapis.com/.../entrance.jpg",
      "title": "Main Entrance",
      "connections": {
        "up": "node_002",
        "right": "node_003"
      }
    },
    {
      "id": "node_002",
      "image": "https://storage.googleapis.com/.../lab.jpg",
      "title": "Chemistry Lab",
      "connections": {
        "down": "node_001"
      }
    },
    {
      "id": "node_003",
      "image": "https://storage.googleapis.com/.../corridor.jpg",
      "title": "East Corridor",
      "connections": {
        "left": "node_001"
      }
    }
  ],
  "createdBy": "admin123",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T14:30:00Z"
}
```

**Security Rules:**
- Read: Any authenticated user
- Create: Admin users only
- Update/Delete: Admin users or project creator

---

### 3. `comments`

Stores user comments on projects.

**Document ID:** Auto-generated

**Structure:**
```typescript
{
  id: string;              // Auto-generated document ID
  projectId: string;       // Reference to project
  userName: string;        // Commenter's display name
  userEmail?: string;      // Commenter's email (optional)
  text: string;            // Comment content
  createdAt: Timestamp;    // Comment timestamp
}
```

**Example:**
```json
{
  "id": "comment_001",
  "projectId": "proj_002",
  "userName": "Jane Smith",
  "userEmail": "jane.smith@university.edu",
  "text": "Amazing tour! The chemistry lab looks incredible.",
  "createdAt": "2024-01-15T15:45:00Z"
}
```

**Security Rules:**
- Read: Any authenticated user
- Create: Any authenticated user
- Delete: Admin users only

---

## Indexes

### Required Indexes

**Collection: `comments`**
- Fields: `projectId` (Ascending), `createdAt` (Descending)
- Purpose: Efficiently query comments for a project in reverse chronological order

**Collection: `projects`**
- Fields: `createdBy` (Ascending), `createdAt` (Descending)
- Purpose: Query projects by creator in reverse chronological order

---

## Storage Structure

Firebase Storage is organized as follows:

```
/projects/
  /{projectId}/
    /covers/
      /timestamp_filename.jpg
    /nodes/
      /{nodeId}/
        /timestamp_filename.jpg
```

**Example:**
```
/projects/
  /proj_002/
    /covers/
      /1705322400000_science_building.jpg
    /nodes/
      /node_001/
        /1705322460000_entrance.jpg
      /node_002/
        /1705322520000_lab.jpg
```

---

## Data Flow

### User Authentication
1. User signs in with Google
2. Firebase Auth creates/retrieves user
3. Check if user document exists in `users` collection
4. Create/update user document with admin status
5. Store user in Zustand state

### Project Creation
1. Admin fills project form
2. Upload cover image to Storage
3. Create project document in Firestore
4. If node-based: Redirect to node editor
5. If external: Redirect to dashboard

### Node Management
1. Admin creates nodes with images
2. Images uploaded to Storage
3. Nodes stored in project document
4. Connections created between nodes
5. Start node designated

### Viewing Projects
1. User clicks project card
2. Fetch project document
3. If external: Redirect to URL
4. If nodes: Display node viewer
5. Load comments for project

### Adding Comments
1. User submits comment
2. Create comment document
3. Display in comment list
4. Real-time updates (optional)

---

## Query Patterns

### Get All Projects
```typescript
const q = query(
  collection(db, 'projects'),
  orderBy('createdAt', 'desc')
);
```

### Get Projects by Creator
```typescript
const q = query(
  collection(db, 'projects'),
  where('createdBy', '==', userId),
  orderBy('createdAt', 'desc')
);
```

### Get Comments for Project
```typescript
const q = query(
  collection(db, 'comments'),
  where('projectId', '==', projectId),
  orderBy('createdAt', 'desc')
);
```

### Search Projects (Client-side)
```typescript
// Fetch all projects first
const projects = await getAllProjects();

// Filter on client
const results = projects.filter(p => 
  p.title.toLowerCase().includes(searchTerm) ||
  p.description.toLowerCase().includes(searchTerm)
);
```

---

## Best Practices

### Document Size
- Keep documents under 1MB
- Large image arrays (nodes) are acceptable but monitor size
- Consider pagination for very large node lists

### Image URLs
- Store CDN URLs, not raw files
- Use Firebase Storage URLs with tokens
- Consider image optimization before upload

### Timestamps
- Use Firestore `serverTimestamp()` for consistency
- Store as Timestamp type, not strings
- Convert to readable format on client

### References
- Use document IDs for references (not nested objects)
- Keep denormalization to minimum
- Balance between reads and writes

---

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        request.auth.token.email in get(/databases/$(database)/documents/config/admins).data.emails;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update, delete: if isAdmin() || isOwner(resource.data.createdBy);
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow delete: if isAdmin();
    }
  }
}
```

---

## Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidImage() {
      return request.resource.size < 5 * 1024 * 1024 && // 5MB
             request.resource.contentType.matches('image/.*');
    }
    
    match /projects/{projectId}/{allPaths=**} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidImage();
    }
  }
}
```

---

This schema is designed for scalability, security, and optimal performance on Firebase's free tier.
