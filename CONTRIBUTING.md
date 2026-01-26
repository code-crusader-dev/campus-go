# Contributing to Campus Go

Thank you for your interest in contributing to Campus Go! This document provides guidelines for contributing to the project.

---

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title and description**
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Screenshots** (if applicable)
5. **Environment details** (browser, OS, etc.)

**Example:**
```
Title: Node connections not saving

Description: When creating connections between nodes in the editor,
the connections are not persisted after saving.

Steps to reproduce:
1. Create a new node-based project
2. Add 3 nodes
3. Connect node 1 to node 2 using "right" direction
4. Click "Save Nodes"
5. Refresh the page
6. Connections are missing

Expected: Connections should persist
Actual: Connections are lost

Environment: Chrome 120, Windows 11
```

---

## 💻 Development Setup

### Prerequisites

- Node.js 18+
- Git
- Firebase account
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/campus-go.git
   cd campus-go
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Add your Firebase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

---

## 🔧 Code Style

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` types when possible
- Use descriptive variable names

**Good:**
```typescript
interface NodeConnection {
  up?: string;
  down?: string;
  left?: string;
  right?: string;
}

const createNode = (image: string, title?: string): Node => {
  return {
    id: generateId(),
    image,
    title,
    connections: {},
  };
};
```

**Bad:**
```typescript
const createNode = (img: any, t: any) => {
  return {
    id: generateId(),
    image: img,
    title: t,
    connections: {},
  };
};
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Use proper prop types
- Add comments for complex logic

**Component Structure:**
```typescript
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface MyComponentProps {
  title: string;
  onSave: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onSave }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onSave();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick} loading={loading}>
        Save
      </Button>
    </div>
  );
};
```

### CSS/Styling

- Use Tailwind CSS classes
- Follow existing patterns
- Keep styles consistent
- Use dark mode variants

**Good:**
```tsx
<div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
    Title
  </h2>
</div>
```

---

## 📁 Project Structure

```
campus-go/
├── app/                  # Next.js pages
├── components/          # React components
│   ├── admin/          # Admin-specific
│   ├── auth/           # Authentication
│   ├── layout/         # Layout components
│   ├── project/        # Project display
│   └── ui/             # Reusable UI
├── lib/                # Core logic
│   ├── firebase/       # Firebase operations
│   ├── hooks/          # Custom hooks
│   ├── store/          # State management
│   └── utils/          # Utilities
└── types/              # TypeScript types
```

### File Naming

- Components: PascalCase (e.g., `NodeEditor.tsx`)
- Utilities: camelCase (e.g., `helpers.ts`)
- Pages: lowercase (e.g., `page.tsx`)
- Types: PascalCase (e.g., `index.ts` with exported types)

---

## 🎯 Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow existing patterns
   - Test thoroughly

3. **Test your changes**
   - Manual testing
   - Check responsive design
   - Test dark mode
   - Verify Firebase operations

4. **Commit with clear messages**
   ```bash
   git commit -m "Add: Node duplication feature"
   ```

### Commit Message Format

Use conventional commits:

- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Changes to existing features
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Style:` Formatting changes

**Examples:**
```
Add: Image compression before upload
Fix: Node connections not persisting
Update: Improve search performance
Refactor: Simplify authentication logic
Docs: Add deployment instructions
Style: Format code with Prettier
```

### Submit PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Clear title and description
   - Reference related issues
   - Add screenshots/videos if UI changes
   - List testing done

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested in production build
- [ ] Tested responsive design
- [ ] Tested dark mode

## Screenshots
(if applicable)

## Related Issues
Closes #123
```

---

## 🐛 Bug Fix Guidelines

1. **Create issue first** (if doesn't exist)
2. **Reproduce the bug** reliably
3. **Write failing test** (if applicable)
4. **Fix the bug**
5. **Verify fix works**
6. **Submit PR** with clear description

---

## ✨ Feature Requests

### Proposing New Features

1. **Check existing issues** to avoid duplicates
2. **Create a detailed issue** with:
   - Use case
   - Expected behavior
   - Mockups/wireframes (if UI)
   - Implementation ideas (optional)

3. **Wait for feedback** before implementing
4. **Discuss approach** with maintainers

### Feature Development

- Start with smallest viable implementation
- Keep changes focused
- Update documentation
- Add comments for complex logic
- Consider mobile experience

---

## 📚 Documentation

### When to Update Docs

- Adding new features
- Changing existing behavior
- Adding configuration options
- Fixing bugs that affect usage

### Documentation Files

- `README.md` - Overview and quick start
- `SETUP.md` - Detailed setup instructions
- `FEATURES.md` - Feature documentation
- `DATABASE_SCHEMA.md` - Database structure
- `DEPLOYMENT.md` - Deployment guide
- `CONTRIBUTING.md` - This file

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Google sign in works
- [ ] Sign out works
- [ ] Admin detection works
- [ ] Protected routes work

**Admin Features:**
- [ ] Create project
- [ ] Edit project
- [ ] Delete project
- [ ] Add nodes
- [ ] Edit nodes
- [ ] Delete nodes
- [ ] Connect nodes
- [ ] Set start node
- [ ] Delete comments

**User Features:**
- [ ] View projects
- [ ] Search projects
- [ ] View node viewer
- [ ] Navigate nodes
- [ ] Add comments
- [ ] Toggle theme

**Responsive:**
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

---

## 🎨 Design Guidelines

### UI Principles

1. **Consistency** - Follow existing patterns
2. **Accessibility** - WCAG 2.1 AA compliance
3. **Responsiveness** - Mobile-first approach
4. **Performance** - Optimize for speed
5. **Feedback** - Loading states, confirmations

### Color Palette

- Primary: Blue (#0ea5e9)
- Success: Green (#10b981)
- Warning: Orange (#f97316)
- Danger: Red (#ef4444)
- Neutral: Gray scale

### Typography

- Font: Inter (system default)
- Headings: Bold, larger sizes
- Body: Regular weight
- Code: Monospace

---

## 🔐 Security

### Security Considerations

- Never commit secrets or API keys
- Use environment variables
- Validate user input
- Sanitize data before display
- Follow Firebase security best practices
- Keep dependencies updated

### Reporting Security Issues

**DO NOT** create public issues for security vulnerabilities.

Instead:
1. Email security@campusgo.com (replace with actual)
2. Include detailed description
3. Wait for response before disclosure

---

## 💬 Communication

### Getting Help

- Create an issue for questions
- Join Discord (if available)
- Email maintainers
- Check existing documentation

### Code Reviews

- Be respectful and constructive
- Focus on code, not person
- Explain reasoning
- Suggest alternatives
- Acknowledge good work

---

## 📋 Checklist for Contributors

Before submitting:

- [ ] Code follows style guidelines
- [ ] Changes are well-tested
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] PR description is complete
- [ ] No console.logs left in code
- [ ] Dark mode tested (if UI changes)
- [ ] Mobile responsive (if UI changes)

---

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Given contributor badge

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

## 🙏 Thank You!

Your contributions make Campus Go better for everyone. We appreciate your time and effort!

---

**Questions?** Feel free to reach out to the maintainers or create an issue.

Happy coding! 🚀
