# Getting Started with Campus Go

Welcome to **Campus Go**! This guide will help you get started quickly.

---

## 🎯 What is Campus Go?

Campus Go is a modern campus exploration platform that lets you create immersive, node-based navigation experiences similar to Google Street View, but focused on individual buildings and indoor/outdoor campus navigation.

### Key Capabilities

✨ **Create Interactive Tours**
- Upload location images
- Connect them in 4 directions
- Users navigate through your campus

🎨 **Customize Everything**
- Brand colors and themes
- Custom cover images
- Personalized descriptions

👥 **Two User Types**
- **Admins**: Create and manage projects
- **Users**: Explore and comment

---

## 📖 Documentation Guide

We've created comprehensive documentation to help you:

### 🚀 Start Here

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡
   - Get running in 5 minutes
   - Minimal setup steps
   - Quick test project

2. **[INSTALL.md](INSTALL.md)** 📦
   - Complete installation guide
   - Troubleshooting section
   - Step-by-step Firebase setup

### 📚 Learn More

3. **[README.md](README.md)** 📖
   - Project overview
   - Features summary
   - Tech stack
   - Quick links

4. **[SETUP.md](SETUP.md)** 🔧
   - Detailed configuration
   - Firebase security rules
   - Environment variables
   - First-time setup

5. **[FEATURES.md](FEATURES.md)** ✨
   - Complete feature list
   - Usage instructions
   - Best practices
   - UI guidelines

### 🏗️ Technical Docs

6. **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** 🗄️
   - Firestore structure
   - Storage organization
   - Query patterns
   - Security rules

7. **[DEPLOYMENT.md](DEPLOYMENT.md)** 🌐
   - Production deployment
   - Vercel setup
   - Firebase hosting
   - Custom domains

8. **[CONTRIBUTING.md](CONTRIBUTING.md)** 🤝
   - How to contribute
   - Code style guide
   - Pull request process
   - Development setup

9. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** 📊
   - Complete overview
   - File structure
   - Feature breakdown
   - Statistics

---

## 🎬 Quick Start Path

### For First-Time Users

**Just want to see it work?**

1. Follow **[QUICKSTART.md](QUICKSTART.md)** (5 min)
2. Sign in and create a test project
3. Done! ✅

### For Serious Implementation

**Building a production campus tour?**

1. Read **[INSTALL.md](INSTALL.md)** (detailed setup)
2. Review **[FEATURES.md](FEATURES.md)** (understand capabilities)
3. Check **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** (data structure)
4. Deploy with **[DEPLOYMENT.md](DEPLOYMENT.md)**

### For Developers

**Contributing or customizing?**

1. Follow **[INSTALL.md](INSTALL.md)** (development setup)
2. Read **[CONTRIBUTING.md](CONTRIBUTING.md)** (code standards)
3. Review **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** (architecture)
4. Check **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** (overview)

---

## 🎓 Learning Path

### Day 1: Setup & Basics
- [ ] Install application ([INSTALL.md](INSTALL.md))
- [ ] Create Firebase project
- [ ] Sign in and test
- [ ] Create first project

### Day 2: Master Features
- [ ] Read [FEATURES.md](FEATURES.md)
- [ ] Create node-based project
- [ ] Add multiple nodes
- [ ] Connect navigation paths
- [ ] Test user experience

### Day 3: Customize
- [ ] Adjust themes
- [ ] Upload campus images
- [ ] Plan navigation flow
- [ ] Add descriptions

### Week 2: Deploy
- [ ] Review [DEPLOYMENT.md](DEPLOYMENT.md)
- [ ] Set up production Firebase
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Launch! 🚀

---

## 🔑 Key Concepts

### Projects
Two types of content:
1. **External Link** - Redirect to existing tours
2. **Node-Based** - Create custom navigation

### Nodes
- Individual location images
- Connected in 4 directions (up, down, left, right)
- Optional titles
- One designated as "start node"

### Navigation
Users explore by clicking direction buttons:
- **Up** → Forward, upstairs, next floor
- **Down** → Backward, downstairs, previous floor
- **Left** → Left room, left corridor
- **Right** → Right room, right corridor

### Themes
Customize project appearance:
- Primary color (6 options)
- Style (modern, classic, minimal, vibrant)
- Applied consistently

---

## 💡 Common Use Cases

### 1. New Student Orientation
**Goal:** Help new students explore campus before arrival

**Setup:**
- Create "Campus Tour" project
- Add nodes for key buildings
- Connect logical walking paths
- Add descriptive titles

### 2. Building Interior Navigation
**Goal:** Guide visitors through a specific building

**Setup:**
- Create "Science Building Tour" project
- Add entrance as start node
- Map each floor/room
- Connect with clear directions

### 3. Virtual Open House
**Goal:** Let prospective students explore remotely

**Setup:**
- Create multiple projects (one per building)
- High-quality photos
- Detailed descriptions
- Enable comments for questions

### 4. Event Navigation
**Goal:** Help attendees navigate conference venue

**Setup:**
- Create "Conference Navigation" project
- Map registration, sessions, dining
- Connect with event flow
- Update as needed

---

## 🎯 Success Checklist

### Before You Start
- [ ] Node.js installed
- [ ] Firebase account created
- [ ] Google account ready
- [ ] Images prepared (optional)

### Setup Complete When
- [ ] Dev server runs without errors
- [ ] Can sign in with Google
- [ ] Admin dashboard visible
- [ ] Can create projects
- [ ] Can add nodes
- [ ] Navigation works

### Production Ready When
- [ ] All projects tested
- [ ] Comments work
- [ ] Search works
- [ ] Mobile responsive
- [ ] Firebase rules configured
- [ ] Environment variables set

---

## 🆘 Need Help?

### Quick Answers

**Q: Which guide should I read first?**
A: Start with [QUICKSTART.md](QUICKSTART.md) for fast setup, or [INSTALL.md](INSTALL.md) for detailed instructions.

**Q: Can I use this for free?**
A: Yes! Firebase free tier supports small-to-medium projects.

**Q: How many projects can I create?**
A: Unlimited projects. Firebase free tier limits storage (5GB) and reads (50k/day).

**Q: Can users edit projects?**
A: No, only admins can create/edit projects. Users can view and comment.

**Q: How do I add more admins?**
A: Add their email to `NEXT_PUBLIC_ADMIN_EMAILS` in `.env.local` and Firestore rules.

**Q: Can I customize the design?**
A: Yes! Edit components in `components/` folder. Tailwind CSS is used for styling.

### More Questions?

1. Check **[INSTALL.md](INSTALL.md)** troubleshooting section
2. Review **[FEATURES.md](FEATURES.md)** for feature details
3. Read **[SETUP.md](SETUP.md)** for configuration help
4. Check browser console for errors
5. Create a GitHub issue

---

## 🏃 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📁 Important Files

```
📄 Configuration
├── .env.local              # Your Firebase config (create this!)
├── package.json            # Dependencies
└── next.config.js          # Next.js settings

📄 Documentation (You are here!)
├── GETTING_STARTED.md      # This file
├── QUICKSTART.md           # 5-minute setup
├── INSTALL.md              # Detailed installation
├── SETUP.md                # Configuration guide
├── FEATURES.md             # Feature documentation
├── DATABASE_SCHEMA.md      # Data structure
├── DEPLOYMENT.md           # Deploy to production
└── CONTRIBUTING.md         # Contribution guide

📂 Application Code
├── app/                    # Pages and routes
├── components/             # React components
├── lib/                    # Business logic
└── types/                  # TypeScript types
```

---

## 🎨 Project Stats

- **Total Files:** 56
- **TypeScript/React Components:** 25
- **Documentation:** 9 comprehensive guides
- **Total Code Size:** ~208 KB
- **Lines of Documentation:** 2000+
- **Technologies:** 10+ modern tools

---

## 🌟 What Makes Campus Go Special?

### For Admins
✅ **Easy to Use** - Intuitive visual editor
✅ **No Coding Required** - Point and click interface
✅ **Flexible** - External links or custom nodes
✅ **Customizable** - Themes and branding

### For Users
✅ **Immersive** - Fullscreen navigation
✅ **Smooth** - Beautiful animations
✅ **Interactive** - Comment system
✅ **Fast** - Optimized performance

### For Developers
✅ **Modern Stack** - Next.js 14, TypeScript, Firebase
✅ **Clean Code** - Well-organized, documented
✅ **Type-Safe** - Full TypeScript support
✅ **Extensible** - Easy to customize

---

## 🚀 Ready to Start?

### Choose Your Path:

**🏃 Quick Test** (5 minutes)
→ Go to [QUICKSTART.md](QUICKSTART.md)

**📚 Full Setup** (20 minutes)
→ Go to [INSTALL.md](INSTALL.md)

**🎓 Learn Everything** (1 hour)
→ Read [FEATURES.md](FEATURES.md) then [SETUP.md](SETUP.md)

**🚢 Deploy** (30 minutes)
→ Go to [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🎉 Welcome Aboard!

You're about to create amazing campus exploration experiences. We can't wait to see what you build!

**Questions?** Check the docs above.
**Stuck?** See [INSTALL.md](INSTALL.md) troubleshooting.
**Ready?** Let's go! 🚀

---

**Made with ❤️ for campus communities worldwide**

*Last updated: January 2024*
