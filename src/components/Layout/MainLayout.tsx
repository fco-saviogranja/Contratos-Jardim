import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function MainLayout({ children, currentPage, onNavigate }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8fa]">
      <Header />
      <Navigation currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1 p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}