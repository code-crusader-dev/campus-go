'use client';

import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { signInWithGoogle } from '@/lib/firebase/auth';

export const AuthButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="primary"
        size="lg"
        onClick={handleSignIn}
        loading={loading}
        className="min-w-[200px]"
      >
        <LogIn className="w-5 h-5" />
        Sign in with Google
      </Button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
