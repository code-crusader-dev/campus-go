# Setup Campus Go - NITJ Project

## 🎓 Project: campusgo-nitj-485608

Perfect! Your Firebase project is ready for NIT Jalandhar campus exploration!

---

## ⚡ Quick Setup (15 minutes)

### ✅ **Step 1: Enable Google Authentication**

**Click here:** 
👉 https://console.firebase.google.com/project/campusgo-nitj-485608/authentication/providers

**Do:**
1. Click "Sign-in method" tab
2. Click "Google"
3. Toggle "Enable" to ON
4. Support email: `sepdevansh@gmail.com`
5. Click "Save"

✅ **Done when:** Google shows "Enabled"

---

### ✅ **Step 2: Create Firestore Database**

**Click here:**
👉 https://console.firebase.google.com/project/campusgo-nitj-485608/firestore

**Do:**
1. Click "Create database"
2. Select "Start in test mode"
3. Location: **"asia-south1"** (Mumbai - closest to Punjab)
4. Click "Enable"
5. Wait ~30 seconds

✅ **Done when:** See "Data" tab

---

### ✅ **Step 3: Set Firestore Security Rules**

**In Firestore Rules tab:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        request.auth.token.email in [
          'sepdevansh@gmail.com',
          'imposter9850@gmail.com',
          'diptanshupuri@gmail.com',
          'karanbhatt160608@gmail.com'
        ];
    }
    
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    match /projects/{projectId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update, delete: if isAdmin();
    }
    
    match /comments/{commentId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow delete: if isAdmin();
    }
  }
}
```

**Click "Publish"**

✅ **Done when:** "Rules published successfully"

---

### ✅ **Step 4: Enable Firebase Storage**

**Click here:**
👉 https://console.firebase.google.com/project/campusgo-nitj-485608/storage

**Do:**
1. Click "Get started"
2. Select "Start in test mode"
3. Location: **"asia-south1"** (same as Firestore)
4. Click "Done"
5. Wait ~30 seconds

✅ **Done when:** See "Files" tab

---

### ✅ **Step 5: Set Storage Security Rules**

**In Storage Rules tab:**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidImage() {
      return request.resource.size < 5 * 1024 * 1024 &&
             request.resource.contentType.matches('image/.*');
    }
    
    match /projects/{projectId}/{allPaths=**} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidImage();
    }
  }
}
```

**Click "Publish"**

✅ **Done when:** "Rules published successfully"

---

## 🧪 Test Your Setup

### 1. Start the server:
```bash
npm run dev
```

### 2. Open: http://localhost:3000

### 3. Sign in with an admin email:
- sepdevansh@gmail.com ⭐
- imposter9850@gmail.com ⭐
- diptanshupuri@gmail.com ⭐
- karanbhatt160608@gmail.com ⭐

### 4. You should see:
- ✅ Your name/photo in top-right
- ✅ "Admin" badge
- ✅ "Dashboard" link

### 5. Go to Admin Dashboard

### 6. Click "Run Diagnostics"
**Should show 4 green checkmarks:**
- ✅ Firebase Configuration
- ✅ Authentication  
- ✅ Firestore Database
- ✅ Firebase Storage

### 7. Create your first NITJ campus project!
- Click "Create Project"
- Title: "NIT Jalandhar Campus Tour"
- Description: "Explore our beautiful campus"
- Upload a campus image
- Choose theme
- Select "Node-Based Navigation"
- Click "Create Project"

### 8. Success! 🎉

---

## 🎓 Perfect for NIT Jalandhar

**Use Cases:**
- 🏛️ Main Campus Tour
- 📚 Library Navigation
- 🔬 Lab Walkthroughs
- 🏘️ Hostel Tours
- 🍽️ Cafeteria & Mess Locations
- 🎭 Auditorium & Cultural Centers
- ⚽ Sports Complex Tour
- 🌳 Campus Gardens & Parks

---

## 📊 Your Project Details

**Project:** campusgo-nitj-485608  
**Region:** asia-south1 (Mumbai)  
**Institution:** NIT Jalandhar

**Admin Team (4 members):**
1. sepdevansh@gmail.com
2. imposter9850@gmail.com
3. diptanshupuri@gmail.com
4. karanbhatt160608@gmail.com

**Services (All Free Tier):**
- ✅ Authentication (Google)
- ✅ Firestore Database
- ✅ Firebase Storage
- ✅ Analytics (included)

---

## 🎯 Quick Tips for NITJ Campus

### Best Practices:
1. **Start with main landmarks:**
   - Main Gate
   - Administrative Block
   - Central Library
   - Academic Blocks

2. **Create logical paths:**
   - Walking routes
   - Building entrances to rooms
   - Floor-by-floor navigation

3. **High-quality images:**
   - Take photos in good lighting
   - Landscape orientation
   - 1920x1080 or higher
   - Consistent camera height

4. **Descriptive titles:**
   - "Main Gate Entrance"
   - "Mechanical Engineering Block - Ground Floor"
   - "Central Library - Reading Room"

### Node Connection Strategy:
- **Up:** Next floor, forward path, enter building
- **Down:** Previous floor, backward path, exit building
- **Left:** Left corridor, left room
- **Right:** Right corridor, right room

---

## 🚀 Getting Started with Your First Tour

### Recommended First Project: "Main Campus Tour"

**Nodes to create:**
1. Main Gate (START) →
2. Central Path →
3. Administrative Block (left) / Library (right) →
4. Academic Blocks →
5. Student Center →
6. Sports Complex

**Connect them logically for a walking tour!**

---

## 🔒 Security

Your setup is secure:
- ✅ Only 4 admins can create projects
- ✅ Only authenticated users can view
- ✅ Images limited to 5MB
- ✅ Only image files allowed
- ✅ Users can only edit their own data

**Perfect for campus-wide deployment!**

---

## 📱 Mobile Access

Once deployed:
- Students can access on phones
- Works on any device with browser
- No app installation needed
- Smooth navigation on mobile

---

## 🐛 Troubleshooting

**If diagnostics show ❌:**

1. **Config ❌:** Restart dev server (`Ctrl+C` then `npm run dev`)
2. **Auth ❌:** Sign out and sign in again with admin email
3. **Firestore ❌:** Wait 2 minutes after publishing rules, then sign in again
4. **Storage ❌:** Check Storage is enabled, wait 2 minutes

**Still issues?**
- Check browser console (F12) for errors
- Read: TROUBLESHOOTING_SAVE_ERROR.md
- Run diagnostics again

---

## 📞 Quick Links

**Firebase Console:**
- Main: https://console.firebase.google.com/project/campusgo-nitj-485608
- Auth: https://console.firebase.google.com/project/campusgo-nitj-485608/authentication
- Firestore: https://console.firebase.google.com/project/campusgo-nitj-485608/firestore
- Storage: https://console.firebase.google.com/project/campusgo-nitj-485608/storage

**Your App:**
- Local: http://localhost:3000
- Admin: http://localhost:3000/admin

---

## 🎉 Ready to Showcase NITJ!

Follow the 5 steps above, test with diagnostics, and start creating amazing campus tours!

**NIT Jalandhar campus exploration made easy!** 🎓✨

---

## 📚 Additional Guides

- **Quick Start:** START_HERE_NOW.md
- **Checklist:** YOUR_SETUP_CHECKLIST.md  
- **Troubleshooting:** TROUBLESHOOTING_SAVE_ERROR.md
- **Full Guide:** SETUP_YOUR_FIREBASE.md

**Start now - takes only 15 minutes!** ⏱️
