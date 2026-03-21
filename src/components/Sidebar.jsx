import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  LayoutGrid,
  Mail,
  Calendar,
  Users,
  UserCircle2,
  UserPlus2,
  CircleDollarSign,
  FileText,
  LogOut,
  ChevronDown,
  Search,
  Settings,
  Bell
} from 'lucide-react';

// Using the megaphone image from the public folder
const MegaphoneImage = "/megaphone.png";

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: '/' },
  { icon: Mail, label: 'Inbox', path: '/inbox' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Users, label: 'Teachers', path: '/teachers' },
  { 
    icon: UserCircle2, 
    label: 'Students', 
    path: '/students', 
    hasDropdown: true,
    subItems: [
      { label: 'Student Details', path: '/student-details' },
      { label: 'Add Student', path: '/students/add' }
    ]
  },
  { icon: UserPlus2, label: 'Attendance', path: '/attendance' },
  { icon: CircleDollarSign, label: 'Finance', path: '/finance', hasDropdown: true },

  { icon: FileText, label: 'Notice Board', path: '/notice-board' },
];

const Sidebar = ({ isOpen, isCollapsed }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Initialize or update open dropdown based on active path
  React.useEffect(() => {
    const activeItem = navItems.find(item => 
      item.hasDropdown && item.subItems?.some(sub => location.pathname === sub.path)
    );
    if (activeItem) {
      setOpenDropdown(activeItem.label);
    }
  }, [location.pathname]);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isParentActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some(sub => location.pathname === sub.path);
    }
    return false;
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-white flex flex-col z-50 transition-all duration-300 border-r border-gray-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Logo */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-primary-pink/10 rounded-lg skew-x-3 rotate-6"></div>
          <div className="relative bg-linear-to-br from-[#f9a8d4] to-[#7dd3fc] w-7 h-7 rounded flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base select-none">S</span>
          </div>
        </div>
        {!isCollapsed && <h1 className="text-xl font-bold text-primary-blue tracking-tight">Schola</h1>}
      </div>

      {/* Mobile-only User & Search Section */}
      <div className="px-6 py-2 md:hidden flex flex-col gap-6 mb-4">
        {/* User Card */}
        <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-[24px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User" 
                className="w-11 h-11 rounded-xl border-2 border-white shadow-md object-cover"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-extrabold text-primary-blue leading-tight">Oscar Hansen</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin Account</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white rounded-xl text-gray-400 shadow-sm border border-gray-100 hover:text-primary-pink transition-all">
              <Bell size={18} />
            </button>
            <button className="p-2 bg-white rounded-xl text-gray-400 shadow-sm border border-gray-100 hover:text-primary-blue transition-all">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for anything..." 
            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary-pink/10 shadow-sm text-[13px] font-medium transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400">
              <path d="M4 21v-7m0-4V3m8 18v-11m0-4V3m8 18v-7m0-4V3M1 14h6m2-11h6m2 11h6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navItems.map((item, index) => {
          const isActive = isParentActive(item);
          const isDropdownOpen = openDropdown === item.label;

          return (

            <div key={index} className="flex flex-col gap-1">
              {item.hasDropdown ? (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-[16px] transition-all duration-300 group
                    ${isActive
                      ? 'bg-sidebar-active text-primary-blue! shadow-sm'
                      : 'text-sidebar-text hover:bg-gray-50 hover:text-primary-blue'
                    }
                  `}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3.5'}`}>
                    <item.icon
                      size={isCollapsed ? 22 : 18}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={isActive ? 'text-primary-blue' : 'text-sidebar-text/70 group-hover:text-primary-blue'}
                    />
                    {!isCollapsed && (
                      <span className={`text-[12px] font-bold tracking-wide ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive: linkActive }) => `
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-[16px] transition-all duration-300 group
                    ${linkActive
                      ? 'bg-sidebar-active text-primary-blue! shadow-sm'
                      : 'text-sidebar-text hover:bg-gray-50 hover:text-primary-blue'
                    }
                  `}
                >
                  {({ isActive: linkActive }) => (
                    <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3.5'}`}>
                      <item.icon
                        size={isCollapsed ? 22 : 18}
                        strokeWidth={linkActive ? 2.5 : 2}
                        className={linkActive ? 'text-primary-blue' : 'text-sidebar-text/70 group-hover:text-primary-blue'}
                      />
                      {!isCollapsed && (
                        <span className={`text-[12px] font-bold tracking-wide ${linkActive ? 'opacity-100' : 'opacity-80'}`}>
                          {item.label}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              )}

              {/* Sub items */}
              {!isCollapsed && item.hasDropdown && isDropdownOpen && (
                <div className="flex flex-col gap-1 ml-9 mt-1 border-l-2 border-gray-50 pl-2 animate-in slide-in-from-top-2 duration-300">
                  {item.subItems.map((sub, idx) => (
                    <NavLink
                      key={idx}
                      to={sub.path}
                      className={({ isActive: subActive }) => `
                        px-4 py-2 rounded-xl text-[11px] font-bold transition-all
                        ${subActive 
                          ? 'text-primary-pink bg-pink-50/50' 
                          : 'text-sidebar-text hover:text-primary-blue hover:bg-gray-50'
                        }
                      `}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>


      {/* Promo Card precisely as seen in the image - Hidden on medium/collapsed */}
      {!isCollapsed && (
        <div className="px-5 mb-4">
          <div className="bg-promo-bg rounded-[32px] p-6 pt-0 mt-8 relative flex flex-col items-center text-center">
            {/* 3D Megaphone Positioning - Scaled down and blended */}
            <div className="absolute -top-6 w-16 h-16 flex items-center justify-center animate-float z-20">
              <img
                src={MegaphoneImage}
                alt="New Tools"
                className="w-full h-full object-contain scale-110 mix-blend-multiply brightness-110"
              />
            </div>

            <div className="mt-12 space-y-1 relative z-10">
              <h3 className="text-[17px] font-extrabold text-primary-blue leading-none mb-1">New Tools Available</h3>
              <p className="text-[11px] text-sidebar-text font-semibold leading-snug px-2">
                Smarter updates for easier school management
              </p>
            </div>

            <button className="mt-5 w-full bg-promo-btn text-primary-blue text-[14px] font-extrabold py-3.5 rounded-[18px] hover:brightness-95 transition-all shadow-sm active:scale-95">
              See Updates
            </button>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className={`px-8 pb-8 ${isCollapsed ? 'px-0! flex justify-center' : ''}`}>
        <button className={`flex items-center gap-3 text-sidebar-text hover:text-red-500 transition-all group ${isCollapsed ? 'justify-center' : 'w-full'}`}>
          <LogOut size={isCollapsed ? 22 : 18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
          {!isCollapsed && <span className="font-bold text-[12px]">Logout</span>}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Sidebar;
