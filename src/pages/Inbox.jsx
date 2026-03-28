import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Star, 
  Send, 
  FileText, 
  AlertCircle, 
  Trash2, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Archive,
  Reply,
  Undo2,
  Redo2,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  Paperclip,
  Smile,
  ImageIcon,
  Maximize2,
  X
} from 'lucide-react';

const categories = [
  { icon: Archive, label: 'All Inbox', count: 25, active: true },
  { icon: Star, label: 'Starred', count: 5 },
  { icon: Send, label: 'Sent', count: 50 },
  { icon: FileText, label: 'Drafts', count: 1 },
  { icon: AlertCircle, label: 'Spam' },
  { icon: Trash2, label: 'Trash', count: 10 },
];

const labels = [
  { color: 'bg-pink-300', label: 'Academic', count: 3 },
  { color: 'bg-blue-900', label: 'Events', count: 2 },
  { color: 'bg-cyan-200', label: 'Finance', count: 1 },
  { color: 'bg-gray-400', label: 'Administration', count: 2 },
];

const messages = [
  {
    id: 1,
    sender: 'Jaden Lowe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'Attendance Report for 7A',
    snippet: 'Please find attached the attendance summary for class 7A for this week.',
    time: '01:45 PM',
    unread: true,
    label: 'bg-pink-300'
  },
  {
    id: 2,
    sender: 'Finance Office',
    initials: 'FO',
    subject: 'Reminder: Fee Payment Deadline',
    snippet: 'Kindly ensure all pending Class 9 fee payments are completed by March 15.',
    time: '11:00 AM',
    active: true,
    label: 'bg-cyan-200'
  },
  {
    id: 3,
    sender: 'Suzanne Lim',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'Science Fair Volunteer Request',
    snippet: 'We are looking for staff to help coordinate the upcoming Science Fair on March 20.',
    time: '08:30 AM',
    label: 'bg-blue-900'
  },
  {
    id: 4,
    sender: "Principal's Office",
    initials: 'PO',
    subject: 'Teacher Development Workshop',
    snippet: 'A professional development workshop for all teachers has been scheduled for next...',
    time: 'Yesterday',
    label: 'bg-blue-900'
  },
  {
    id: 5,
    sender: 'Librarian',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'New Books Arrival Notification',
    snippet: 'The library has received 120 new books, including updated references for science...',
    time: 'Yesterday',
    label: 'bg-gray-400'
  },
];

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(messages[1]);
  const [mobileView, setMobileView] = useState('list'); // 'sidebar', 'list', 'content'

  // Sync mobile view when message is selected
  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    if (window.innerWidth < 1024) {
      setMobileView('content');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 py-3 h-[calc(100vh-100px)] animate-in fade-in duration-500 overflow-hidden min-w-0">
      
      {/* Category & Label Sidebar (Mobile: Drawer-like or full-toggle) */}
      <div className={`
        ${mobileView === 'sidebar' ? 'flex' : 'hidden lg:flex'}
        w-full lg:w-40 flex-col gap-5 shrink-0 min-w-0 h-full
      `}>
        <div className="flex items-center justify-between lg:hidden mb-2">
          <h2 className="text-sm font-bold text-primary-blue">Mailbox</h2>
          <button 
            onClick={() => setMobileView('list')}
            className="p-2 text-primary-pink hover:bg-pink-50 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 lg:overflow-visible">
          <div>
            <h3 className="text-[10.5px] font-extrabold text-primary-blue mb-2.5 flex items-center justify-between uppercase tracking-wider opacity-60">
              Category
            </h3>
            <div className="space-y-0.5">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setMobileView('list')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-[12px] transition-all duration-300 ${
                    cat.active ? 'bg-sidebar-active text-primary-blue shadow-sm' : 'text-sidebar-text hover:bg-white/60 hover:text-primary-blue'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <cat.icon size={13} strokeWidth={cat.active ? 2.5 : 2} className={cat.active ? 'text-primary-blue' : 'opacity-60'} />
                    <span className={`text-[10.5px] font-bold ${cat.active ? 'opacity-100' : 'opacity-80'}`}>{cat.label}</span>
                  </div>
                  {cat.count && (
                    <span className={`text-[8.5px] font-extrabold ${cat.active ? 'text-primary-blue' : 'text-gray-400 opacity-60'}`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-[10.5px] font-extrabold text-primary-blue mb-2.5 flex items-center justify-between uppercase tracking-wider opacity-60">
              Label
              <Plus size={11} className="text-gray-400 cursor-pointer hover:text-primary-pink transition-colors" />
            </h3>
            <div className="space-y-0.5">
              {labels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setMobileView('list')}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-[12px] text-sidebar-text hover:bg-white/60 hover:text-primary-blue transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded shadow-sm ${label.color}`}></div>
                    <span className="text-[10.5px] font-bold opacity-80 group-hover:opacity-100 line-clamp-1">{label.label}</span>
                  </div>
                  {label.count && <span className="text-[8.5px] font-extrabold text-gray-400 opacity-60">{label.count}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className={`
        ${mobileView === 'list' ? 'flex' : 'hidden lg:flex'}
        flex-1 lg:flex-none lg:w-[320px] flex-col gap-3.5 shrink-0 bg-white/40 backdrop-blur-sm rounded-[28px] p-3.5 border border-white/60 shadow-sm relative overflow-hidden min-w-0 h-full
      `}>
        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <button 
            onClick={() => setMobileView('sidebar')}
            className="lg:hidden p-2 text-gray-400 hover:text-primary-blue bg-white/60 rounded-lg mr-1 transition-all"
          >
            <AlignLeft size={18} />
          </button>
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-pink transition-colors" size={13} />
            <input 
              type="text" 
              placeholder="Search email" 
              className="w-full pl-8 pr-4 py-2 bg-white/80 border border-transparent rounded-[14px] focus:outline-none focus:ring-2 focus:ring-primary-pink/10 focus:border-primary-pink/20 shadow-sm text-[10.5px] font-bold text-primary-blue placeholder:text-gray-300 transition-all font-sans"
            />
          </div>
          <button className="p-2 bg-primary-pink text-white rounded-[12px] shadow-lg shadow-primary-pink/20 hover:scale-105 active:scale-95 transition-all">
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-0.5 space-y-2 custom-scrollbar min-w-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleSelectMessage(msg)}
              className={`p-3.5 rounded-[20px] cursor-pointer transition-all duration-300 border relative ${
                selectedMessage?.id === msg.id 
                  ? 'bg-sidebar-active border-primary-pink/5 shadow-md scale-[1.01] z-10' 
                  : 'bg-white/80 border-transparent hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  {msg.avatar ? (
                    <img src={msg.avatar} className="w-9 h-9 rounded-[12px] object-cover shadow-sm" alt="" />
                  ) : (
                    <div className="w-9 h-9 rounded-[12px] bg-purple-100 flex items-center justify-center text-purple-600 font-extrabold text-[11px] shadow-sm border border-purple-50">
                      {msg.initials}
                    </div>
                  )}
                  {msg.unread && (
                    <div className="absolute -top-1 -right-0.5 w-2.5 h-2.5 bg-primary-pink rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 max-w-[70%]">
                      <h4 className="text-[11px] font-extrabold text-primary-blue truncate leading-none">
                        {msg.sender}
                      </h4>
                      <div className={`w-1.5 h-1 rounded-full shrink-0 ${msg.label} shadow-sm opacity-80`}></div>
                    </div>
                    <span className="text-[8px] font-extrabold text-gray-400 whitespace-nowrap">{msg.time}</span>
                  </div>
                  <p className={`text-[10px] font-extrabold truncate mb-0.5 leading-tight ${msg.unread ? 'text-primary-blue' : 'text-gray-700 opacity-90'}`}>
                    {msg.subject}
                  </p>
                  <p className="text-[9.5px] font-bold text-gray-400 line-clamp-2 leading-relaxed opacity-70">
                    {msg.snippet}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className={`
        ${mobileView === 'content' ? 'flex' : 'hidden lg:flex'}
        flex-1 bg-white rounded-[32px] shadow-lg shadow-primary-blue/5 border border-white flex flex-col overflow-hidden relative min-w-0 h-full
      `}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-pink/5 blur-[70px] pointer-events-none rounded-full"></div>
        
        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setMobileView('list')}
              className="p-1.5 text-primary-pink hover:bg-pink-50 rounded-lg lg:hidden transition-all mr-1"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all hidden lg:block">
              <ChevronLeft size={16} />
            </button>
            <div className="h-4 w-px bg-gray-100 mx-0.5 hidden lg:block"></div>
            <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all">
              <Archive size={16} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-gray-50/80 px-2.5 py-1 rounded-lg border border-gray-100 shadow-sm">
              <button className="p-0.5 text-gray-400 hover:text-primary-blue transition-colors">
                <ChevronLeft size={13} strokeWidth={2.5} />
              </button>
              <span className="text-[9px] font-extrabold text-primary-blue/60 tracking-tight">5 from 36</span>
              <button className="p-0.5 text-gray-400 hover:text-primary-blue transition-colors">
                <ChevronRight size={13} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all">
                <Reply size={16} className="scale-x-[-1]" />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Message Header */}
        <div className="px-7 py-5 flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[14px] bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center text-purple-600 font-extrabold text-base shadow-sm border border-white">
              {selectedMessage?.initials || selectedMessage?.sender.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-[14px] font-extrabold text-primary-blue tracking-tight truncate">{selectedMessage?.sender}</h3>
                <div className={`w-1.5 h-1 rounded-full ${selectedMessage?.label} shadow-sm shrink-0`}></div>
              </div>
              <p className="text-[9.5px] font-bold text-gray-400 tracking-wide uppercase truncate opacity-70">{selectedMessage?.sender.toLowerCase().replace(' ', '')}@studixschool.org</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-extrabold text-primary-blue/40 mb-0.5 tracking-tight">March 7, 2035</p>
            <p className="text-[10px] font-extrabold text-primary-blue/40 tracking-tight uppercase">11:00 AM</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-7 py-2 custom-scrollbar relative z-10 min-w-0">
          <h2 className="text-[16px] font-extrabold text-primary-blue mb-4 tracking-tight leading-tight">{selectedMessage?.subject}</h2>
          <div className="space-y-3.5 text-[12.5px] font-bold text-gray-600 leading-relaxed max-w-xl">
            <p>Dear Admin,</p>
            <p>
              This is a gentle reminder that all pending Class 9 student fee payments must be completed by March 
              15, 2035. Kindly check the finance section of the dashboard to verify payments and follow up with 
              students or parents if required.
            </p>
            <p>Thank you for your cooperation.</p>
            <div className="pt-2">
              <p className="font-extrabold text-primary-blue text-[13.5px]">-- {selectedMessage?.sender}</p>
            </div>
          </div>

          {/* Reply Section */}
          <div className="mt-8 bg-gray-50/50 rounded-[28px] p-5 border border-gray-100 mb-6 shadow-inner transition-all min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-lg px-3.5 py-2 flex items-center gap-2.5 shadow-sm min-w-[200px]">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider shrink-0">To:</span>
                <div className="flex items-center gap-2 bg-gray-100/50 px-2 py-0.5 rounded-md border border-gray-200/50 min-w-0">
                  <span className="text-[10px] font-extrabold text-primary-blue opacity-90 truncate">{selectedMessage?.sender.toLowerCase().replace(' ', '')}@studixschool.org</span>
                  <X size={11} className="text-gray-400 cursor-pointer hover:text-primary-pink transition-colors shrink-0" />
                </div>
              </div>
              <div className="flex items-center gap-3.5 px-1 shrink-0">
                <span className="text-[10px] font-extrabold text-gray-400 cursor-pointer hover:text-primary-pink transition-colors">Cc</span>
                <span className="text-[10px] font-extrabold text-gray-400 cursor-pointer hover:text-primary-pink transition-colors">Bcc</span>
                <Maximize2 size={13} className="text-gray-400 cursor-pointer hover:text-primary-blue transition-colors" />
              </div>
            </div>

            <textarea 
              placeholder="Type something.."
              className="w-full h-28 bg-transparent resize-none border-none focus:ring-0 text-[12.5px] font-bold text-gray-700 placeholder:text-gray-300 mb-5 leading-relaxed min-w-0"
            ></textarea>

            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-[14px] shadow-lg shadow-gray-200/40 border border-gray-50 flex-wrap min-w-0">
                <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all"><Undo2 size={15} /></button>
                <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all border-r border-gray-100 px-2"><Redo2 size={15} /></button>
                
                <div className="flex items-center gap-1.5 px-2 border-r border-gray-100 py-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-all">
                  <span className="text-[10px] font-extrabold text-gray-600 flex items-center gap-1">Sans Serif <ChevronLeft size={8} className="-rotate-90 text-gray-400" /></span>
                </div>

                <div className="flex items-center gap-1 px-1.5">
                  <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all"><Bold size={15} /></button>
                  <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all border-r border-gray-100 px-2"><Italic size={15} /></button>
                </div>
                
                <div className="flex items-center gap-0.5 px-0.5">
                  <button className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-all"><List size={15} /></button>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 px-1">
                  <button className="p-2 text-gray-400 hover:text-primary-pink hover:bg-pink-50 rounded-lg transition-all"><Paperclip size={16} /></button>
                  <button className="p-2 text-gray-400 hover:text-primary-pink hover:bg-pink-50 rounded-lg transition-all"><ImageIcon size={16} /></button>
                </div>
                <button className="flex items-center gap-2 bg-primary-pink text-white px-5 py-2.5 rounded-[14px] text-[12px] font-extrabold hover:brightness-95 transition-all shadow-sm">
                  <Send size={15} strokeWidth={2.5} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
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
      `}} />
    </div>
  );
};

export default Inbox;
