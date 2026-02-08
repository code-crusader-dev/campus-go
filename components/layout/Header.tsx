'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Moon, Sun, LogOut, LayoutDashboard, User } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '@/lib/hooks/useAuth';
import { useThemeStore } from '@/lib/store/themeStore';
import { signOut } from '@/lib/firebase/auth';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, isAdmin, isAuthenticated } = useAuth();
  const { mode, toggleTheme } = useThemeStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo size="sm" />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
              pathname === '/' 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Home
          </Link>
          
          {isAdmin && (
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                pathname.startsWith('/admin')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {mode === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* User menu */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-2 ml-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.displayName}
                </span>
                {isAdmin && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                    Admin
                  </span>
                )}
              </div>
              
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center justify-between">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === '/' ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Home
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={`text-sm font-medium ${
                pathname.startsWith('/admin') ? 'text-primary-600' : 'text-gray-600'
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
