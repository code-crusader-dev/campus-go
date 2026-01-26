# Campus Go - Setup Guide

This guide will help you set up and run **Campus Go** on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Git**
- A **Firebase account** (free tier)
- A **Google account** for authentication

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd campus-go
```

---

## Step 2: Install Dependencies

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

---

## Step 3: Firebase Configuration

### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name your project (e.g., "Campus Go")
4. Disable Google Analytics (optional for free tier)
5. Click **"Create project"**

### 3.2 Enable Authentication

1. In your Firebase project, go to **Authentication** → **Get Started**
2. Click on **Sign-in method** tab
3. Enable **Google** provider
4. Add your authorized domains (localhost should be there by default)
5. Click **Save**

### 3.3 Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Select **Start in test mode** (we'll set up rules later)
3. Choose a location close to your users
4. Click **Enable**

### 3.4 Set Up Firestore Security Rules

In the **Rules** tab of Firestore, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.token.email in 
        ['admin@example.com']; // Replace with your admin emails
      allow update, delete: if request.auth != null && 
        (resource.data.createdBy == request.auth.uid || 
         request.auth.token.email in ['admin@example.com']);
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        request.auth.token.email in ['admin@example.com'];
    }
  }
}
```

**Important:** Replace `'admin@example.com'` with your actual admin email(s).

### 3.5 Enable Firebase Storage

1. Go to **Storage** → **Get Started**
2. Start in **test mode**
3. Choose the same location as your Firestore database
4. Click **Done**

### 3.6 Set Up Storage Security Rules

In the **Rules** tab of Storage, replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### 3.7 Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"**
3. Click on **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "Campus Go Web")
5. Copy the `firebaseConfig` object

---

## Step 4: Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and add your Firebase configuration:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin emails (comma-separated)
NEXT_PUBLIC_ADMIN_EMAILS=your-email@gmail.com,another-admin@gmail.com
```

**Important:** Replace all placeholder values with your actual Firebase config values.

---

## Step 5: Run the Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Step 6: First Time Setup

### 6.1 Sign In

1. When you first open the app, you'll see the Campus Go intro animation
2. Click **"Sign in with Google"**
3. Select your Google account

### 6.2 Become an Admin

Your account will be automatically granted admin access if your email is listed in `NEXT_PUBLIC_ADMIN_EMAILS`.

### 6.3 Create Your First Project

1. Go to the **Admin Dashboard**
2. Click **"Create Project"**
3. Fill in the project details:
   - Title
   - Description
   - Cover image
   - Theme (color and style)
   - Content type (Node-based or External link)

### 6.4 Add Nodes (for Node-based projects)

1. After creating a node-based project, you'll be redirected to the **Node Editor**
2. Click **"Add Node"**
3. Upload an image for each location
4. Connect nodes by clicking the direction buttons (up, down, left, right)
5. Set a **Start Node** (the first location users will see)
6. Click **"Save Nodes"**

---

## Project Structure Overview

```
campus-go/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── providers.tsx        # Global providers
│   ├── admin/               # Admin dashboard pages
│   └── project/             # Project viewer pages
├── components/              # React components
│   ├── auth/               # Authentication
│   ├── admin/              # Admin components
│   ├── project/            # Project display
│   ├── layout/             # Header, footer, logo
│   └── ui/                 # Reusable UI components
├── lib/                    # Core logic
│   ├── firebase/           # Firebase setup & operations
│   ├── store/              # State management (Zustand)
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Helper functions
├── types/                  # TypeScript definitions
└── public/                 # Static assets
```

---

## Common Issues & Solutions

### Issue: "Firebase not configured"

**Solution:** Make sure your `.env.local` file exists and contains all required Firebase configuration values.

### Issue: "Permission denied" in Firestore

**Solution:** 
1. Check your Firestore security rules
2. Make sure you're signed in
3. Verify your email is in the admin list for admin operations

### Issue: Images not uploading

**Solution:** 
1. Check Firebase Storage rules
2. Verify Storage is enabled in Firebase Console
3. Ensure images are under 5MB

### Issue: Google Sign-In not working

**Solution:**
1. Verify Google authentication is enabled in Firebase Console
2. Check that your domain is authorized
3. Clear browser cache and cookies

---

## Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

---

## Deployment

### Deploy to Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

### Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## Features Checklist

- ✅ Google Sign-In authentication
- ✅ Admin dashboard with project management
- ✅ Create/edit/delete projects
- ✅ Upload images (file, URL, camera)
- ✅ Node-based navigation system
- ✅ Visual node editor with 4-directional connections
- ✅ Immersive fullscreen viewer
- ✅ Comments system
- ✅ Dark/light theme toggle
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Search functionality

---

## Support

For issues or questions:
- Check the [README.md](README.md) for general information
- Review Firebase Console for configuration issues
- Check browser console for error messages

---

## Next Steps

1. **Add more nodes** to your projects
2. **Customize themes** to match your campus brand
3. **Invite users** to explore and comment
4. **Share project links** with your community

Happy exploring with Campus Go! 🎓🚀
