import React from 'react';
import { UserPlus, ClipboardCheck, Banknote, Pencil, MoreHorizontal } from 'lucide-react';

const activities = [
  {
    icon: UserPlus,
    title: 'New student Alicia Gomez (Class 8B) enrolled by Registrar.',
    time: 'March 7, 2035 - 09:15 AM',
    bg: 'bg-primary-blue',
    color: 'text-white'
  },
  {
    icon: ClipboardCheck,
    title: 'Attendance for Class 7A marked by Teacher John Smith.',
    time: 'March 7, 2035 - 11:30 AM',
    bg: 'bg-primary-pink/20',
    color: 'text-primary-blue'
  },
  {
    icon: Banknote,
    title: 'Monthly fee payments verified for Class 9 students.',
    time: 'March 8, 2035 - 02:45 PM',
    bg: 'bg-primary-blue',
    color: 'text-white'
  },
  {
    icon: Pencil,
    title: 'Exam timetable for Term 2 updated by Academic Coordinator.',
    time: 'March 9, 2035 - 10:20 AM',
    bg: 'bg-primary-pink/20',
    color: 'text-primary-blue'
  }
];

const RecentActivity = ({ className = "" }) => {

  return (
    <div className={`bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-primary-blue">Recent Activity</h3>
        <button className="text-gray-400 hover:text-primary-pink transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-8 relative flex-1 ml-1 overflow-y-auto custom-scrollbar pr-2">
        {/* Dash Line */}
        <div className="absolute left-[20px] top-2 bottom-8 w-0 border-l-2 border-dashed border-gray-100 z-0"></div>

        {activities.map((activity, index) => (
          <div key={index} className="relative flex gap-5 pb-6 last:pb-0 group">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full ${activity.bg} flex items-center justify-center relative z-10 border-2 border-white shadow-sm transition-transform group-hover:scale-110`}>
                <activity.icon size={18} className={activity.color} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 pt-0.5">
              <p className="text-[13px] font-bold text-gray-800 leading-snug group-hover:text-primary-blue transition-colors">
                {activity.title}
              </p>
              <span className="text-[11px] font-medium text-gray-400">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
