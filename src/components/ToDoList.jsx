import React from 'react';
import { MoreHorizontal, Calendar, Check } from 'lucide-react';

const tasks = [
  { text: 'Review Teacher Attendance Records', date: 'March 11, 2035', completed: true },
  { text: 'Prepare Science Fair Guidelines', date: 'March 13, 2035', completed: false },
  { text: 'Update Library Book Inventory', date: 'March 14, 2035', completed: false },
];

const ToDoList = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col h-full min-h-[420px]">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-[#1a365d]">To Do List</h3>
        <button className="text-gray-400 hover:text-primary-pink transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      <div className="space-y-0 flex-1">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-start gap-5 py-6 border-b border-gray-100 last:border-0 group">
            <button 
              className={`mt-1 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                task.completed 
                  ? 'bg-[#1a365d] border-[#1a365d] text-white shadow-sm' 
                  : 'bg-[#f5f6fa] border-gray-100'
              }`}
            >
              {task.completed && <Check size={16} strokeWidth={4} />}
            </button>
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-gray-800 leading-tight">
                {task.text}
              </span>
              <div className="flex items-center gap-2 bg-[#f5f6fa] w-fit px-2 py-0.5 rounded-md">
                <Calendar size={12} className="text-[#1a365d]" />
                <span className="text-[11px] text-[#1a365d] font-bold">{task.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
