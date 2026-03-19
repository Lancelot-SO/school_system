import React from 'react';
import { Search, Settings, Bell, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 border-b border-gray-50/50">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-400 hover:text-primary-blue md:hidden transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <h2 className="text-[17px] md:text-xl font-extrabold text-[#1a365d] whitespace-nowrap">Dashboard</h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Search Bar - Responsive width */}
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-pink transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search anything" 
            className="pl-9 pr-4 py-2 bg-gray-50/50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink/30 w-40 md:w-64 shadow-sm text-xs transition-all"
          />
        </div>
        
        {/* Mobile Search Icon Only */}
        <button className="sm:hidden p-2 text-gray-400 hover:text-primary-pink transition-colors">
          <Search size={20} />
        </button>

        {/* Utility Icons */}
        <div className="flex items-center gap-1.5 md:gap-2.5">
          <button className="p-2 md:p-2.5 bg-gray-50/50 rounded-xl text-gray-400 hover:text-primary-pink transition-all shadow-sm hidden xs:block">
            <Settings size={18} />
          </button>
          <button className="p-2 md:p-2.5 bg-gray-50/50 rounded-xl text-gray-400 hover:text-primary-pink transition-all shadow-sm relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-pink rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 md:border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-[13px] font-extrabold text-[#1a365d] leading-none mb-0.5">Oscar Hansen</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</p>
          </div>
          <div className="relative cursor-pointer group">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl border-2 border-white shadow-md group-hover:scale-105 transition-transform object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
