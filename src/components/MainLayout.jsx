import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex bg-bg-gray min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="px-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
