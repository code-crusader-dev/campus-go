'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loading } from '@/components/ui/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <Loading fullScreen text="Checking authentication..." />;
  }

  if (!user) {
    router.push('/');
    return null;
  }

  if (adminOnly && !isAdmin) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};
