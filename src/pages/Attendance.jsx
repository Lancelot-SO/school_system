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
    <div className="flex flex-col gap-8 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-10">
      {/* Page Title & Breadcrumbs - Hidden on Mobile */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-primary-blue tracking-tight">Attendance</h1>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-sky-500">Attendance</span>
          </div>
        </div>
      </div>

      {/* 1. Summary Cards Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-primary-blue tracking-tight">Attendance Summary</h2>
          <div className="flex items-center gap-2 bg-sky-100/50 px-3 py-1.5 rounded-xl border border-sky-100/50 cursor-pointer hover:bg-sky-100 transition-colors">
            <span className="text-[11px] font-extrabold text-sky-600">Today</span>
            <ChevronDown size={14} className="text-sky-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Students Card */}
          <div className="flex bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden h-[160px] w-full">
            <div className="w-[130px] md:w-[40%] bg-pink-50/50 p-4 md:p-5 flex flex-col justify-between border-r border-gray-100 relative overflow-hidden shrink-0">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary-pink/5 rounded-full -mr-12 -mt-12 blur-xl"></div>
               <span className="text-[10px] md:text-[11px] font-bold text-primary-pink uppercase tracking-widest relative z-10">Students</span>
               <div className="relative z-10">
                 <h3 className="text-2xl md:text-3xl font-extrabold text-primary-blue leading-none mb-1 md:mb-2">1,180</h3>
                 <div className="inline-flex items-center gap-1 text-green-600 text-[9px] md:text-[10px] font-extrabold bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">
                   <TrendingUp size={10} strokeWidth={3} />
                   94.8%
                 </div>
               </div>
            </div>
            <div className="flex-1 p-3 md:p-5 flex flex-col justify-center gap-2.5 min-w-0 overflow-hidden">
              {[
                { label: 'On-Time', value: '1,090', pct: '87.5%' },
                { label: 'Late', value: '90', pct: '7.2%' },
                { label: 'Absent', value: '65', pct: '5.2%' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <span className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tight truncate">{item.label}</span>
                  <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <span className="text-[11px] md:text-[13px] font-extrabold text-primary-blue">{item.value}</span>
                    <span className="text-[8px] md:text-[10px] font-bold text-gray-300">{item.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teachers Card */}
          <div className="flex bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden h-[160px] w-full">
            <div className="w-[130px] md:w-[40%] bg-sky-50/50 p-4 md:p-5 flex flex-col justify-between border-r border-gray-100 relative overflow-hidden shrink-0">
               <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full -mr-12 -mt-12 blur-xl"></div>
               <span className="text-[10px] md:text-[11px] font-bold text-sky-600 uppercase tracking-widest relative z-10">Teachers</span>
               <div className="relative z-10">
                 <h3 className="text-2xl md:text-3xl font-extrabold text-primary-blue leading-none mb-1 md:mb-2">80</h3>
                 <div className="inline-flex items-center gap-1 text-green-600 text-[9px] md:text-[10px] font-extrabold bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">
                   <TrendingUp size={10} strokeWidth={3} />
                   93.0%
                 </div>
               </div>
            </div>
            <div className="flex-1 p-3 md:p-5 flex flex-col justify-center gap-2.5 min-w-0 overflow-hidden">
              {[
                { label: 'On-Time', value: '75', pct: '87.2%' },
                { label: 'Late', value: '5', pct: '5.8%' },
                { label: 'Absent', value: '6', pct: '7.0%' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <span className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tight truncate">{item.label}</span>
                  <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <span className="text-[11px] md:text-[13px] font-extrabold text-primary-blue">{item.value}</span>
                    <span className="text-[8px] md:text-[10px] font-bold text-gray-300">{item.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Card */}
          <div className="flex bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden h-[160px] w-full lg:col-span-1">
            <div className="w-[130px] md:w-[40%] bg-primary-blue p-4 md:p-5 flex flex-col justify-between border-r border-white/5 relative overflow-hidden shrink-0">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl"></div>
               <span className="text-[10px] md:text-[11px] font-bold text-white/60 uppercase tracking-widest relative z-10">Staff</span>
               <div className="relative z-10">
                 <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-none mb-1 md:mb-2">32</h3>
                 <div className="inline-flex items-center gap-1 text-green-400 text-[9px] md:text-[10px] font-extrabold bg-white/10 px-1.5 py-0.5 rounded-full border border-white/10">
                   <TrendingUp size={10} strokeWidth={3} />
                   91.4%
                 </div>
               </div>
            </div>
            <div className="flex-1 p-3 md:p-5 flex flex-col justify-center gap-2.5 min-w-0 overflow-hidden">
              {[
                { label: 'On-Time', value: '29', pct: '82.9%' },
                { label: 'Late', value: '3', pct: '8.5%' },
                { label: 'Absent', value: '2', pct: '5.7%' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <span className="text-[9px] md:text-[11px] font-bold text-gray-200/60 uppercase tracking-tight truncate">{item.label}</span>
                  <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <span className="text-[11px] md:text-[13px] font-extrabold text-white">{item.value}</span>
                    <span className="text-[8px] md:text-[10px] font-bold text-white/40">{item.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Attendance Overview Chart Section */}
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-primary-blue tracking-tight">Attendance Overview</h2>
          <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 cursor-pointer hover:bg-sky-100 transition-colors">
            <span className="text-[11px] font-bold text-sky-600">Last Semester</span>
            <ChevronDown size={14} className="text-sky-400" />
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary-pink opacity-40"></div>
            <span className="text-[11px] font-bold text-gray-400">Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-sky-500"></div>
            <span className="text-[11px] font-bold text-gray-400">Teachers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary-blue"></div>
            <span className="text-[11px] font-bold text-gray-400">Staff</span>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[300px]">
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
              <Line type="monotone" dataKey="teachers" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="staff" stroke="#1a365d" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Attendance Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col w-full min-w-0">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-extrabold text-primary-blue tracking-tight">Attendance</h2>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2.5 bg-sky-50 rounded-xl text-sky-600 hover:bg-sky-100 transition-all">
               <Filter size={18} />
             </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto w-full min-w-0">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100/30">
                <th className="sticky left-0 bg-white z-10 px-4 py-4 text-[11px] font-bold text-gray-400 border-b border-gray-100 md:min-w-[180px] shadow-[rgba(0,0,0,0.02)_4px_0px_6px]">
                  <div className="flex items-center gap-2">
                    Student
                    <div className="flex flex-col gap-0.5 opacity-40">
                      <ChevronDown size={8} className="rotate-180" />
                      <ChevronDown size={8} />
                    </div>
                  </div>
                </th>
                {['Thu Mar 1', 'Fri Mar 2', 'Sat Mar 3', 'Sun Mar 4', 'Mon Mar 5', 'Tue Mar 6', 'Wed Mar 7', 'Thu Mar 8', 'Fri Mar 9', 'Sat Mar 10', 'Sun Mar 11'].map(day => (
                  <th key={day} className="px-3 py-4 text-[10px] font-bold text-gray-400 border-b border-gray-100 text-center whitespace-nowrap min-w-[80px]">
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
                      <span className="text-[13px] font-extrabold text-primary-blue">{student.name}</span>
                      <span className="text-[11px] font-bold text-gray-400 mt-0.5">{student.id}</span>
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

        <div className="p-6 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tight">Show 10 of 10 results</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100/50 text-sky-300 cursor-not-allowed">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-pink text-white text-[13px] font-extrabold shadow-lg shadow-primary-pink/20">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 text-[13px] font-extrabold hover:bg-sky-100 transition-all border border-sky-100">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 text-[13px] font-extrabold hover:bg-sky-100 transition-all border border-sky-100">3</button>
            <span className="text-gray-300 px-2 font-bold">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 text-[13px] font-extrabold hover:bg-sky-100 transition-all border border-sky-100">16</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-all border border-sky-100">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Interface */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-gray-100 px-4 opacity-70">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Copyright © 2025 Peterdraw</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-blue transition-colors">Privacy Policy</a>
          <a href="#" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-blue transition-colors">Terms and conditions</a>
          <a href="#" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-blue transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-5">
          <Facebook size={18} className="text-gray-400 hover:text-primary-blue cursor-pointer transition-colors" />
          <Twitter size={18} className="text-gray-400 hover:text-primary-blue cursor-pointer transition-colors" />
          <Instagram size={18} className="text-gray-400 hover:text-primary-blue cursor-pointer transition-colors" />
          <Youtube size={18} className="text-gray-400 hover:text-primary-blue cursor-pointer transition-colors" />
          <Linkedin size={18} className="text-gray-400 hover:text-primary-blue cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
