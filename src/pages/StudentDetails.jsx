import React from 'react';
import { 
  ChevronLeft, 
  Search, 
  Settings, 
  Bell, 
  MoreHorizontal, 
  Camera,
  FileText,
  Download,
  Award,
  Shield,
  Heart,
  Calendar as CalendarIcon,
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
  MoreVertical
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const colors = {
  present: '#e0faff',
  late: '#f5f3ff',
  sick: '#1a365d',
  absent: '#bae6fd',
  pink: '#d81b60',
  blue: '#1a365d'
};

const performanceData = [
  { month: 'Jan', score: 90 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 92 },
  { month: 'May', score: 95 },
  { month: 'Jun', score: 96 },
];

const behaviorLogs = [
  { date: 'Jan 10, 2035', type: 'Positive Note', details: 'Helped classmates during group project', reporter: 'Ms. Lee Record', status: 'Record Recognition' },
  { date: 'Feb 02, 2035', type: 'Positive Note', details: 'Volunteered in school event organization', reporter: 'Admin Office', status: 'Recognition Recorded' },
  { date: 'Feb 18, 2035', type: 'Minor Issue', details: 'Late submission of homework', reporter: 'Mr. Maulie', status: 'Issue Warning' },
  { date: 'Mar 05, 2035', type: 'Minor Issue', details: 'Absent without prior notice', reporter: 'Homeroom Teacher', status: 'Parent Notified' },
];

const StudentDetails = () => {
  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-20">
      {/* Breadcrumbs & Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-blue tracking-tight">Student Details</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-sky-500">Students</span>
              <span>/</span>
              <span>Student Details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column - Profile & Info */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Main Profile Card */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-gray-50 shadow-sm">
                <img src="https://i.pravatar.cc/300?u=isabella" alt="Isabella Rossi" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary-pink text-white rounded-xl shadow-lg shadow-primary-pink/20 hover:scale-105 active:scale-95 transition-all">
                <Camera size={16} strokeWidth={3} />
              </button>
            </div>
            
            <h2 className="text-xl font-extrabold text-primary-blue mb-2">Isabella Rossi</h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-extrabold text-gray-400 tracking-wider">S-2106</span>
              <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-extrabold text-gray-400 tracking-wider">Class 8C</span>
              <span className="px-3 py-1 bg-green-500 rounded-full text-[10px] font-extrabold text-white tracking-wider">Active</span>
            </div>

            <div className="w-full space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={12} className="text-sky-500" /> Gender</span>
                <span className="text-[13px] font-extrabold text-primary-blue">Female</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={12} className="text-sky-500" /> Date of Birth</span>
                <span className="text-[13px] font-extrabold text-primary-blue">May 18, 2022</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={12} className="text-sky-500" /> Phone Number</span>
                <span className="text-[13px] font-extrabold text-primary-blue">+62 812 9988 7766</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={12} className="text-sky-500" /> Address</span>
                <span className="text-[13px] font-extrabold text-primary-blue leading-relaxed">14 Via Milano, Rome, Italy</span>
              </div>
            </div>
          </div>

          {/* Parents Info */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">Parent/Guardian Info</h3>
              <button className="text-gray-400 hover:text-primary-blue transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Father</span>
                  <span className="text-[11px] font-extrabold text-primary-blue">Marco Rossi</span>
                </div>
                <div className="text-[11px] font-bold text-gray-400 text-right">+39 331 222 5566</div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Mother</span>
                  <span className="text-[11px] font-extrabold text-primary-blue">Elena Rossi</span>
                </div>
                <div className="text-[11px] font-bold text-gray-400 text-right">+39 331 444 7788</div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Alternative Guardian</span>
                  <span className="text-[11px] font-extrabold text-primary-blue">Lucia Bianchi <span className="text-gray-400 text-[9px]">(Aunt)</span></span>
                </div>
                <div className="text-[11px] font-bold text-gray-400 text-right">+39 331 555 6677</div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">Documents</h3>
              <button className="text-gray-400 hover:text-primary-blue transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'ReportCard_IsabellaRossi_Grad...', size: '2.4 MB' },
                { name: 'Certificate_ScienceFair_Winner...', size: '1.8 MB' },
                { name: 'IDCard_Student_S2106_Isabell...', size: '1.9 MB' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-gray-50 rounded-2xl transition-all">
                  <div className="w-10 h-10 bg-primary-pink/10 rounded-xl flex items-center justify-center text-primary-pink">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-extrabold text-primary-blue truncate">{doc.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">PDF • {doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Calendar, Scholarships, Health */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Calendar Card */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">March 2035</h3>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronLeft size={16} /></button>
                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 inline-block -rotate-180"><ChevronLeft size={16} /></button>
              </div>
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-2 text-center mb-6">
              {['S','M','T','W','T','F','S'].map(d => (
                <span key={d} className="text-[11px] font-bold text-gray-400 mb-2">{d}</span>
              ))}
              {Array.from({length: 31}).map((_, i) => {
                const day = i + 1;
                let bgColor = '';
                let textColor = 'text-gray-600';
                
                if (day === 1 || day === 4 || day === 5 || day === 9 || day === 12 || day === 15 || day === 16 || day === 19 || day === 20) bgColor = 'bg-promo-bg';
                if (day === 2) bgColor = 'bg-primary-blue text-white';
                if (day === 14) bgColor = 'bg-primary-blue text-white';
                if (day === 11 || day === 13 || day === 18 || day === 21 || day === 23 || day === 24) bgColor = 'bg-indigo-50'; // Using indigo-50 for late
                if (day === 22) bgColor = 'bg-[#d81b60] text-white';

                return (
                  <div key={day} className={`aspect-square flex items-center justify-center rounded-xl text-[12px] font-extrabold cursor-pointer transition-all hover:scale-105 ${bgColor} ${textColor}`}>
                    {day}
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="grid grid-cols-4 gap-2 border-t border-gray-50 pt-6">
              <div className="bg-promo-bg p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Present</p>
                <p className="text-xl font-extrabold text-primary-blue">14</p>
              </div>
              <div className="bg-[#f5f3ff] p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Late</p>
                <p className="text-xl font-extrabold text-primary-pink">3</p>
              </div>
              <div className="bg-[#1a365d] p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Sick</p>
                <p className="text-xl font-extrabold text-white">2</p>
              </div>
              <div className="bg-[#bae6fd] p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Absent</p>
                <p className="text-xl font-extrabold text-primary-blue">1</p>
              </div>
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">Scholarships</h3>
              <button className="text-gray-400 hover:text-primary-blue transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-3xl group cursor-pointer hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-pink">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-primary-blue">Global Young Achievers Award</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Finance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-3xl group cursor-pointer hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-pink">
                  <Award size={24} className="rotate-12" />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-primary-blue">STEM for Girls Initiative</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Enrichment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health & Medical */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">Health & Medical Info</h3>
              <button className="text-gray-400 hover:text-primary-blue transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50/50 rounded-3xl border border-transparent hover:border-sky-100 transition-all">
                <span className="px-3 py-1 bg-sky-100/50 rounded-lg text-[10px] font-extrabold text-sky-600 uppercase tracking-widest mb-3 inline-block">Medical Record</span>
                <p className="text-[12px] font-bold text-gray-500 leading-relaxed">Routine health check completed Feb 2035 - Fit for activities</p>
              </div>
              <div className="p-4 bg-gray-50/50 rounded-3xl border border-transparent hover:border-sky-100 transition-all">
                <span className="px-3 py-1 bg-sky-100/50 rounded-lg text-[10px] font-extrabold text-sky-600 uppercase tracking-widest mb-3 inline-block">Allergy</span>
                <p className="text-[12px] font-bold text-gray-500 leading-relaxed">Mild pollen allergy - medication prescribed.</p>
              </div>
              <div className="p-4 bg-gray-50/50 rounded-3xl border border-transparent hover:border-sky-100 transition-all">
                <span className="px-3 py-1 bg-sky-100/50 rounded-lg text-[10px] font-extrabold text-sky-600 uppercase tracking-widest mb-3 inline-block">Peanut Allergy</span>
                <p className="text-[12px] font-bold text-gray-500 leading-relaxed">Severe reaction - strictly avoid exposure; EpiPen required.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Performance & Activity */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Academic Performance */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-extrabold text-primary-blue">Academic Performance</h3>
              <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-[11px] font-bold text-primary-blue">Last 6 Months</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-around gap-12 mb-8">
              {/* Gauge Chart Placeholder - Custom Pie */}
              <div className="relative w-48 h-[140px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Score', value: 3.9 },
                        { name: 'Total', value: 0.1 }
                      ]}
                      cx="50%"
                      cy="100%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={180}
                      endAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#1a365d" />
                      <Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center w-full">
                  <span className="text-2xl font-extrabold text-primary-blue tracking-tighter">3.9</span>
                  <span className="text-xs font-bold text-gray-400">/4.0</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Average Score</p>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="w-full h-[200px] mt-8 md:mt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar 
                      dataKey="score" 
                      fill="#fae8ff" 
                      radius={[6, 6, 0, 0]} 
                      barSize={16}
                      label={{ position: 'top', fill: '#d81b60', fontSize: 10, fontWeight: 800, dy: -10 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-[12px] font-bold text-gray-400 bg-gray-50 p-4 rounded-3xl leading-relaxed text-center">
              Isabella shows consistent excellence in her studies and leadership in group projects. Keep aiming high!
            </p>
          </div>

          {/* Extracurricular */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">Extracurricular</h3>
              <button className="text-gray-400 hover:text-primary-blue transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50/50">
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Club</th>
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Achievements</th>
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Advisor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {[
                    { club: 'Swimming', role: 'Team Member', achieve: 'Won 2 Silver Medals (City Meet)', dur: '2029 - Present', advisor: 'Coach Andrea V.' },
                    { club: 'Dance', role: 'Lead Performer', achieve: 'Performed at National Festival', dur: '2030 - Present', advisor: 'Ms. Clara F.' },
                    { club: 'Robotics', role: 'Programmer', achieve: '1st Place in School Robotics Fair', dur: '2033 - Present', advisor: 'Mr. Daniel K.' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
                            <Heart size={14} />
                          </div>
                          <div>
                            <p className="text-[12px] font-extrabold text-primary-blue">{row.club}</p>
                            <p className="text-[10px] font-bold text-gray-400">{row.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-[11px] font-bold text-gray-500">{row.achieve}</td>
                      <td className="py-4 pr-4 text-[11px] font-bold text-gray-500">{row.dur}</td>
                      <td className="py-4 text-[11px] font-bold text-gray-500">{row.advisor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Behavior & Discipline Log */}
          <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-primary-blue">Behavior & Discipline Log</h3>
              <button className="text-gray-400 hover:text-primary-blue transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50/50">
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Type & Details</th>
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Reported By</th>
                    <th className="pb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status/Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {behaviorLogs.map((log, i) => (
                    <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                      <td className="py-4 pr-4 text-[11px] font-bold text-gray-500 whitespace-nowrap">{log.date}</td>
                      <td className="py-4 pr-4">
                        <p className={`text-[12px] font-extrabold ${log.type.includes('Positive') ? 'text-sky-500' : 'text-primary-pink'}`}>{log.type}</p>
                        <p className="text-[11px] font-bold text-gray-400 line-clamp-1">{log.details}</p>
                      </td>
                      <td className="py-4 pr-4 text-[11px] font-bold text-gray-500">{log.reporter}</td>
                      <td className="py-4">
                        <div className="flex items-center justify-between gap-4">
                          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all border
                            ${log.status.includes('Recognition') 
                              ? 'bg-sky-50 text-sky-600 border-sky-100 hover:bg-sky-100' 
                              : 'bg-primary-pink/5 text-primary-pink border-primary-pink/10 hover:bg-primary-pink/10'}`}>
                            {log.status}
                            <ChevronDown size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-wrap items-center justify-between gap-6 px-4 mt-8 pt-8 border-t border-gray-100 opacity-60">
        <p className="text-sm font-bold text-gray-500">Copyright © 2025 Peterdraw</p>
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Term and conditions', 'Contact'].map(link => (
            <a key={link} href="#" className="text-sm font-bold text-gray-500 hover:text-primary-blue transition-colors">{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><MoreVertical size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><MoreVertical size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
