import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Settings, 
  Bell, 
  ChevronDown,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Calendar as CalendarIcon,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Users
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const attendanceData = [
  { month: 'Jan', students: 78, teachers: 70, staff: 45 },
  { month: 'Feb', students: 82, teachers: 72, staff: 48 },
  { month: 'Mar', students: 75, teachers: 68, staff: 52 },
  { month: 'Apr', students: 88, teachers: 75, staff: 46 },
  { month: 'May', students: 85, teachers: 70, staff: 50 },
  { month: 'Jun', students: 92, teachers: 80, staff: 55 },
];

const studentAttendance = [
  { id: 'S-2102', name: 'Emma Williams', status: ['P', 'P', '-', '-', 'P', 'P', 'P', 'P', 'A', '-', '-'] },
  { id: 'S-2105', name: 'Thomas Green', status: ['P', 'P', '-', '-', 'P', 'P', 'P', 'A', 'P', '-', '-'] },
  { id: 'S-2005', name: 'Sophie Martin', status: ['P', 'P', '-', '-', 'P', 'P', 'A', 'P', 'P', '-', '-'] },
  { id: 'S-2109', name: 'Lucas Müller', status: ['P', 'P', '-', '-', 'A', 'P', 'P', 'P', 'P', '-', '-'] },
  { id: 'S-2104', name: 'Hannah Lee', status: ['P', 'P', '-', '-', 'P', 'P', 'P', 'P', 'A', '-', '-'] },
  { id: 'S-2002', name: 'Daniel Park', status: ['P', 'P', '-', '-', 'P', 'A', 'P', 'P', 'P', '-', '-'] },
  { id: 'S-2111', name: 'Aisha Khan', status: ['P', 'P', '-', '-', 'P', 'P', 'P', 'A', 'P', '-', '-'] },
  { id: 'S-2112', name: 'Matteo Ricci', status: ['P', 'P', '-', '-', 'P', 'P', 'A', 'P', 'P', '-', '-'] },
  { id: 'S-2113', name: 'Grace Johnson', status: ['P', 'P', '-', '-', 'A', 'P', 'P', 'P', 'P', '-', '-'] },
  { id: 'S-2114', name: 'Omar Hassan', status: ['P', 'P', '-', '-', 'P', 'P', 'P', 'P', 'A', '-', '-'] },
];

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('Students');

  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-10">
      {/* Page Title & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 -ml-2 hover:bg-white/50 rounded-xl transition-colors md:hidden">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-primary-blue tracking-tight">Attendance</h1>
            <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-sky-500">Attendance</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Summary Cards */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-extrabold text-primary-blue tracking-tight">Attendance Summary</h2>
            <div className="flex items-center gap-2 bg-sky-100/50 px-3 md:px-4 py-2 rounded-xl border border-sky-100/50 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[10px] md:text-[11px] font-extrabold text-sky-600">Today</span>
              <ChevronDown size={14} className="text-sky-400" />
            </div>
          </div>
          
          {/* Mobile Swipe Wrapper */}
          <div className="flex overflow-x-auto xl:grid xl:grid-cols-3 gap-6 pb-4 xl:pb-0 snap-x snap-mandatory custom-scrollbar-hide">
            {/* Students Card - Soft Pink Background */}
            <div className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] xl:min-w-0 snap-center bg-sidebar-active/60 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-lg shadow-sidebar-active/20 border border-white flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[11px] md:text-[13px] font-bold text-primary-pink uppercase tracking-widest mb-1">Students</span>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-primary-blue">1,180</h3>
                    <div className="flex items-center gap-0.5 text-green-600 text-[10px] font-extrabold bg-white/80 px-1.5 py-0.5 rounded-full shadow-sm">
                      <TrendingUp size={10} md:size={12} strokeWidth={3} />
                      94.8%
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white shadow-sm text-primary-pink">
                  <Users size={18} md:size={22} />
                </div>
              </div>
              <p className="text-[10px] md:text-[11px] font-bold text-gray-500 mb-4 md:mb-6 relative z-10 font-primary">Total Present Today</p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/40 pt-4 md:pt-6 relative z-10">
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-primary-blue">1,090</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">On-Time</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-primary-blue">90</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">Late</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-primary-blue">65</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">Absent</p>
                </div>
              </div>
            </div>

            {/* Teachers Card - Soft Sky Background */}
            <div className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] xl:min-w-0 snap-center bg-promo-bg/80 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-lg shadow-promo-bg/40 border border-white flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[11px] md:text-[13px] font-bold text-sky-600 uppercase tracking-widest mb-1">Teachers</span>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-primary-blue">80</h3>
                    <div className="flex items-center gap-0.5 text-green-600 text-[10px] font-extrabold bg-white/80 px-1.5 py-0.5 rounded-full shadow-sm">
                      <TrendingUp size={10} md:size={12} strokeWidth={3} />
                      93.0%
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white shadow-sm text-sky-500">
                  <Users size={18} md:size={22} />
                </div>
              </div>
              <p className="text-[10px] md:text-[11px] font-bold text-gray-500 mb-4 md:mb-6 relative z-10 font-primary">Total Present Today</p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/40 pt-4 md:pt-6 relative z-10">
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-primary-blue">75</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">On-Time</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-primary-blue">5</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">Late</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-primary-blue">6</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">Absent</p>
                </div>
              </div>
            </div>

            {/* Staff Card - Deep Blue Background */}
            <div className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] xl:min-w-0 snap-center bg-primary-blue rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-lg shadow-primary-blue/20 border border-white/10 flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[11px] md:text-[13px] font-bold text-white/60 uppercase tracking-widest mb-1">Staff</span>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">32</h3>
                    <div className="flex items-center gap-0.5 text-green-400 text-[10px] font-extrabold bg-white/10 px-1.5 py-0.5 rounded-full">
                      <TrendingUp size={10} md:size={12} strokeWidth={3} />
                      91.4%
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white/10 shadow-sm text-white border border-white/10">
                  <Users size={18} md:size={22} />
                </div>
              </div>
              <p className="text-[10px] md:text-[11px] font-bold text-white/40 mb-4 md:mb-6 relative z-10 font-primary">Total Present Today</p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 md:pt-6 relative z-10">
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-white">29</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mt-1">On-Time</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-white">3</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mt-1">Late</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] md:text-[15px] font-extrabold text-white">2</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mt-1">Absent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Trend Chart Card */}
        <div className="lg:col-span-4 bg-white rounded-[40px] p-6 md:p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col h-full self-stretch">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base md:text-lg font-extrabold text-primary-blue tracking-tight">Attendance Trend</h3>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-[10px] md:text-[11px] font-bold text-primary-blue">Last Semester</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[250px] md:min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="students" stroke="#d81b60" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="teachers" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="staff" stroke="#1a365d" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 pb-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-pink"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Students</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-blue"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Staff</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Logs & Monthly Overview Table */}
      <div className="bg-white rounded-[40px] p-6 md:p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-extrabold text-primary-blue tracking-tight">Attendance</h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Daily Logs and Monthly Overview</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100">
              {['Students', 'Teachers', 'Staff'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-[12px] font-extrabold transition-all
                    ${activeTab === tab ? 'bg-primary-pink text-white shadow-lg shadow-primary-pink/20' : 'text-gray-400 hover:text-primary-blue hover:bg-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-xl border border-sky-100 text-[12px] font-extrabold text-sky-600 cursor-pointer hover:bg-sky-100 transition-all">
                <span>Class 9A</span>
                <ChevronDown size={14} />
              </div>
              <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-xl border border-sky-100 text-[12px] font-extrabold text-sky-600 cursor-pointer hover:bg-sky-100 transition-all">
                <span>Mar 2035</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar-hide md:custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="sticky left-0 bg-white z-10 px-4 py-3 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 min-w-[150px] md:min-w-[180px] shadow-[rgba(0,0,0,0.02)_4px_0px_6px]">
                  <div className="flex items-center gap-2">
                    Student
                    <ChevronDown size={12} />
                  </div>
                </th>
                {['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7', 'Mar 8', 'Mar 9', 'Mar 10', 'Mar 11'].map(day => (
                  <th key={day} className="px-3 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-center whitespace-nowrap min-w-[70px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {studentAttendance.map((student, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="sticky left-0 bg-white z-10 px-4 py-4 group-hover:bg-gray-50/30 transition-all border-b border-gray-50/50 shadow-[rgba(0,0,0,0.02)_4px_0px_8px]">
                    <div className="flex flex-col">
                      <span className="text-[12px] md:text-[13px] font-extrabold text-primary-blue">{student.name}</span>
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-400 mt-0.5">{student.id}</span>
                    </div>
                  </td>
                  {student.status.map((st, idx) => (
                    <td key={idx} className="px-3 py-4 border-b border-gray-50/50 text-center">
                      {st === 'P' ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm border border-green-200/50">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      ) : st === 'A' ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm border border-red-200/50">
                            <XCircle size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-200 font-bold text-[11px]">——</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-gray-400">Show</span>
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-200 pl-4 pr-10 py-2 rounded-xl text-[13px] font-extrabold text-primary-blue focus:outline-none cursor-pointer">
                <option>10</option>
                <option>20</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-[13px] font-bold text-gray-400">of 25 results</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all opacity-50 cursor-not-allowed">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-pink text-white text-[13px] font-extrabold shadow-lg shadow-primary-pink/20">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 text-[13px] font-extrabold hover:bg-sky-100 transition-all border border-sky-100/50">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 text-[13px] font-extrabold hover:bg-sky-100 transition-all border border-sky-100/50">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-all border border-sky-100/50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Generic Footer - Matching other pages */}
      <div className="flex flex-wrap items-center justify-between gap-6 px-4 md:px-8 mt-12 opacity-60 pb-8">
        <p className="text-xs md:sm font-bold text-gray-500">Copyright © 2025 Peterdraw</p>
        <div className="flex items-center gap-4 md:gap-6">
          {['Privacy Policy', 'Term and conditions', 'Contact'].map(link => (
            <a key={link} href="#" className="text-[10px] md:text-sm font-bold text-gray-500 hover:text-primary-blue transition-colors">{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><Facebook size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><Twitter size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><Instagram size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
