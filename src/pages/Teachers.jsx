import React from 'react';
import { 
  Users, 
  Clock, 
  RefreshCw, 
  Search, 
  Filter, 
  ChevronDown, 
  Plus, 
  LayoutGrid, 
  MoreHorizontal,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  MessageCircle,
  MoreVertical
} from 'lucide-react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const stats = [
  { label: 'Total Teachers', count: 86, icon: Users, bgColor: 'bg-white', iconColor: 'text-white', iconBg: 'bg-[#1a365d]' },
  { label: 'Full-Time Teacher', count: 62, icon: Clock, bgColor: 'bg-white', iconColor: 'text-[#d81b60]', iconBg: 'bg-[#fae8ff]' },
  { label: 'Part-Time Teacher', count: 18, icon: Clock, bgColor: 'bg-white', iconColor: 'text-[#0ea5e9]', iconBg: 'bg-[#e0faff]' },
  { label: 'Substitute Teacher', count: 6, icon: RefreshCw, bgColor: 'bg-white', iconColor: 'text-[#6366f1]', iconBg: 'bg-[#eef2ff]' },
];

const attendanceData = [
  { name: 'Mon', value: 45, barValue: 55 },
  { name: 'Tue', value: 62, barValue: 50, highlight: true },
  { name: 'Wed', value: 50, barValue: 55 },
  { name: 'Thu', value: 75, barValue: 60 },
  { name: 'Fri', value: 68, barValue: 55 },
];

const workloadData = [
  { name: 'Rayan Yasmine', classes: 30, hours: 25, extra: 5 },
  { name: 'Aliyah Summer', classes: 28, hours: 22, extra: 8 },
  { name: 'Kelsy Trisha', classes: 32, hours: 26, extra: 4 },
  { name: 'Zackary Smith', classes: 25, hours: 20, extra: 10 },
  { name: 'Javier Quintero', classes: 35, hours: 28, extra: 7 },
  { name: 'Giana Gomez', classes: 30, hours: 24, extra: 6 },
  { name: 'Miley Addams', classes: 220, hours: 18, extra: 12 }, // Adjusted for visual variety
  { name: 'Kaily Jayson', classes: 28, hours: 23, extra: 5 },
];

const departmentData = [
  { name: 'Science', value: 19, color: '#1a365d', percentage: '22%' },
  { name: 'Mathematics', value: 17, color: '#3b82f6', percentage: '20%' },
  { name: 'Language', value: 15, color: '#fbcfe8', percentage: '18%' },
  { name: 'Social', value: 13, color: '#bae6fd', percentage: '15%' },
  { name: 'Arts', value: 11, color: '#eef2ff', percentage: '13%' },
  { name: 'Physical Education', value: 11, color: '#f3f4f9', percentage: '12%' },
];

const teachers = [
  { id: 'T-1001', name: 'Argen Maulie', subject: 'Mathematics', phone: '+62 812 3456 7890', email: 'argen.maulie@studixschool.org', image: 'https://i.pravatar.cc/150?u=1' },
  { id: 'T-1002', name: 'Bella Cruz', subject: 'Social Studies - Civics', phone: '+62 813 2234 5567', email: 'bella.cruz@studixschool.org', image: 'https://i.pravatar.cc/150?u=2' },
  { id: 'T-1003', name: 'Cliff Villiam', subject: 'English Language', phone: '+62 811 5567 2345', email: 'cliff.villiam@studixschool.org', image: 'https://i.pravatar.cc/150?u=3' },
  { id: 'T-1004', name: 'Dariah Ahmed', subject: 'Social Studies - History', phone: '+62 815 9876 5432', email: 'dariah.ahmed@studixschool.org', image: 'https://i.pravatar.cc/150?u=4' },
  { id: 'T-1005', name: 'Esteban Parez', subject: 'Arts - Visual Arts', phone: '+62 819 6543 2109', email: 'esteban.parez@studixschool.org', image: 'https://i.pravatar.cc/150?u=5' },
  { id: 'T-1006', name: 'Francesca Gill', subject: 'Physical Education', phone: '+62 817 2233 4455', email: 'francesca.gill@studixschool.org', image: 'https://i.pravatar.cc/150?u=6' },
  { id: 'T-1007', name: 'George Abraham', subject: 'Mathematics - Algebra', phone: '+62 816 7788 9900', email: 'george.abraham@studixschool.org', image: 'https://i.pravatar.cc/150?u=7' },
  { id: 'T-1008', name: 'Hellen Martinez', subject: 'Science - Biology', phone: '+62 814 6677 8899', email: 'hellen.martinez@studixschool.org', image: 'https://i.pravatar.cc/150?u=8' },
];

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!payload || payload.name !== 'Tue') {
    return cx ? <circle cx={cx} cy={cy} r={4} fill="#1a365d" stroke="#fff" strokeWidth={2} /> : null;
  }
  return (
    <g>
      <rect x={cx - 15} y={cy - 35} width="30" height="20" rx="6" fill="#1a365d" />
      <text x={cx} y={cy - 21} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">62</text>
      <circle cx={cx} cy={cy} r={6} fill="#fae8ff" stroke="#fae8ff" strokeWidth={4} opacity={0.6} />
      <circle cx={cx} cy={cy} r={4} fill="#1a365d" stroke="#fff" strokeWidth={2} />
    </g>
  );
};

const Teachers = () => {
  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-4 rounded-[24px] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 ${stat.bgColor}`}>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-gray-500 tracking-tight">{stat.label}</span>
              <span className="text-[24px] font-extrabold text-primary-blue">{stat.count}</span>
            </div>
            <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-sm`}>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[400px]">
        {/* Attendance Overview */}
        <div className="lg:col-span-3 bg-white rounded-[40px] p-6 shadow-lg shadow-gray-200/40 border border-white flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">Attendance Overview</h3>
            <div className="flex items-center gap-1 bg-sky-100/50 px-3 py-1.5 rounded-xl border border-sky-100/50 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[11px] font-bold text-sky-600">Weekly</span>
              <ChevronDown size={14} className="text-sky-400" />
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={attendanceData}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={15}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={false}
                  content={() => null} 
                />
                <Bar 
                  dataKey="barValue" 
                  radius={[12, 12, 0, 0]} 
                  barSize={32}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlight ? '#fae8ff' : '#fae8ff60'} />
                  ))}
                </Bar>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1a365d" 
                  strokeWidth={3} 
                  dot={<CustomDot />}
                  activeDot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workload Distribution */}
        <div className="lg:col-span-6 bg-white rounded-[40px] p-6 shadow-lg shadow-gray-200/40 border border-white flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">Workload Distribution</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 cursor-pointer hover:bg-sky-100 transition-colors">
                <span className="text-[11px] font-bold text-sky-600">Science</span>
                <ChevronDown size={14} className="text-sky-400" />
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-[11px] font-bold text-primary-blue">Weekly</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                  interval={0}
                  tickFormatter={(val) => val.split(' ')[0]}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="classes" stackId="a" fill="var(--color-promo-btn)" radius={[0, 0, 0, 0]} barSize={24} />
                <Bar dataKey="hours" stackId="a" fill="#bae6fd" radius={[0, 0, 0, 0]} barSize={24} />
                <Bar dataKey="extra" stackId="a" fill="#1a365d" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#fbcfe8]"></div>
              <span className="text-[10px] font-bold text-gray-500">Total Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#bae6fd]"></div>
              <span className="text-[10px] font-bold text-gray-500">Teaching Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-blue"></div>
              <span className="text-[10px] font-bold text-gray-500">Extra Duties</span>
            </div>
          </div>
        </div>

        {/* Department */}
        <div className="lg:col-span-3 bg-white rounded-[40px] p-6 shadow-lg shadow-gray-200/40 border border-white flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">Department</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg text-gray-400">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="relative w-full h-[180px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={180}
                  endAngle={-180}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Teachers</span>
              <span className="text-2xl font-extrabold text-primary-blue">86</span>
            </div>
          </div>
          <div className="w-full space-y-2 mt-4 px-2">
            {departmentData.map((dept, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }}></div>
                  <span className="text-[11px] font-bold text-gray-500 group-hover:text-primary-blue transition-colors">{dept.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-extrabold text-primary-blue/60">{dept.value}</span>
                  <span className="text-[11px] font-extrabold text-primary-blue w-8 text-right">{dept.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teachers Section */}
      <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-2xl font-extrabold text-primary-blue tracking-tight">Teachers</h2>
          
          <div className="flex flex-wrap items-center gap-4 flex-1 justify-end">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search teacher..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-[20px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue/5 transition-all"
              />
            </div>
            
            <button className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-[20px] border border-gray-100 text-sm font-bold text-primary-blue hover:bg-gray-100 transition-all">
              <Filter size={18} className="text-sky-500" />
              <span>Filter</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-[20px] border border-gray-100 text-sm font-bold text-primary-blue">
              <span className="text-gray-400">Sort by:</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-sky-500">Latest</span>
                <ChevronDown size={14} className="text-sky-500" />
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-primary-pink text-white px-6 py-3 rounded-[20px] text-sm font-extrabold hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-primary-pink/20">
              <Plus size={18} strokeWidth={3} />
              <span>Add Teacher</span>
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-gray-50 rounded-lg text-gray-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-gray-50 p-1 group-hover:border-primary-pink/10 transition-colors">
                    <img src={teacher.image} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                <h4 className="text-[17px] font-extrabold text-primary-blue leading-tight mb-1">{teacher.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{teacher.id}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-[11px] font-bold text-sky-500">{teacher.subject.split(' - ')[0]}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full">{teacher.subject}</span>
              </div>

              <div className="space-y-3 mb-6 p-4 bg-gray-50/50 rounded-2xl">
                <div className="flex items-center gap-3 text-gray-500">
                  <Phone size={14} className="text-sky-500 opacity-60" />
                  <span className="text-[11px] font-bold tracking-tight">{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Mail size={14} className="text-gray-400 opacity-60" />
                  <span className="text-[11px] font-bold tracking-tight truncate">{teacher.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-sky-600 transition-colors">
                    <Linkedin size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">X</button>
                  <button className="text-gray-400 hover:text-pink-600 transition-colors">
                    <Instagram size={16} />
                  </button>
                </div>
                <button className="flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-xl text-xs font-extrabold hover:bg-sky-100 transition-all border border-sky-100/50">
                  <MessageCircle size={14} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Area */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400">Show</span>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 cursor-pointer">
                <span className="text-sm font-extrabold text-primary-blue">8</span>
                <ChevronDown size={14} className="text-primary-blue" />
              </div>
              <span className="text-sm font-bold text-gray-400">of 82 results</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
              <LayoutGrid size={18} className="rotate-90 scale-x-[-1]" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-pink text-white font-extrabold text-sm shadow-lg shadow-primary-pink/20">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-extrabold text-sm hover:bg-sky-100 transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-extrabold text-sm hover:bg-sky-100 transition-colors">3</button>
            <span className="px-2 text-gray-300 font-extrabold">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-extrabold text-sm hover:bg-sky-100 transition-colors">11</button>
            <button className="p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-colors">
              <LayoutGrid size={18} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Page Footer */}
      <div className="flex flex-wrap items-center justify-between gap-6 px-4 mt-4 opacity-60">
        <p className="text-sm font-bold text-gray-500">Copyright © 2025 Peterdraw</p>
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Term and conditions', 'Contact'].map(link => (
            <a key={link} href="#" className="text-sm font-bold text-gray-500 hover:text-primary-blue transition-colors">{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><Users size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><Users size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary-blue hover:text-white transition-all"><Users size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
