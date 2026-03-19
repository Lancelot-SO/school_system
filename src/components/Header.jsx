import React from 'react';
import { Search, Settings, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-bg-gray/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 border-b border-gray-100/50">
      <div className="flex items-center gap-4">
        {/* Page Title could go here dynamically */}
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-pink transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search anything" 
            className="pl-9 pr-4 py-2 bg-white border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink/30 w-56 shadow-sm text-xs transition-all"
          />
        </div>

        {/* Utility Icons */}
        <div className="flex items-center gap-2.5">
          <button className="p-2 bg-white rounded-xl text-gray-400 hover:text-primary-pink hover:bg-sidebar-active transition-all shadow-sm">
            <Settings size={18} />
          </button>
          <button className="p-2 bg-white rounded-xl text-gray-400 hover:text-primary-pink hover:bg-sidebar-active transition-all shadow-sm relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-pink rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right">
            <p className="text-[13px] font-extrabold text-[#1a365d]">Oscar Hansen</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</p>
          </div>
          <div className="relative cursor-pointer group">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-10 h-10 rounded-xl border-2 border-white shadow-md group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
