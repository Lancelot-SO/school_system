import React from 'react';
import { MoreHorizontal, Calendar, Check } from 'lucide-react';

const tasks = [
  { text: 'Review Teacher Attendance Records', date: 'March 11, 2035', completed: true },
  { text: 'Prepare Science Fair Guidelines', date: 'March 13, 2035', completed: false },
  { text: 'Update Library Book Inventory', date: 'March 14, 2035', completed: false },
];

const ToDoList = ({ className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-primary-blue">To Do List</h3>
        <button className="text-gray-400 hover:text-primary-pink transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-start gap-5 py-6 border-b border-gray-50 last:border-0 group">
            <button 
              className={`mt-1.5 w-6 h-6 rounded-[8px] flex items-center justify-center transition-all ${
                task.completed 
                  ? 'bg-primary-blue text-white shadow-sm' 
                  : 'bg-gray-50 text-transparent'
              }`}
            >
              <Check size={14} strokeWidth={4} className={task.completed ? 'block' : 'opacity-0'} />
            </button>
            <div className="flex flex-col gap-2.5">
              <span className={`text-[13.5px] font-bold text-gray-800 leading-tight transition-colors group-hover:text-primary-blue`}>
                {task.text}
              </span>
              <div className="flex items-center gap-2 bg-gray-50 w-fit px-2.5 py-1 rounded-lg">
                <Calendar size={12} className="text-primary-blue" />
                <span className="text-[11px] text-primary-blue font-bold tracking-tight">{task.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
