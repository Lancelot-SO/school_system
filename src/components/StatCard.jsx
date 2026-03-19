import React from 'react';

const StatCard = ({ title, value, icon: Icon, color, iconColor }) => {
  return (
    <div className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-0.5">
        <span className="text-gray-400 text-[11px] font-bold tracking-tight">{title}</span>
        <span className="text-2xl font-extrabold text-[#1a365d] leading-none">{value}</span>
      </div>
      <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shrink-0`}>
        <Icon className={iconColor} size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default StatCard;
