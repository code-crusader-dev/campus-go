// Custom hook for authentication

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { onAuthStateChange, getCurrentUserData } from '@/lib/firebase/auth';

export const useAuth = () => {
  const { user, loading, setUser, setLoading, isAdmin } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = await getCurrentUserData(firebaseUser.uid);
        setUser(userData);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return {
    user,
    loading,
    isAdmin: isAdmin(),
    isAuthenticated: !!user,
  };
};
