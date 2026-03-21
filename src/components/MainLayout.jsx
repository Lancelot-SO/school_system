import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle auto-collapse on medium screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
      
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex bg-bg-gray min-h-screen">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        isCollapsed={isSidebarCollapsed} 
      />
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300
        ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
        ml-0
      `}>
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="px-4 md:px-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
