# Campus Go - Features Documentation

## 🎨 Branding & UI

### Logo
- **Modern, futuristic design** with navigation-inspired elements
- Animated intro on first load (2-3 seconds)
- Smooth transitions and motion effects
- Responsive sizing (small, medium, large)

### Theme System
- **Dark Mode** and **Light Mode** support
- Persistent theme selection (saved in local storage)
- Smooth transitions between modes
- Custom theme colors per project

### Design Philosophy
- Clean and minimal interface
- Student-friendly UX
- Accessibility-first approach
- Mobile-responsive throughout

---

## 👥 User Roles

### Admin
- Google Sign-In authentication
- Full project management capabilities
- Comment moderation
- Access to admin dashboard

### Normal User
- Google Sign-In authentication
- Browse all projects
- Search functionality
- View node-based navigation
- Leave comments

---

## 📊 Admin Dashboard

### Statistics Overview
- Total projects count
- Node-based projects count
- External link projects count

### Project Management
- **Create** new projects
- **Edit** existing projects
- **Delete** projects with confirmation
- View project metadata (creation date, type, nodes count)

### Quick Actions
- One-click access to node editor
- Direct project preview
- Batch operations support

---

## 🎯 Project Creation

### Basic Information
- **Title** (required)
- **Description** (required)
- **Cover Image** (required)
  - Upload from device
  - Paste image URL
  - Take photo with camera
  - Drag & drop support

### Theme Customization
- **Primary Color Selection**
  - Blue, Purple, Green, Orange, Pink, Red
  - Visual color picker
  - Real-time preview

- **Style Selection**
  - Modern
  - Classic
  - Minimal
  - Vibrant

### Content Types

#### Option A: External Link
- Provide external URL
- Redirect users to external website
- Useful for existing campus virtual tours

#### Option B: Node-Based Navigation
- Create immersive campus exploration
- Connect multiple image nodes
- 4-directional navigation (up, down, left, right)
- Set start node for user entry point

---

## 🗺️ Node-Based Navigation System

### Node Creation
- **Add unlimited nodes** to a project
- Each node contains:
  - Image (location photo)
  - Optional title/label
  - Connection points (4 directions)

### Image Upload Methods
1. **File Upload**
   - Drag and drop
   - Click to browse
   - Multiple format support (JPEG, PNG, GIF, WebP)
   - Max file size: 5MB

2. **Image URL**
   - Paste any public image URL
   - Instant preview

3. **Camera Capture**
   - Take photos directly
   - Mobile-optimized

### Node Connections
- **Visual Connection Interface**
  - Click direction button on source node
  - Click target node to complete connection
  - Connection indicators show linked nodes
  - Remove connections with single click

- **4-Directional Navigation**
  - Up: Navigate upward (e.g., upper floor, forward path)
  - Down: Navigate downward (e.g., lower floor, backward path)
  - Left: Navigate left (e.g., adjacent room, left corridor)
  - Right: Navigate right (e.g., adjacent room, right corridor)

### Node Management
- Edit node image and title
- Delete nodes with confirmation
- Set/change start node
- View all connections at a glance

---

## 🎮 User Experience (Node Viewer)

### Immersive Fullscreen View
- **Fullscreen mode** for distraction-free exploration
- High-quality image display
- Smooth transition animations between nodes

### Navigation Controls
- **4 directional buttons** overlaid on image
  - Positioned: top, bottom, left, right
  - Visual indicators for available connections
  - Disabled state for unavailable directions
  - Hover effects for interactivity

### Additional Controls
- **Home button**: Return to start node
- **Close button**: Exit viewer, return to project page
- **Title overlay**: Display current location name
- **Loading indicator**: Smooth transitions

### Animation System
- Fade transitions between nodes
- Scale effects based on navigation direction
- Loading state feedback
- 500ms transition duration

---

## 🏠 Homepage

### Project Cards
- **Grid layout** (responsive columns)
- Each card displays:
  - Cover image
  - Project title
  - Short description (truncated)
  - Content type indicator (external/nodes)

### Search Functionality
- **Real-time search** as you type
- Search across:
  - Project titles
  - Project descriptions
- Fast, client-side filtering
- No results state with helpful message

### User Interface
- Clean, card-based layout
- Hover effects on cards
- Click to view project
- Mobile-optimized grid

---

## 💬 Comments System

### Adding Comments
- Authenticated users can comment
- Simple form interface
- Real-time submission
- Character limit: reasonable length

### Comment Display
- **Chronological order** (newest first)
- Show commenter name
- Relative timestamp ("2 hours ago")
- Clean, readable layout

### Comment Moderation (Admin Only)
- Delete inappropriate comments
- One-click removal
- Confirmation before deletion
- Instant UI update

### Comment Features
- User name display
- Timestamp with relative time
- Multi-line text support
- Auto-refresh on new comments

---

## 🔧 Technical Features

### Authentication
- **Google Sign-In** integration
- Firebase Authentication
- Admin role management via email list
- Secure session handling
- Auto-login on return visits

### Database (Firestore)
- **Collections:**
  - `users` - User profiles and roles
  - `projects` - Project data
  - `comments` - User comments

- **Real-time updates** where needed
- Optimized queries
- Security rules implemented

### Storage (Firebase Storage)
- **Organized folder structure:**
  - `/projects/{projectId}/covers/` - Cover images
  - `/projects/{projectId}/nodes/{nodeId}/` - Node images

- Image optimization
- CDN delivery
- Secure upload/download

### State Management
- **Zustand** for global state
- Auth state persistence
- Theme preference persistence
- Minimal re-renders

### Performance
- Image lazy loading
- Code splitting
- Optimized bundle size
- Fast page loads
- Smooth 60fps animations

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layouts
- Touch-optimized controls
- Mobile navigation menu
- Larger tap targets
- Optimized images

### Tablet (768px - 1024px)
- 2-column grid layouts
- Balanced spacing
- Tablet-friendly navigation

### Desktop (> 1024px)
- 3-column grid layouts
- Full feature set
- Optimal viewing experience

---

## ♿ Accessibility

### Keyboard Navigation
- Tab navigation support
- Focus indicators
- Keyboard shortcuts (where applicable)

### Screen Readers
- Semantic HTML
- ARIA labels
- Alt text for images
- Descriptive buttons

### Visual Accessibility
- High contrast ratios
- Readable font sizes
- Color-blind friendly
- Clear visual hierarchy

---

## 🚀 Performance Optimizations

### Image Handling
- Automatic image optimization
- Lazy loading
- WebP format support
- CDN delivery via Firebase

### Code Optimization
- Tree shaking
- Code splitting
- Minimal dependencies
- Production builds optimized

### Loading States
- Skeleton screens
- Loading spinners
- Progressive enhancement
- Optimistic UI updates

---

## 🔒 Security Features

### Authentication
- Secure OAuth flow
- Session management
- Role-based access control
- Protected routes

### Data Protection
- Firestore security rules
- Storage security rules
- Input validation
- XSS prevention

### Admin Protection
- Email-based admin verification
- Admin-only routes
- Restricted operations
- Audit trails (via Firebase)

---

## 🎯 Use Cases

### Campus Tours
- Virtual campus orientation
- Building interior navigation
- Campus facility showcases

### Educational Paths
- Historical campus tours
- Art gallery walkthroughs
- Science lab demonstrations

### Event Navigation
- Conference venue guides
- Festival location maps
- Exhibition navigation

### Facilities Management
- Maintenance route documentation
- Safety inspection paths
- Accessibility route mapping

---

## 🔮 Future Enhancement Ideas

### Potential Features (Not Implemented)
- 360° panoramic images
- Video nodes
- Audio guides
- Multi-language support
- Social sharing
- Favorites/bookmarks
- User profiles
- Analytics dashboard
- AR integration
- Mobile apps (iOS/Android)
- Offline mode
- Project templates
- Collaborative editing

---

## 📊 Analytics & Insights

### Available Metrics (for future implementation)
- Project view counts
- Node navigation paths
- Comment engagement
- User session duration
- Popular projects
- Search trends

---

## 🎓 Best Practices

### For Admins
1. Use high-quality images (1920x1080 or higher)
2. Write clear node titles
3. Create logical navigation paths
4. Test navigation flow before publishing
5. Set appropriate start nodes
6. Add descriptive project descriptions
7. Choose themes that match content

### For Creating Great Experiences
1. **Plan your route** before adding nodes
2. **Maintain consistency** in image quality
3. **Use descriptive titles** for nodes
4. **Test navigation** from user perspective
5. **Connect nodes logically** (intuitive directions)
6. **Start with key locations** as entry points

---

## 💡 Tips & Tricks

### Node Organization
- Use numbered prefixes for sequential routes
- Group related nodes visually in your planning
- Document your node structure externally

### Image Quality
- Shoot in landscape orientation
- Use consistent lighting
- Avoid motion blur
- Capture wide angles when possible

### User Engagement
- Add welcome messages in descriptions
- Encourage comments
- Respond to user feedback
- Update projects regularly

---

## 🛠️ Troubleshooting

### Common Issues

**Images not displaying?**
- Check file size (under 5MB)
- Verify image format (JPEG, PNG, GIF, WebP)
- Ensure URL is publicly accessible

**Can't connect nodes?**
- Check if both nodes exist
- Verify you're in connection mode
- Ensure you're not connecting node to itself

**Comments not appearing?**
- Verify you're signed in
- Check internet connection
- Refresh the page

---

For setup instructions, see [SETUP.md](SETUP.md)
For general information, see [README.md](README.md)
