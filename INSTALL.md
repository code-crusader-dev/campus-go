# Campus Go - Installation Instructions

## 🚀 Installation

Follow these steps to install and run Campus Go on your local machine.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** ([Download](https://git-scm.com/))
- **Firebase Account** (free tier) ([Sign up](https://firebase.google.com/))
- **Google Account** (for authentication)
- **Code Editor** (VS Code recommended)

### Check Prerequisites

```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Any recent version
git --version    # Any recent version
```

---

## Step 1: Get the Code

### Option A: Clone Repository

```bash
git clone <repository-url>
cd campus-go
```

### Option B: Download ZIP

1. Download the project ZIP file
2. Extract to a folder
3. Open terminal in that folder

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Firebase SDK
- Framer Motion
- Zustand
- Lucide React
- And more...

**Wait time:** 2-5 minutes depending on internet speed

---

## Step 3: Firebase Setup

### 3.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `campus-go` (or your choice)
4. Google Analytics: **Disable** (optional, saves setup time)
5. Click **"Create project"**
6. Wait for project creation (~30 seconds)

### 3.2 Enable Authentication

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Find **"Google"** in the list
5. Click **"Google"** to expand
6. Toggle **"Enable"** switch
7. Select your **support email**
8. Click **"Save"**

### 3.3 Create Firestore Database

1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"**
4. Choose your **location** (nearest to your users)
5. Click **"Enable"**
6. Wait for database creation (~30 seconds)

### 3.4 Set Up Firestore Security Rules

1. In Firestore Database, click **"Rules"** tab
2. Replace the content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        request.auth.token.email in [
          'your-admin-email@gmail.com'  // Replace with your email
        ];
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update, delete: if isAdmin() || 
        (isAuthenticated() && resource.data.createdBy == request.auth.uid);
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

3. **Important:** Replace `'your-admin-email@gmail.com'` with your actual Google email
4. Click **"Publish"**

### 3.5 Enable Firebase Storage

1. Click **"Storage"** in left sidebar
2. Click **"Get started"**
3. Click **"Next"** (accept default rules)
4. Select same **location** as Firestore
5. Click **"Done"**

### 3.6 Set Up Storage Security Rules

1. In Storage, click **"Rules"** tab
2. Replace the content with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to read/write in projects folder
    match /projects/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        request.resource.size < 5 * 1024 * 1024 && // 5MB max
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

3. Click **"Publish"**

### 3.7 Get Firebase Configuration

1. Click **⚙️ (gear icon)** next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **Web icon** (`</>`)
5. Register app nickname: `Campus Go Web`
6. **Don't check** "Set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the `firebaseConfig` object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "campus-go-xxxxx.firebaseapp.com",
  projectId: "campus-go-xxxxx",
  storageBucket: "campus-go-xxxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

---

## Step 4: Configure Environment Variables

### 4.1 Create .env.local File

```bash
# In project root directory
cp .env.example .env.local
```

Or manually create a file named `.env.local` in the project root.

### 4.2 Add Firebase Configuration

Open `.env.local` and fill in your Firebase values:

```bash
# Firebase Configuration (from Step 3.7)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=campus-go-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=campus-go-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=campus-go-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456

# Admin Emails (comma-separated, use your Google email)
NEXT_PUBLIC_ADMIN_EMAILS=your-email@gmail.com
```

**Important Notes:**
- Replace ALL placeholder values with your actual Firebase config
- Use the **same email** in both `.env.local` and Firestore rules
- Don't add quotes around values
- No spaces around `=` sign

---

## Step 5: Run the Application

### Start Development Server

```bash
npm run dev
```

You should see:

```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Open in Browser

Open [http://localhost:3000](http://localhost:3000)

You should see:
1. **Animated logo intro** (first time only)
2. **Homepage** with "Welcome to Campus Go"
3. **Sign in with Google** button

---

## Step 6: First Login & Test

### Sign In

1. Click **"Sign in with Google"**
2. Select your Google account
3. Grant permissions
4. You'll be redirected back to homepage
5. Your profile should appear in header

### Verify Admin Access

1. Click **"Dashboard"** in the header (should be visible)
2. You should see the admin dashboard
3. If not visible, check:
   - Your email in `.env.local` matches Google account
   - Firestore rules include your email
   - Restart dev server after changing `.env.local`

### Create Test Project

1. Go to Admin Dashboard
2. Click **"Create Project"**
3. Fill in:
   - Title: "Test Campus Tour"
   - Description: "My first project"
   - Upload any image (or use URL)
   - Select a color theme
   - Choose "Node-Based Navigation"
4. Click **"Create Project"**
5. You'll be redirected to Node Editor

### Add Test Nodes

1. Click **"Add Node"**
2. Upload an image
3. Add title: "Starting Point"
4. Click **"Create Node"**
5. Repeat for 2-3 more nodes
6. Connect nodes using direction buttons
7. Click **"Save Nodes"**
8. Go to Homepage
9. Click your project
10. Click **"Start Exploration"**
11. Test navigation!

---

## ✅ Installation Complete!

If everything works, you're all set! 🎉

---

## 🐛 Troubleshooting

### Issue: "Firebase not configured"

**Cause:** Environment variables not loaded

**Solution:**
1. Verify `.env.local` exists in project root
2. Check all values are filled (no placeholders)
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: "Permission denied" in Firestore

**Cause:** Security rules or authentication issue

**Solution:**
1. Check you're signed in (profile in header)
2. Verify Firestore rules include your email
3. Check email in `.env.local` matches Google account
4. Wait 1-2 minutes for rules to propagate

### Issue: "Cannot read property of undefined"

**Cause:** Firebase not initialized

**Solution:**
1. Check browser console for errors
2. Verify all Firebase config values are correct
3. Check Firebase project is active in console
4. Clear browser cache and reload

### Issue: Images won't upload

**Cause:** Storage not configured or file too large

**Solution:**
1. Verify Storage is enabled in Firebase Console
2. Check Storage security rules are set
3. Ensure image is under 5MB
4. Check file type (JPEG, PNG, GIF, WebP only)

### Issue: Admin dashboard not visible

**Cause:** Email not in admin list

**Solution:**
1. Check `NEXT_PUBLIC_ADMIN_EMAILS` in `.env.local`
2. Use exact email from Google account
3. Add email to Firestore rules
4. Restart dev server
5. Sign out and sign in again

### Issue: "Module not found"

**Cause:** Dependencies not installed

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

Or kill process using port 3000:
- **Windows:** `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- **Mac/Linux:** `lsof -ti:3000 | xargs kill -9`

---

## 🔄 Restart from Scratch

If you need to start over:

```bash
# 1. Delete node_modules
rm -rf node_modules package-lock.json

# 2. Delete .env.local
rm .env.local

# 3. Reinstall
npm install

# 4. Reconfigure .env.local (Step 4)

# 5. Restart server
npm run dev
```

---

## 📚 Next Steps

Once installed and running:

1. **Explore Features:** Read [FEATURES.md](FEATURES.md)
2. **Create Projects:** Add your campus locations
3. **Customize:** Adjust themes and branding
4. **Deploy:** Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🆘 Still Having Issues?

1. **Check Documentation:**
   - [README.md](README.md) - Overview
   - [SETUP.md](SETUP.md) - Detailed setup
   - [QUICKSTART.md](QUICKSTART.md) - Quick guide

2. **Check Browser Console:**
   - Press `F12` or `Ctrl+Shift+I`
   - Look for error messages

3. **Check Terminal Output:**
   - Look for error messages in dev server

4. **Firebase Console:**
   - Check Authentication users
   - Check Firestore data
   - Check Storage files

5. **Create an Issue:**
   - Include error messages
   - Include steps to reproduce
   - Include environment details

---

## ✨ Tips for Success

- **Use Chrome/Edge** for best compatibility
- **Enable JavaScript** in browser
- **Clear cache** if experiencing issues
- **Use incognito mode** to test without cache
- **Check Firebase quotas** on free tier
- **Backup Firebase data** regularly

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Installation Complete! Ready to build amazing campus experiences!** 🚀
