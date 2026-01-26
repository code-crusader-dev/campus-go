# Campus Go - Deployment Guide

This guide covers deploying **Campus Go** to production using free-tier services.

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications and offers a generous free tier.

#### Advantages
- ✅ Optimized for Next.js
- ✅ Automatic deployments from Git
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Preview deployments for PRs
- ✅ Zero configuration

#### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Import project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

4. **Configure environment variables**
   - Add all variables from `.env.local`:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     NEXT_PUBLIC_ADMIN_EMAILS
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app is live! 🎉

6. **Update Firebase settings**
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to authorized domains
   - Example: `campus-go.vercel.app`

---

### Option 2: Netlify

Another excellent option for static site deployment.

#### Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Deploy**
   - Drag and drop the `.next` folder
   - Or connect GitHub repository
   - Add environment variables in Site Settings

4. **Configure**
   - Build command: `npm run build`
   - Publish directory: `.next`

---

### Option 3: Firebase Hosting

Host directly on Firebase (same platform as your backend).

#### Steps

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize hosting**
   ```bash
   firebase init hosting
   ```
   
   Configuration:
   - Public directory: `out`
   - Single-page app: `Yes`
   - GitHub integration: Optional

4. **Update `next.config.js`**
   ```javascript
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

5. **Build for export**
   ```bash
   npm run build
   ```

6. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

---

## 🔧 Pre-Deployment Checklist

### Code
- [ ] Remove console.logs
- [ ] Remove debug code
- [ ] Test all features
- [ ] Check responsive design
- [ ] Test on different browsers
- [ ] Verify dark mode works

### Firebase
- [ ] Firestore security rules configured
- [ ] Storage security rules configured
- [ ] Authentication providers enabled
- [ ] Admin emails configured
- [ ] Billing alerts set up (optional)

### Environment
- [ ] All environment variables set
- [ ] Admin emails updated
- [ ] Production Firebase project created
- [ ] No sensitive data in code

### Performance
- [ ] Images optimized
- [ ] Unused dependencies removed
- [ ] Build size checked
- [ ] Lighthouse score > 90

---

## 🌐 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-60 minutes)

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic with Let's Encrypt)

### Firebase Hosting

1. Run: `firebase hosting:channel:deploy preview`
2. Add custom domain in Firebase Console
3. Update DNS records
4. Deploy: `firebase deploy --only hosting`

---

## 📊 Post-Deployment

### Testing

1. **Functionality Test**
   - [ ] Sign in works
   - [ ] Admin can create projects
   - [ ] Node editor works
   - [ ] Node viewer displays correctly
   - [ ] Comments can be added
   - [ ] Images upload successfully
   - [ ] Search works
   - [ ] Theme toggle works

2. **Performance Test**
   - Run Lighthouse audit
   - Check mobile performance
   - Test on slow connections
   - Verify image loading

3. **Security Test**
   - [ ] Firestore rules prevent unauthorized access
   - [ ] Storage rules work correctly
   - [ ] Admin routes protected
   - [ ] HTTPS enabled

### Monitoring

1. **Firebase Console**
   - Monitor Authentication usage
   - Check Firestore read/write counts
   - Monitor Storage usage
   - Set up usage alerts

2. **Vercel Analytics** (if using Vercel)
   - Enable Web Analytics
   - Monitor page views
   - Track performance metrics

3. **Google Analytics** (optional)
   - Add GA4 tracking
   - Monitor user behavior
   - Track conversions

---

## 🔄 Continuous Deployment

### Automatic Deployments

#### Vercel
- Automatically deploys on push to `main` branch
- Preview deployments for pull requests
- Rollback with one click

#### Netlify
- Deploy from Git
- Branch deploys
- Deploy previews

#### Setup Git Workflow

```bash
# Development
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create PR, get preview deployment
# Merge to main for production deployment
```

---

## 📈 Scaling Considerations

### Firebase Free Tier Limits

**Firestore:**
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1 GiB stored

**Storage:**
- 5 GB stored
- 1 GB/day downloaded

**Authentication:**
- Unlimited users

### Optimization Tips

1. **Reduce Firestore Reads**
   - Implement client-side caching
   - Use pagination
   - Cache project list

2. **Optimize Images**
   - Compress before upload
   - Use appropriate formats
   - Implement lazy loading

3. **Efficient Queries**
   - Use indexes
   - Limit query results
   - Cache frequently accessed data

---

## 🛡️ Security Best Practices

### Production Checklist

- [ ] Enable Firestore security rules
- [ ] Enable Storage security rules
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS only
- [ ] Implement rate limiting (Firebase)
- [ ] Regular security audits
- [ ] Keep dependencies updated

### Firebase Security Rules

**Update Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; // Deny by default
    }
    
    // Your specific rules here
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // ... rest of your rules
  }
}
```

---

## 🐛 Troubleshooting Production Issues

### Common Issues

**"Firebase not initialized"**
- Check environment variables are set
- Verify Firebase config is correct
- Check Vercel/Netlify environment variables

**"Permission denied" errors**
- Review Firestore security rules
- Check user authentication status
- Verify admin email list

**Images not loading**
- Check Storage security rules
- Verify CORS settings
- Check image URLs

**Slow performance**
- Enable caching
- Optimize images
- Use CDN
- Check Firestore indexes

### Debug Mode

To enable debug logs in production:

```javascript
// Add to firebase config
if (process.env.NODE_ENV === 'development') {
  console.log('Debug mode enabled');
}
```

---

## 💰 Cost Management

### Stay on Free Tier

**Monitor Usage:**
1. Set up Firebase budget alerts
2. Check usage daily initially
3. Optimize based on usage patterns

**Reduce Costs:**
1. Implement caching
2. Optimize images
3. Use pagination
4. Lazy load data

### Upgrade Path

If you outgrow free tier:

**Firebase Blaze Plan:**
- Pay as you go
- Free tier included
- Set spending limits

**Vercel Pro:** ($20/month)
- More bandwidth
- Better analytics
- Priority support

---

## 📝 Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor usage
- Review user feedback
- Test critical features

**Monthly:**
- Update dependencies
- Security audit
- Backup database
- Review analytics

**Quarterly:**
- Major updates
- Feature additions
- Performance optimization
- User survey

### Backup Strategy

**Firestore Backup:**
```bash
# Using Firebase CLI
firebase firestore:export gs://bucket-name/backups/$(date +%Y%m%d)
```

**Storage Backup:**
- Use Firebase Storage export
- Download to local/cloud backup
- Automated with Cloud Functions (paid)

---

## 🎯 Performance Targets

### Goal Metrics

- **Lighthouse Score:** > 90
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

### Monitoring Tools

1. **Vercel Analytics**
2. **Google Lighthouse**
3. **Firebase Performance Monitoring**
4. **Web Vitals**

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

## ✅ Final Checklist

Before announcing your deployment:

- [ ] All features tested
- [ ] Security rules in place
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring set up
- [ ] Backup strategy implemented
- [ ] Admin accounts configured
- [ ] Documentation updated
- [ ] User guide created
- [ ] Support email configured

---

🎉 **Congratulations!** Your Campus Go application is now live and ready for users to explore!
