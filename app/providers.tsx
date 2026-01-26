'use client';

import React, { useEffect, useState } from 'react';
import { useThemeStore } from '@/lib/store/themeStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LogoIntro } from '@/components/layout/LogoIntro';

export function Providers({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Apply theme to document
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <>
      {showIntro && (
        <LogoIntro onComplete={() => setIntroComplete(true)} />
      )}
      
      {(introComplete || !showIntro) && (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
