# Test Environment Variables

## Your .env.local is correct! ✅

File location: ✅ Correct (in project root)
File content: ✅ All variables present

---

## 🔧 Steps to Fix:

### 1. **COMPLETELY STOP the server**

In your terminal:
- Press **`Ctrl + C`**
- Wait until you see the command prompt return
- Make sure the server is fully stopped

### 2. **Clear Next.js cache** (optional but recommended)

```bash
# Windows
rmdir /s .next
npm run dev

# Or Mac/Linux
rm -rf .next
npm run dev
```

### 3. **Start fresh**

```bash
npm run dev
```

### 4. **Verify environment variables loaded**

After server starts, open: http://localhost:3000

Press **F12** (browser console) and type:

```javascript
console.log({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
})
```

**Should show:**
```javascript
{
  apiKey: "AIzaSyBJYiME8ULhOf388mSfHNo2LE-ZS54fHiE",
  projectId: "campusgo-nitj-485608",
  storageBucket: "campusgo-nitj-485608.firebasestorage.app"
}
```

**If shows undefined:** Environment variables didn't load

---

## 🐛 Troubleshooting:

### Issue 1: Variables still undefined after restart

**Solution:**
```bash
# 1. Stop server
Ctrl + C

# 2. Delete .next folder
rmdir /s .next

# 3. Restart
npm run dev
```

### Issue 2: Storage error

The storage bucket URL might need to be without `.app`

Try changing in `.env.local`:

**From:**
```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=campusgo-nitj-485608.firebasestorage.app
```

**To:**
```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=campusgo-nitj-485608.appspot.com
```

Then restart server.

---

## 🎯 Expected Diagnostic Results:

After proper restart:

1. **Firebase Configuration:** ✅
   - All env variables loaded

2. **Authentication:** ❌ (until you sign in)
   - Normal - just sign in

3. **Firestore Database:** ❌ (until rules set)
   - Follow SETUP_CAMPUSGO_NITJ.md step 2-3

4. **Firebase Storage:** ❌ (until enabled)
   - Follow SETUP_CAMPUSGO_NITJ.md step 4-5

---

## ✅ Quick Fix Commands:

```bash
# Stop server: Ctrl + C

# Clear cache and restart:
rmdir /s .next
npm run dev

# Or if using PowerShell:
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 🔍 Still Not Working?

### Check 1: Is .env.local being read?

Create a test file `test-env.js` in project root:

```javascript
console.log('Testing environment variables:');
console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
```

Run:
```bash
node test-env.js
```

If shows `undefined`, there's an issue with how Node reads .env files.

### Check 2: File encoding

Make sure `.env.local` is saved as **UTF-8** without BOM.

In VS Code:
1. Open `.env.local`
2. Bottom right corner shows encoding
3. Should say "UTF-8"
4. If not, click it and select "UTF-8"

---

## 💡 Most Common Fix:

**90% of the time, this works:**

```bash
# 1. Stop server
Ctrl + C

# 2. Delete .next folder
rmdir /s .next

# 3. Restart
npm run dev

# 4. Wait for "Ready"
# 5. Test again
```

Try this first! 🚀
