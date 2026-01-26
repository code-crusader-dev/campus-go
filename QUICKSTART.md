# Campus Go - Quick Start Guide

Get up and running with Campus Go in under 10 minutes! 🚀

---

## ⚡ 5-Minute Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Firebase Setup (3 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project → Name it "Campus Go"
3. Enable **Google Authentication**
4. Create **Firestore Database** (test mode)
5. Enable **Storage** (test mode)
6. Get your config from **Project Settings**

### 3. Environment Variables (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAILS=your-email@gmail.com
```

### 4. Run (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 First Steps

### 1. Sign In
- Click "Sign in with Google"
- You're automatically an admin (your email is in ADMIN_EMAILS)

### 2. Create Your First Project
- Go to Admin Dashboard
- Click "Create Project"
- Add title: "My Campus Tour"
- Add description: "Welcome to our campus"
- Upload a cover image
- Select theme color and style
- Choose "Node-Based Navigation"
- Click "Create Project"

### 3. Add Nodes
- You'll be redirected to the Node Editor
- Click "Add Node"
- Upload an image (your starting location)
- Add title: "Main Entrance"
- Click "Create Node"
- Add more nodes for different locations

### 4. Connect Nodes
- Click a direction button (up/down/left/right) on a node
- Click another node to connect them
- Repeat to create navigation paths
- Click "Save Nodes"

### 5. Explore
- Go to Homepage
- Click your project
- Click "Start Exploration"
- Navigate using direction buttons!

---

## 📱 Test Checklist

Quick things to verify:

- [ ] Sign in works
- [ ] Can create project
- [ ] Can add nodes
- [ ] Can connect nodes
- [ ] Navigation works
- [ ] Can add comments
- [ ] Dark mode toggle works

---

## 🐛 Common Issues

**"Firebase not configured"**
- Check `.env.local` exists
- Verify all variables are filled

**"Permission denied"**
- Check Firebase security rules
- Verify you're signed in

**"Images not uploading"**
- Check Storage is enabled
- Verify file is under 5MB

---

## 📚 Next Steps

Once you're up and running:

1. Read [SETUP.md](SETUP.md) for detailed configuration
2. Check [FEATURES.md](FEATURES.md) for feature documentation
3. Review [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for data structure
4. See [DEPLOYMENT.md](DEPLOYMENT.md) when ready to deploy

---

## 💡 Tips

- **Test with real photos** of your campus for best results
- **Plan your navigation flow** before creating nodes
- **Use descriptive node titles** so users know where they are
- **Start small** - create 3-5 connected nodes first
- **Test navigation** from a user's perspective

---

## 🎓 Example Project Structure

```
Main Entrance (START)
    ↑
  Lobby
    ↑
Staircase → Floor 2 Hallway → Classroom 201
                ↓
           Classroom 202
```

This creates a simple navigation:
- Enter at Main Entrance
- Go up to Lobby
- Go up to Staircase
- Go right to Floor 2 Hallway
- Go right to Classroom 201
- Or go down to Classroom 202

---

## 🆘 Need Help?

- Check [README.md](README.md) - Overview
- Check [SETUP.md](SETUP.md) - Detailed setup
- Create an issue on GitHub
- Check browser console for errors

---

**Ready to go?** Run `npm run dev` and start building! 🚀
