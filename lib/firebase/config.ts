// Firebase configuration and initialization

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBJYiME8ULhOf388mSfHNo2LE-ZS54fHiE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "campusgo-nitj-485608.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "campusgo-nitj-485608",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "campusgo-nitj-485608.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "929686638360",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:929686638360:web:2705188d03765de8b0586d",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-4HD1SFWNFB"
};

// Log configuration status (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Config Status:', {
    apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
    authDomain: firebaseConfig.authDomain ? 'Set' : 'Missing',
    projectId: firebaseConfig.projectId ? 'Set' : 'Missing',
    storageBucket: firebaseConfig.storageBucket ? 'Set' : 'Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? 'Set' : 'Missing',
    appId: firebaseConfig.appId ? 'Set' : 'Missing',
    measurementId: firebaseConfig.measurementId ? 'Set' : 'Missing',
  });
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Export the app and config for debugging
export default app;
export { firebaseConfig };