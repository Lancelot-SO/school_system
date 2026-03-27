import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Bell, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight, 
  MoreVertical, 
  Filter, 
  Calendar,
  Clock,
  User,
  Users,
  ExternalLink,
  FileText,
  Download,
  Share2,
  Trash2,
  Archive,
  Edit3,
  X,
  Eye,
  TrendingUp,
  LayoutGrid,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';

const noticesData = [
  {
    id: 'NB-1001',
    category: 'Academic',
    title: 'Midterm Exam Timetable Released',
    audience: 'Students (Class 7-9)',
    postDate: 'Mar 5, 2035',
    expDate: 'Mar 8, 2035',
    createdBy: 'Academic Office',
    status: 'Active',
    views: 542,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    content: 'The official midterm exam timetable for classes 7, 8, and 9 has been released. Students are advised to check their class schedules and prepare accordingly. Exams will begin on March 20, 2035 and continue until March 28, 2035. Detailed subject-wise schedules are available in the attachments section below.',
    attachment: { name: 'Midterm_Timetable_2035.pdf', size: '2.4 MB' }
  },
  {
    id: 'NB-1002',
    category: 'Events',
    title: 'Parent-Teacher Meeting Invitation',
    audience: 'Parents & Teachers',
    postDate: 'Mar 6, 2035',
    expDate: 'Mar 12, 2035',
    createdBy: "Principal's Office",
    status: 'Active',
    views: 328,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    content: 'We invite all parents to the upcoming Parent-Teacher Meeting to discuss student progress and curriculum updates for the spring semester.',
    attachment: { name: 'PTM_Invitation_Spring.pdf', size: '1.2 MB' }
  },
  {
    id: 'NB-1003',
    category: 'Maintenance',
    title: 'Science Lab Maintenance Notice',
    audience: 'Students & Teachers (Science Dept.)',
    postDate: 'Mar 3, 2035',
    expDate: 'Mar 10, 2035',
    createdBy: 'Science Department',
    status: 'Scheduled',
    views: 124,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    content: 'The main science laboratory will be closed for routine maintenance and safety equipment upgrades from March 10th to March 12th.',
    attachment: null
  },
  {
    id: 'NB-1004',
    category: 'Arts',
    title: 'School Choir Rehearsal Postponed',
    audience: 'Choir Members',
    postDate: 'Mar 8, 2035',
    expDate: 'Mar 25, 2035',
    createdBy: 'Music Department',
    status: 'Draft',
    views: 89,
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80',
    content: 'The practice session scheduled for this Friday has been moved to next Monday due to a scheduling conflict in the main auditorium.',
    attachment: null
  },
  {
    id: 'NB-1005',
    category: 'Finance',
    title: 'Fee Payment Reminder (Class 9)',
    audience: 'Class 9 Students & Parents',
    postDate: 'Mar 4, 2035',
    expDate: 'Mar 8, 2035',
    createdBy: 'Finance Office',
    status: 'Active',
    views: 412,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    content: 'This is a gentle reminder regarding the upcoming deadline for the second-quarter tuition fees. Please ensure payments are cleared before March 15th.',
    attachment: { name: 'Fee_Structure_Q2.pdf', size: '0.8 MB' }
  },
  {
    id: 'NB-1006',
    category: 'Notice',
    title: 'National Holiday - School Closed',
    audience: 'Entire School',
    postDate: 'Mar 25, 2035',
    expDate: 'Apr 8, 2035',
    createdBy: 'Admin Office',
    status: 'Scheduled',
    views: 670,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    content: 'School will be closed on April 5th in observance of the National Holiday. Classes will resume as normal on April 6th.',
    attachment: null
  },
  {
    id: 'NB-1007',
    category: 'Training',
    title: 'Teacher Development Workshop',
    audience: 'Teachers',
    postDate: 'Feb 20, 2035',
    expDate: 'Mar 8, 2035',
    createdBy: 'HR Department',
    status: 'Expired',
    views: 156,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    content: 'A mandatory workshop on interactive teaching methodologies will be held this Saturday for all faculty members.',
    attachment: { name: 'Workshop_Agenda.pdf', size: '1.5 MB' }
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-50 text-green-600 border-green-100',
    Scheduled: 'bg-blue-50 text-blue-600 border-blue-100',
    Draft: 'bg-gray-50 text-gray-500 border-gray-100',
    Expired: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
};

const CategoryTag = ({ category }) => {
  const tags = {
    Academic: 'bg-purple-50 text-purple-600',
    Events: 'bg-pink-50 text-pink-600',
    Maintenance: 'bg-orange-50 text-orange-600',
    Arts: 'bg-indigo-50 text-indigo-600',
    Finance: 'bg-blue-50 text-blue-600',
    Notice: 'bg-teal-50 text-teal-600',
    Training: 'bg-amber-50 text-amber-600',
    Announcement: 'bg-rose-50 text-rose-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight ${tags[category] || 'bg-gray-50 text-gray-600'}`}>
      {category}
    </span>
  );
};

const NoticeBoard = () => {
  const [selectedNotice, setSelectedNotice] = useState(noticesData[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-20">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-primary-gray tracking-tight">Notice Board</h1>
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
          <span>Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-primary-pink">Notice Board</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[24px] shadow-sm border border-gray-100">
        <h2 className="text-lg font-extrabold text-primary-gray ml-2">Notice Board</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-xl border border-sky-100 cursor-pointer hover:bg-sky-100 transition-colors">
            <span className="text-[11px] font-extrabold text-primary-blue tracking-wide">All Categories</span>
            <ChevronDown size={14} className="text-primary-blue" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sort by:</span>
            <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-xl border border-sky-100 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[11px] font-extrabold text-primary-blue tracking-wide uppercase">Latest</span>
              <ChevronDown size={14} className="text-primary-blue" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Notice List Column */}
        <div className={`lg:col-span-${isSidebarOpen ? '8' : '12'} flex flex-col gap-4 min-w-0`}>
          {noticesData.map((notice) => (
            <div 
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`
                flex items-center justify-between bg-white p-5 rounded-[28px] border cursor-pointer transition-all duration-300 group overflow-hidden min-w-0
                ${selectedNotice.id === notice.id 
                  ? 'border-primary-pink shadow-md bg-pink-50/10' 
                  : 'border-gray-100 hover:border-primary-pink/30 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center gap-5 flex-1">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                  <img src={notice.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <CategoryTag category={notice.category} />
                  </div>
                  <h3 className="text-[15px] font-extrabold text-primary-gray group-hover:text-primary-pink transition-colors truncate">
                    {notice.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
                    <div className="flex items-center gap-1.5 leading-none">
                      <Users size={12} className="opacity-70" />
                      <span>{notice.audience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-5 ml-auto shrink-0 min-w-0">
                <div className="flex flex-col gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 tracking-tight uppercase">
                    <Calendar size={10} className="opacity-40" />
                    <span className="text-primary-gray font-extrabold whitespace-nowrap">{notice.postDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 tracking-tight uppercase">
                    <Clock size={10} className="opacity-40" />
                    <span className="text-primary-gray font-extrabold whitespace-nowrap">{notice.expDate}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 items-start w-24 shrink-0 overflow-hidden hidden xl:flex border-l border-gray-100 pl-4">
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Author</span>
                  <span className="text-[10px] font-black text-primary-gray truncate w-full">{notice.createdBy}</span>
                </div>

                <div className="w-20 flex justify-end shrink-0">
                  <StatusBadge status={notice.status} />
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Footer */}
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Show</span>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-100 cursor-pointer shadow-xs">
                <span className="text-[11px] font-black text-primary-gray">9</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">of 25 results</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-primary-pink transition-colors bg-white rounded-xl border border-gray-100 shadow-xs"><ChevronLeft size={18} /></button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-pink-50 text-primary-pink font-black text-sm shadow-sm border border-primary-pink/20">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-400 font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-100 shadow-xs">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-400 font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-100 shadow-xs">3</button>
              <button className="p-2 text-gray-400 hover:text-primary-pink transition-colors bg-white rounded-xl border border-gray-100 shadow-xs"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        {/* Detail Board Sidebar */}
        {isSidebarOpen && selectedNotice && (
          <div className="lg:col-span-4 bg-white rounded-[40px] shadow-xl shadow-gray-200/40 border border-gray-50 p-6 flex flex-col gap-6 sticky top-24 animate-in slide-in-from-right-10 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-primary-gray tracking-tight">Detail Board</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full aspect-video rounded-[32px] overflow-hidden shadow-inner bg-gray-50">
              <img src={selectedNotice.image} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-3">
              <CategoryTag category={selectedNotice.category} />
              <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100 shadow-xs">
                <Eye size={12} className="opacity-70" />
                <span className="text-[10px] font-bold">{selectedNotice.views}</span>
              </div>
              <div className="ml-auto">
                <StatusBadge status={selectedNotice.status} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] font-black text-primary-gray leading-tight">
                {selectedNotice.title}
              </h3>
              <p className="text-[12px] font-bold text-gray-400 italic">by {selectedNotice.createdBy}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 py-2 border-y border-gray-50">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Audience</span>
                <span className="text-[12px] font-black text-primary-gray">{selectedNotice.audience}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Post Date</span>
                <span className="text-[12px] font-black text-primary-gray">{selectedNotice.postDate} - 08:00 AM</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Exp. Date</span>
                <span className="text-[12px] font-black text-primary-gray">{selectedNotice.expDate} - 03:00 PM</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-[12px] font-black text-primary-gray uppercase tracking-widest">Content</h4>
              <p className="text-[12px] font-medium text-gray-500 leading-relaxed bg-gray-50/50 p-4 rounded-2xl border border-gray-100 italic shadow-xs">
                {selectedNotice.content}
              </p>
            </div>

            {selectedNotice.attachment && (
              <div className="flex flex-col gap-3">
                <h4 className="text-[12px] font-black text-primary-gray uppercase tracking-widest">Attachment</h4>
                <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-3xl shadow-xs group hover:border-primary-pink/30 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center text-primary-pink shadow-inner">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-primary-gray">{selectedNotice.attachment.name}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">PDF • {selectedNotice.attachment.size}</span>
                    </div>
                  </div>
                  <button className="p-2 text-primary-pink hover:bg-pink-50 rounded-xl transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full bg-primary-pink text-white font-black py-4 rounded-3xl shadow-lg shadow-primary-pink/20 hover:scale-[1.02] active:scale-[0.98] transition-all tracking-wide text-sm flex items-center justify-center gap-2">
                <Edit3 size={18} /> Edit Notice
              </button>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-sky-50 text-primary-blue rounded-3xl border border-sky-100 hover:bg-sky-100 transition-colors shadow-xs group">
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Delete</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-sky-50 text-primary-blue rounded-3xl border border-sky-100 hover:bg-sky-100 transition-colors shadow-xs group">
                  <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-sky-50 text-primary-blue rounded-3xl border border-sky-100 hover:bg-sky-100 transition-colors shadow-xs group">
                  <Archive size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Archive</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Social Box (Optional based on image) */}
      <footer className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex flex-col gap-2">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Copyright © 2025 Peterdraw</p>
           <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
             <a href="#" className="hover:text-primary-pink">Privacy Policy</a>
             <a href="#" className="hover:text-primary-pink">Term and conditions</a>
             <a href="#" className="hover:text-primary-pink">Contact</a>
           </div>
        </div>
        <div className="flex items-center gap-4">
          {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
            <div key={i} className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-pink hover:bg-pink-50 hover:border-pink-100 cursor-pointer shadow-xs transition-all">
              <Icon size={16} />
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default NoticeBoard;
