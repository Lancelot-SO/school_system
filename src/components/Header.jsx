import React from 'react';
import { Search, Settings, Bell, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/inbox': return 'Inbox';
      case '/calendar': return 'Calendar';
      case '/attendance': return 'Attendance';
      case '/teachers': return 'Teachers';
      case '/students/add': return 'Add Student';
      default: return 'Dashboard';

    }
  };

  return (
    <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center px-4 md:px-8 sticky top-0 z-40 w-full">
      {/* Mobile Header (3-Column Layout) */}
      <div className="flex md:hidden items-center justify-between w-full">
        <div className="flex-1 flex justify-start">
          <div className="w-8 h-8 bg-linear-to-br from-primary-pink to-primary-blue rounded-lg flex items-center justify-center text-white font-black shadow-sm">
            S
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <h2 className="text-[17px] font-extrabold text-primary-blue tracking-tight whitespace-nowrap">{getPageTitle()}</h2>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={onMenuClick}
            className="p-2 -mr-2 text-gray-400 hover:text-primary-blue transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden block p-2 -ml-2 text-gray-400 hover:text-primary-blue transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-extrabold text-primary-blue leading-tight">{getPageTitle()}</h2>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search anything"
              className="pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink/20 w-64 shadow-sm text-xs transition-all"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-primary-pink transition-all">
              <Settings size={18} />
            </button>
            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-primary-pink transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-pink rounded-full border-2 border-white"></span>
            </button>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
            <div className="text-right">
              <p className="text-[13px] font-extrabold text-primary-blue leading-none mb-0.5">Oscar Hansen</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
