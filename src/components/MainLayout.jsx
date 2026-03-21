import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle sidebar and mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      // User wants tablet (768-1280) to NOT be collapsed by default
      if (window.innerWidth < 1280) {
        // We can keep it uncollapsed or let user toggle. 
        // But the specific request is "tablet device the sidebar should also have the names"
        setIsSidebarCollapsed(false);
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex bg-bg-gray min-h-screen">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        isCollapsed={isSidebarCollapsed} 
        onClose={closeMobileMenu}
      />
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300
        ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        ml-0
      `}>
        <Header 
          isMenuOpen={isMobileMenuOpen}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        <main className="px-4 md:px-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
