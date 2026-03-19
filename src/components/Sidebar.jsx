import React from 'react';
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
  ChevronDown
} from 'lucide-react';

// Using the megaphone image from the public folder
const MegaphoneImage = "/megaphone.png";

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', active: true },
  { icon: Mail, label: 'Inbox' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Users, label: 'Teachers' },
  { icon: UserCircle2, label: 'Students' },
  { icon: UserPlus2, label: 'Attendance' },
  { icon: CircleDollarSign, label: 'Finance', hasDropdown: true },
  { icon: FileText, label: 'Notice Board' },
];

const Sidebar = ({ isOpen, isCollapsed }) => {
  return (
    <div className={`fixed left-0 top-0 h-screen bg-white flex flex-col z-50 transition-all duration-300 border-r border-gray-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Logo */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-primary-pink/10 rounded-lg skew-x-3 rotate-6"></div>
          <div className="relative bg-gradient-to-br from-[#f9a8d4] to-[#7dd3fc] w-7 h-7 rounded flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base select-none">S</span>
          </div>
        </div>
        {!isCollapsed && <h1 className="text-xl font-bold text-primary-blue tracking-tight">Schola</h1>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[16px] transition-all duration-300 group ${item.active
              ? 'bg-sidebar-active !text-primary-blue shadow-sm'
              : 'text-sidebar-text hover:bg-gray-50 hover:text-primary-blue'
              }`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3.5'}`}>
              <item.icon
                size={isCollapsed ? 22 : 18}
                strokeWidth={item.active ? 2.5 : 2}
                className={item.active ? 'text-primary-blue' : 'text-sidebar-text/70 group-hover:text-primary-blue'}
              />
              {!isCollapsed && (
                <span className={`text-[12px] font-bold tracking-wide ${item.active ? 'opacity-100' : 'opacity-80'}`}>
                  {item.label}
                </span>
              )}
            </div>
            {!isCollapsed && item.hasDropdown && (
              <ChevronDown
                size={14}
                className={`transition-transform ${item.active ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}
              />
            )}
          </button>
        ))}
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
              <h3 className="text-[17px] font-extrabold text-[#1a365d] leading-none mb-1">New Tools Available</h3>
              <p className="text-[11px] text-[#718096] font-semibold leading-snug px-2">
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
      <div className={`px-8 pb-8 ${isCollapsed ? '!px-0 flex justify-center' : ''}`}>
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
