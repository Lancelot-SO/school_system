import React from 'react';
import { MoreHorizontal, Users } from 'lucide-react';

const events = [
  {
    title: 'Annual Sport Competition',
    time: '09:00 AM - 12:00 PM',
    date: 'March 2, 2035',
    target: 'All Classes',
  },
  {
    title: 'Parent-Teacher Meeting',
    time: '02:00 PM - 04:00 PM',
    date: 'March 5, 2035',
    target: '7A, 7B',
  },
  {
    title: 'Annual Science Fair',
    time: '09:00 AM - 05:00 PM',
    date: 'March 28, 2035',
    target: 'All Classes',
  }
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-[#1a365d]">Events</h3>
        <button className="text-gray-400 hover:text-primary-pink transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {events.map((event, index) => (
          <div key={index} className="bg-[#f8f9fa] p-2 rounded-[22px] group cursor-pointer transition-all border border-transparent">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="px-2 py-1 bg-[#fbcfe8] rounded-[10px]">
                  <span className="text-[12px] font-bold text-black">{event.date.split(',')[0]}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400">{event.time}</span>
              </div>

              <h4 className="text-[15px] font-extrabold text-[#1a365d] leading-tight">
                {event.title}
              </h4>

              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400">
                <Users size={14} className="opacity-60" />
                <span>{event.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
