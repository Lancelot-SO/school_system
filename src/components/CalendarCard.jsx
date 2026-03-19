import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarCard = () => {
  return (
    <div className="bg-[#dcf0f4] p-5 rounded-[24px] shadow-sm border border-gray-50">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-[#1a365d] text-sm uppercase tracking-wider">March 2035</span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-gray-50 bg-white rounded-md text-gray-400 hover:text-[#1a365d]"><ChevronLeft size={16} /></button>
          <button className="p-1 hover:bg-gray-50 bg-white rounded-md text-gray-400 hover:text-[#1a365d]"><ChevronRight size={16} /></button>
        </div>
      </div>
      {/* Simple Grid Representation */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-2">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#1a365d]">
        {Array.from({ length: 31 }, (_, i) => (
          <div key={i} className={`p-1.5 rounded-md cursor-pointer hover:bg-sidebar-active hover:text-primary-pink transition-colors ${(i + 1) === 7 ? 'text-primary-pink bg-sidebar-active' : ''}`}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCard;
