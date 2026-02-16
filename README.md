# Campus Go 🎓

A modern campus exploration platform with node-based navigation, similar to Google Street View but focused on individual buildings and indoor/outdoor navigation.


<img width="1919" height="953" alt="image" src="https://github.com/user-attachments/assets/2252ec7b-87bb-4a86-8308-7198c948b6fe" />



## 🌐 Live Demo

🔗 https://campus-go-sf2g.vercel.app/

## ✨ Features

### User Features
- 🏠 **Homepage** with searchable project cards
- 🎯 **Node-Based Navigation** - Explore campus locations with connected image nodes
- 💬 **Comments System** - Engage with projects
- 🌓 **Dark/Light Theme** - Choose your preferred viewing mode
- 📱 **Responsive Design** - Works on all devices

### Admin Features
- 🔐 **Google Sign-In** authentication
- 📊 **Admin Dashboard** for project management
- ➕ **Create Projects** with custom themes and content
- 🔗 **Two Content Types**:
  - External links
  - Node-based street view system
- 🎨 **Visual Node Editor** - Connect locations in 4 directions (up, down, left, right)
- 🗑️ **Moderation** - Delete inappropriate comments

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- Firebase account (free tier)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd campus-go
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Google Authentication
   - Create a Firestore database
   - Enable Firebase Storage
   - Copy your Firebase config

4. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Firebase configuration.

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
campus-go/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── admin/               # Admin dashboard
│   ├── project/             # Project viewer
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── admin/              # Admin-specific components
│   ├── project/            # Project display components
│   ├── node-viewer/        # Node navigation system
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components
├── lib/                    # Utilities and configurations
│   ├── firebase/           # Firebase setup
│   ├── store/              # State management (Zustand)
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Helper functions
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 📚 Database Schema

### Collections

#### `projects`
- `id` (string) - Auto-generated
- `title` (string)
- `description` (string)
- `coverImage` (string) - URL
- `theme` (object) - { color, style }
- `contentType` (string) - "external" | "nodes"
- `externalUrl` (string?) - If contentType is "external"
- `nodes` (array?) - If contentType is "nodes"
- `createdBy` (string) - Admin user ID
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

#### `comments`
- `id` (string) - Auto-generated
- `projectId` (string)
- `userName` (string)
- `text` (string)
- `createdAt` (timestamp)

#### `users`
- `id` (string) - User ID
- `email` (string)
- `displayName` (string)
- `photoURL` (string)
- `isAdmin` (boolean)
- `createdAt` (timestamp)

### Node Structure
```typescript
{
  id: string;
  image: string;
  title?: string;
  connections: {
    up?: string;    // Node ID
    down?: string;  // Node ID
    left?: string;  // Node ID
    right?: string; // Node ID
  }
}
```

## 🎨 Branding

The Campus Go logo features a modern, minimal design with a futuristic aesthetic. The animated intro showcases smooth motion inspired by campus navigation.

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Authentication**: Google Sign-In

## 📝 Usage

### For Admins

1. **Sign in** with your Google account
2. Navigate to the **Admin Dashboard**
3. **Create a new project**:
   - Add title, description, and cover image
   - Choose a theme
   - Select content type (external link or nodes)
   - If using nodes:
     - Add node images
     - Connect nodes in 4 directions
     - Save your project

### For Users

1. **Browse projects** on the homepage
2. **Search** for specific projects
3. **Click a project** to explore:
   - External links open in new tab
   - Node-based projects show immersive view
4. **Navigate** using directional buttons
5. **Leave comments** to share feedback

## 🎯 Key Features Explained

### Node-Based Navigation

The core feature allows admins to create connected image nodes that users can navigate through:
- Each node is a location with an image
- Nodes connect in 4 directions (up, down, left, right)
- Smooth transitions between nodes
- Disabled buttons when no connection exists

### Theme System

Projects can have custom themes with color schemes that enhance the viewing experience while maintaining accessibility.

### Comments System

Users can engage with projects through a built-in commenting system. Admins have moderation capabilities to maintain community standards.

## 🌟 Future Enhancements

- Multi-language support
- Advanced search filters
- Project analytics
- 360° panoramic images
- Mobile app version
- Offline mode

## 📄 License

MIT License - feel free to use this project for your campus!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for campus communities worldwide
