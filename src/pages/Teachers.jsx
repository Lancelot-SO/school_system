import React, { useState, useEffect } from 'react';
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

// Constants removed for dynamic calculation

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
  const [teacherData, setTeacherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('https://lumi-api.artfricastudio.com/api/profiles/teachers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          setTeacherData(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch teachers", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teacherData.filter(t => 
    (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.profile?.subject_specialty && t.profile.subject_specialty.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedSubject === 'All' || (t.profile?.subject_specialty && t.profile.subject_specialty.includes(selectedSubject)))
  );

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
    if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedTeachers.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }

  const currentTeachers = sortedTeachers.slice((validCurrentPage - 1) * itemsPerPage, validCurrentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- Dynamic Data Generation ---

  const dynamicStats = [
    { label: 'Total Teachers', count: teacherData.length, icon: Users, bgColor: 'bg-white', iconColor: 'text-white', iconBg: 'bg-[#1a365d]' },
    { label: 'Full-Time Teacher', count: 0, icon: Clock, bgColor: 'bg-white', iconColor: 'text-[#d81b60]', iconBg: 'bg-[#fae8ff]' },
    { label: 'Part-Time Teacher', count: 0, icon: Clock, bgColor: 'bg-white', iconColor: 'text-[#0ea5e9]', iconBg: 'bg-[#e0faff]' },
    { label: 'Substitute Teacher', count: 0, icon: RefreshCw, bgColor: 'bg-white', iconColor: 'text-[#6366f1]', iconBg: 'bg-[#eef2ff]' },
  ];

  const departmentCounts = {};
  teacherData.forEach(t => {
    if (t.profile?.subject_specialty) {
      const subjects = t.profile.subject_specialty.split(',').map(s => s.trim());
      subjects.forEach(s => {
        if (!departmentCounts[s]) departmentCounts[s] = 0;
        departmentCounts[s]++;
      });
    }
  });

  const departmentColors = ['#1a365d', '#3b82f6', '#fbcfe8', '#bae6fd', '#0ea5e9', '#d81b60', '#6366f1', '#10b981'];
  const totalSubjects = Object.values(departmentCounts).reduce((a, b) => a + b, 0);
  
  const dynamicDepartmentData = Object.entries(departmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value], idx) => ({
      name,
      value,
      color: departmentColors[idx % departmentColors.length],
      percentage: totalSubjects > 0 ? `${Math.round((value / totalSubjects) * 100)}%` : '0%'
    }));

  const dynamicWorkloadData = teacherData.slice(0, 8).map(t => ({
    name: t.name,
    classes: 0,
    hours: 0,
    extra: 0
  }));

  const dynamicAttendanceData = [
    { name: 'Mon', value: 0, barValue: 0 },
    { name: 'Tue', value: 0, barValue: 0, highlight: true },
    { name: 'Wed', value: 0, barValue: 0 },
    { name: 'Thu', value: 0, barValue: 0 },
    { name: 'Fri', value: 0, barValue: 0 },
  ];

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in duration-500 overflow-x-hidden pb-12">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicStats.map((stat, i) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto">
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
              <ComposedChart data={dynamicAttendanceData}>
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
                  {dynamicAttendanceData.map((entry, index) => (
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
              <BarChart data={dynamicWorkloadData}>
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
              <div className="w-2.5 h-2.5 rounded-full bg-promo-btn"></div>
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
              <PieChart style={{ outline: 'none' }}>
                <Pie
                  data={dynamicDepartmentData.length > 0 ? dynamicDepartmentData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={dynamicDepartmentData.length > 0 ? 4 : 0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  style={{ outline: 'none' }}
                >
                  {(dynamicDepartmentData.length > 0 ? dynamicDepartmentData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                      style={{ outline: 'none', cursor: dynamicDepartmentData.length > 0 ? 'pointer' : 'default' }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length && dynamicDepartmentData.length > 0) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl shadow-gray-200/60 flex flex-col gap-0.5">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                            <span className="text-[12px] font-extrabold text-primary-blue">{d.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-500">{d.value} teachers · {d.percentage}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Total</span>
              <span className="text-xl font-extrabold text-primary-blue leading-tight">{teacherData.length}</span>
            </div>
          </div>
          <div className="w-full space-y-1 mt-3 px-1">
            {dynamicDepartmentData.length > 0 ? dynamicDepartmentData.map((dept, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50/70 rounded-xl px-2 py-1 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: dept.color }}></div>
                  <span className="text-[11px] font-bold text-gray-500 group-hover:text-primary-blue transition-colors truncate">{dept.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-extrabold text-primary-blue/70">{dept.value}</span>
                  <span className="text-[10px] font-extrabold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-lg">{dept.percentage}</span>
                </div>
              </div>
            )) : (
              <p className="text-center text-[11px] text-gray-400 font-bold py-2">No department data yet.</p>
            )}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search teacher..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-[20px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue/5 transition-all text-primary-blue"
              />
            </div>
            
            <div className="relative">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none flex items-center gap-2 bg-gray-50 pl-10 pr-10 py-3 rounded-[20px] border border-gray-100 text-sm font-bold text-primary-blue hover:bg-gray-100 transition-all focus:outline-none cursor-pointer"
              >
                <option value="All">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Information Technology">Information Tech</option>
                <option value="Economics">Economics</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Social Studies">Social Studies</option>
              </select>
              <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-[20px] border border-gray-100 text-sm font-bold text-primary-blue">
              <span className="text-gray-400">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-5 text-sky-500 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Latest">Latest</option>
                  <option value="Name (A-Z)">Name (A-Z)</option>
                  <option value="Name (Z-A)">Name (Z-A)</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" />
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
          {isLoading ? (
            <div className="col-span-full py-12 flex items-center justify-center">
              <RefreshCw size={24} className="text-primary-pink animate-spin" />
              <span className="ml-3 text-sm font-bold text-gray-500">Loading teachers...</span>
            </div>
          ) : currentTeachers.length > 0 ? (
            currentTeachers.map((teacher, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group relative flex flex-col justify-between h-full">
                <div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-50 rounded-lg text-gray-400">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4 shrink-0">
                      <div className="w-20 h-20 rounded-full border-4 border-gray-50 p-1 group-hover:border-primary-pink/10 transition-colors">
                        <img src={teacher.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>
                    <h4 className="text-[17px] font-extrabold text-primary-blue leading-tight mb-1">{teacher.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{teacher.id.substring(0, 8)}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span>
                      <span className="text-[11px] font-bold text-sky-500 truncate max-w-[120px]">{teacher.profile?.subject_specialty ? teacher.profile.subject_specialty.split(',')[0] : 'General'}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full line-clamp-1 h-6 shrink-0">{teacher.profile?.subject_specialty || 'General Sub'}</span>
                  </div>

                  <div className="space-y-3 mb-6 p-4 bg-gray-50/50 rounded-2xl w-full">
                    <div className="flex items-center gap-3 text-gray-500 overflow-hidden">
                      <Phone size={14} className="text-sky-500 opacity-60 shrink-0" />
                      <span className="text-[11px] font-bold tracking-tight truncate">{teacher.profile?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 overflow-hidden">
                      <Mail size={14} className="text-gray-400 opacity-60 shrink-0" />
                      <span className="text-[11px] font-bold tracking-tight truncate block" title={teacher.email}>{teacher.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 shrink-0">
                  <div className="flex items-center gap-3">
                    <a href={teacher.profile?.socials?.linkedin || '#'} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-sky-600 transition-colors">
                      <Linkedin size={16} />
                    </a>
                    <a href={teacher.profile?.socials?.twitter || '#'} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">X</a>
                    <a href={teacher.profile?.socials?.facebook || '#'} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                      <Instagram size={16} />
                    </a>
                  </div>
                  <button className="flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-xl text-xs font-extrabold hover:bg-sky-100 transition-all border border-sky-100/50 shrink-0">
                    <MessageCircle size={14} />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 text-sm font-bold">
              No teachers found.
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400">Show</span>
              <div className="relative">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none flex items-center gap-2 bg-gray-50 pl-4 pr-8 py-1.5 rounded-xl border border-gray-100 text-sm font-extrabold text-primary-blue cursor-pointer focus:outline-none"
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-blue pointer-events-none" />
              </div>
              <span className="text-sm font-bold text-gray-400">of {sortedTeachers.length} results</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LayoutGrid size={18} className="rotate-90 scale-x-[-1]" />
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <button 
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-extrabold text-sm transition-colors ${
                  currentPage === idx + 1 
                    ? 'bg-primary-pink text-white shadow-lg shadow-primary-pink/20' 
                    : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
