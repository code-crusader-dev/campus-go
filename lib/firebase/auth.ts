// Authentication utilities

import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from './config';
import { User } from '@/types';

// List of admin emails from environment variable
const getAdminEmails = (): string[] => {
  const emails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  return emails.split(',').map(email => email.trim()).filter(Boolean);
};

/**
 * Check if user is admin based on email
 */
export const isAdminEmail = (email: string): boolean => {
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email);
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    
    // Check if user document exists
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    const isAdmin = isAdminEmail(firebaseUser.email || '');
    
    if (!userSnap.exists()) {
      // Create new user document
      const newUser: Omit<User, 'id'> = {
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'Anonymous',
        photoURL: firebaseUser.photoURL || '',
        isAdmin,
        createdAt: serverTimestamp() as any,
      };
      
      await setDoc(userRef, newUser);
    } else if (userSnap.data().isAdmin !== isAdmin) {
      // Update admin status if it changed
      await setDoc(userRef, { isAdmin }, { merge: true });
    }
    
    const userData = (await getDoc(userRef)).data();
    
    return {
      id: firebaseUser.uid,
      ...userData,
    } as User;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current user data from Firestore
 */
export const getCurrentUserData = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return {
        id: uid,
        ...userSnap.data(),
      } as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
