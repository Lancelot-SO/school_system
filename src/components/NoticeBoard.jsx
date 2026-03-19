import React from 'react';
import { MoreHorizontal, FileText } from 'lucide-react';

const notices = [
  {
    title: 'Science Fair Registration Opens',
    tags: ['Academic', 'Event'],
    audience: 'All Students',
    date: 'March 8, 2035',
    creator: 'Academic Coordinator',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Science'
  },
  {
    title: 'Teacher Development Workshop',
    tags: ['Training'],
    audience: 'All Teachers',
    date: 'March 10, 2035',
    creator: "Principal's Office",
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher'
  },
  {
    title: 'New Library Books Arrived',
    tags: ['Resources'],
    audience: 'Students & Teachers',
    date: 'March 12, 2035',
    creator: 'Librarian',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Books'
  },
  {
    title: 'Field Trip Consent Forms Due',
    tags: ['Announcement'],
    audience: 'Grade 7 & 8 Students',
    date: 'March 14, 2035',
    creator: 'Class Advisor',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trip'
  }
];

const NoticeBoard = ({ className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-8 px-1">
        <h2 className="text-[15px] font-extrabold text-[#1a365d]">Notice Board</h2>
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-bold text-gray-400">Sort by:</span>
          <select className="bg-[#dcf0f4] border-none text-[13px] font-bold text-primary-blue rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary-pink/20 outline-none cursor-pointer border-transparent transition-all">
            <option>Popular</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group border-b border-gray-50 last:border-0"
          >
            {/* Title & Category */}
            <div className="flex items-center gap-4 flex-[2] w-full min-w-[280px]">
              <img src={notice.imageUrl} alt={notice.title} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col gap-1">
                <h4 className="text-[13px] font-bold text-[#1a365d] group-hover:text-primary-pink transition-colors line-clamp-1">
                  {notice.title}
                </h4>
                <div className="flex items-center gap-2">
                  {notice.tags.map((tag, i) => (
                    <span key={i} className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${tag === 'Academic' ? 'bg-indigo-50 text-indigo-500' :
                      tag === 'Event' ? 'bg-cyan-50 text-cyan-500' :
                        tag === 'Training' ? 'bg-blue-50 text-blue-500' :
                          'bg-pink-50 text-pink-500'
                      }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-8 flex-[3] w-full justify-between sm:justify-start">
              {/* Audience */}
              <div className="flex flex-col gap-0.5 min-w-[80px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Audience</span>
                <span className="text-[11px] font-bold text-gray-700">{notice.audience}</span>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-0.5 min-w-[100px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Date</span>
                <span className="text-[11px] font-bold text-gray-700">{notice.date}</span>
              </div>

              {/* Created By */}
              <div className="flex flex-col gap-0.5 min-w-[120px]">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Created By</span>
                <span className="text-[11px] font-bold text-gray-700">{notice.creator}</span>
              </div>
            </div>
            {/* Right Section: Actions */}
            <div className="flex items-center justify-end px-2">
              <button className="text-gray-400 hover:text-primary-pink transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NoticeBoard;
