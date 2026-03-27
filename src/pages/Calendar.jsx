import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  FileText, 
  X, 
  BookOpen, 
  Megaphone, 
  DollarSign, 
  UserCircle2,
  Settings,
  Bell,
  LayoutGrid,
  Filter,
  MoreVertical,
  Maximize2,
  ChevronDown
} from 'lucide-react';

const stats = [
  { icon: LayoutGrid, label: 'All Schedules', count: 12, bgColor: 'bg-[#bae6fd]', iconColor: 'text-[#0ea5e9]', isMain: true },
  { icon: BookOpen, label: 'Academic', count: 4, bgColor: 'bg-white', iconColor: 'text-[#db2777]', badgeColor: 'bg-[#fdf2f8]' },
  { icon: Megaphone, label: 'Events', count: 3, bgColor: 'bg-white', iconColor: 'text-[#0ea5e9]', badgeColor: 'bg-[#f0f9ff]' },
  { icon: DollarSign, label: 'Finance', count: 2, bgColor: 'bg-white', iconColor: 'text-[#2563eb]', badgeColor: 'bg-[#eff6ff]' },
  { icon: FileText, label: 'Administration', count: 3, bgColor: 'bg-white', iconColor: 'text-[#6366f1]', badgeColor: 'bg-[#eef2ff]' },
];

const calendarEvents = [
  { id: 1, title: 'Science Project Submission Deadline', category: 'Academic', day: 1, time: '10:00 AM', color: 'bg-primary-pink text-white rounded-lg px-2 py-1' },
  { id: 2, title: 'Monthly Expense Review', category: 'Finance', day: 1, time: '03:00 PM - 04:00 PM', color: 'bg-[#1a365d] text-white rounded-lg px-2 py-1' },
  { id: 3, title: 'Sports Competition (Preliminary Round)', category: 'Events', day: 6, time: '08:30 AM - 12:00 PM', color: 'bg-[#bae6fd] text-[#0ea5e9] rounded-lg px-2 py-1 border border-[#0ea5e9]/20' },
  { id: 4, title: 'Midterm Exam - Mathematics', category: 'Academic', day: 7, time: '09:00 AM - 11:00 AM', color: 'bg-primary-pink/10 text-primary-pink rounded-lg px-2 py-1 border border-primary-pink/20' },
  { id: 5, title: 'Staff Meeting', category: 'Administration', day: 7, time: '02:00 PM - 03:30 PM', color: 'bg-gray-50 text-[#1a365d] rounded-lg px-2 py-1 border border-gray-200' },
  { id: 6, title: 'Teacher Development Workshop', category: 'Academic', day: 9, time: '01:00 PM - 05:00 PM', color: 'bg-primary-pink/10 text-primary-pink rounded-lg px-2 py-1 border border-primary-pink/20' },
  { id: 7, title: 'English Literature Exam', category: 'Academic', day: 12, time: '09:00 AM - 11:00 AM', color: 'bg-primary-pink/10 text-primary-pink rounded-lg px-2 py-1 border border-primary-pink/20' },
  { id: 8, title: 'Parent-Teacher Meeting (Class 7 & 8)', category: 'Events', day: 12, time: '02:00 PM - 04:00 PM', color: 'bg-[#bae6fd] text-[#0ea5e9] rounded-lg px-2 py-1 border border-[#0ea5e9]/20' },
  { id: 9, title: 'Football Match vs St. Peters', category: 'Sports', day: 15, time: '03:30 PM - 05:00 PM', color: 'bg-[#fef3c7] text-[#d97706] rounded-lg px-2 py-1 border border-[#d97706]/20' },
  { id: 10, title: 'Staff Briefing', category: 'Training', day: 18, time: '08:00 AM - 09:00 AM', color: 'bg-[#f5f3ff] text-[#7c3aed] rounded-lg px-2 py-1 border border-[#7c3aed]/20' },
  { id: 11, title: 'Art Exhibition', category: 'Events', day: 20, time: '10:00 AM - 04:00 PM', color: 'bg-[#bae6fd] text-[#0ea5e9] rounded-lg px-2 py-1 border border-[#0ea5e9]/20' },
  { id: 12, title: 'Class 9 Fee Payment Deadline', category: 'Finance', day: 23, time: 'All Day', color: 'bg-[#1a365d] text-white rounded-lg px-2 py-1' },
  { id: 13, title: 'Annual Science Fair', category: 'Events', day: 26, time: '09:00 AM - 05:00 PM', color: 'bg-[#bae6fd] text-[#0ea5e9] rounded-lg px-2 py-1 border border-[#0ea5e9]/20' },
  { id: 14, title: 'Quarterly Performance Review Meeting', category: 'Administration', day: 28, time: '01:00 PM - 03:00 PM', color: 'bg-white text-[#1a365d] rounded-lg px-2 py-1 border border-gray-100 shadow-sm' },
  { id: 15, title: 'Final Exam - Chemistry', category: 'Academic', day: 29, time: '08:30 AM - 10:30 AM', color: 'bg-primary-pink/10 text-primary-pink rounded-lg px-2 py-1 border border-primary-pink/20' },
];

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileView, setMobileView] = useState('calendar');

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    if (window.innerWidth < 1024) {
      setMobileView('details');
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-hidden">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-[24px] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 ${stat.bgColor}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${stat.isMain ? 'bg-white shadow-sm' : stat.badgeColor}`}>
                <stat.icon size={18} className={stat.iconColor} />
              </div>
              <span className={`text-[13px] font-bold tracking-tight ${stat.isMain ? 'text-primary-blue' : 'text-gray-900'}`}>{stat.label}</span>
            </div>
            <span className={`text-[20px] font-extrabold ${stat.isMain ? 'text-primary-blue' : 'text-gray-900'}`}>{stat.count}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Main Calendar Grid */}
        <div className="flex-1 bg-white rounded-[40px] shadow-lg shadow-gray-200/40 p-1.5 border border-white flex flex-col min-w-0">
          {/* ... (rest of calendar header and grid header) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer group">
                <h2 className="text-xl font-extrabold text-primary-blue tracking-tight">March 2035</h2>
                <ChevronDown size={18} className="text-gray-400 group-hover:text-primary-blue transition-colors" />
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                  <ChevronLeft size={18} className="text-gray-400" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center bg-gray-100/50 p-1.5 rounded-[16px] border border-gray-100/50">
                {['Day', 'Week', 'Month'].map((view) => (
                  <button
                    key={view}
                    className={`px-5 sm:px-7 py-2 rounded-[12px] text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                      view === 'Month' 
                        ? 'bg-white text-primary-blue shadow-sm ring-1 ring-gray-100' 
                        : 'text-gray-400 hover:text-primary-blue'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 bg-primary-pink text-white px-4 sm:px-6 py-2.5 rounded-[16px] text-xs font-extrabold hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-primary-pink/25 whitespace-nowrap">
                <Plus size={16} strokeWidth={3} />
                <span className="hidden xs:inline">Add Agenda</span>
                <span className="xs:hidden">Add</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-50/50 mx-6 rounded-t-[20px] border-x border-t border-gray-100 grid grid-cols-7 text-center py-4 shrink-0 overflow-x-auto no-scrollbar min-w-[1000px] lg:min-w-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <span key={day} className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">{day}</span>
            ))}
          </div>

          <div className="mx-6 mb-6 border-x border-b border-gray-100 rounded-b-[20px] flex-1 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)] min-w-[1000px] lg:min-w-0">
              {/* ... (grid body lines) */}
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNumber = i - 3; 
                const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                const displayDay = dayNumber <= 0 ? 25 + i : (dayNumber > 31 ? dayNumber - 31 : dayNumber);
                const eventsThisDay = calendarEvents.filter(e => e.day === dayNumber);

                return (
                  <div 
                    key={i} 
                    className={`border-r border-b border-gray-100 p-2 sm:p-3 flex flex-col transition-colors hover:bg-gray-50/50 group ${i % 7 === 6 ? 'border-r-0' : ''}`}
                  >
                    <div className="h-6 mb-1 flex items-start shrink-0">
                      <span className={`text-[11px] font-extrabold transition-colors ${isCurrentMonth ? 'text-primary-blue/40 group-hover:text-primary-blue group-hover:opacity-100' : 'text-gray-200'}`}>
                        {displayDay}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-h-0">
                      {eventsThisDay.map(event => (
                        <div 
                          key={event.id}
                          className={`${event.color} cursor-pointer hover:brightness-[0.98] hover:shadow-md transition-all active:scale-95 group/event relative p-2 min-h-[40px] flex flex-col justify-center`}
                          onClick={() => handleEventSelect(event)}
                        >
                          <h4 className="text-[10px] font-bold leading-tight line-clamp-2">{event.title}</h4>
                          <span className="text-[8px] font-medium opacity-70 mt-0.5 block">{event.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedule Details Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0 transition-all duration-300">
          <div className="bg-white rounded-[40px] shadow-lg shadow-gray-200/40 p-6 border border-white flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-pink/5 blur-[50px] rounded-full pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">Schedule Details</h3>
              <button 
                className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"
                onClick={() => setSelectedEvent(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
              {(() => {
                const activeEvents = selectedEvent 
                  ? calendarEvents.filter(e => e.day === selectedEvent.day)
                  : calendarEvents.filter(e => e.day === 12); // Default to March 12 as in design

                return activeEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`rounded-[32px] p-6 border shadow-sm transition-all duration-300 mb-4 ${
                      event.category === 'Academic' ? 'bg-[#fdf2f8] border-promo-btn/50' :
                      event.category === 'Events' ? 'bg-[#f0f9ff] border-[#bae6fd]/50' :
                      'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                        event.category === 'Academic' ? 'bg-white text-primary-pink shadow-sm border border-primary-pink/10' :
                        event.category === 'Events' ? 'bg-white text-[#0ea5e9] shadow-sm border border-[#0ea5e9]/10' :
                        'bg-white text-gray-500 shadow-sm border border-gray-100'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-primary-blue mb-5 leading-tight">{event.title}</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-5 flex justify-center">
                          <CalendarIcon size={16} className="opacity-40" />
                        </div>
                        <span className="text-[11px] font-bold">March {event.day}, 2035</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-5 flex justify-center">
                          <Clock size={16} className="opacity-40" />
                        </div>
                        <span className="text-[11px] font-bold">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-5 flex justify-center">
                          <MapPin size={16} className="opacity-40" />
                        </div>
                        <span className="text-[11px] font-bold">
                          {event.category === 'Academic' ? 'Room 204' : 
                           event.category === 'Events' ? 'School Auditorium' : 
                           'Main Hall'}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`mt-6 p-4 rounded-2xl ${
                      event.category === 'Academic' ? 'bg-white/60' : 'bg-white/80'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={14} className="text-gray-400 opacity-60" />
                        <span className="text-[10px] font-extrabold text-primary-blue/60 uppercase tracking-widest">Notes</span>
                      </div>
                      <p className="text-[11px] font-bold text-gray-600 leading-relaxed">
                        {event.category === 'Academic' ? 'Bring your own stationery; no electronic devices allowed.' : 
                         event.category === 'Events' ? 'Parents are requested to arrive 15 minutes early for registration.' : 
                         'Please review the meeting agenda sent via email.'}
                      </p>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e0;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Calendar;
