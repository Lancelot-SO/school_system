import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  RefreshCw, 
  Search, 
  Filter, 
  ChevronDown, 
  Plus, 
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  MessageCircle,
  MoreVertical,
  X,
  Briefcase,
  Building2,
  GraduationCap,
  Calendar as CalendarIcon,
  ExternalLink
} from 'lucide-react';
import {
  ComposedChart,
  LineChart,
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

const API_BASE = 'https://lumi-api.artfricastudio.com/api';

const Teachers = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const getSparklineData = (teacher) => {
    // Rely on new advanced graphs pipeline if available
    if (teacher.attendance_graphs?.sparkline_7_days) {
      return teacher.attendance_graphs.sparkline_7_days.map((day) => {
        let val = 0;
        if (day.status === 'present') {
          val = 90;
          if (day.clock_in) {
             const hour = parseInt(day.clock_in.split(':')[0], 10);
             if (hour >= 8) val = 60; // Show sharp dip for being late (after 08:00)
             else val = 95 - (parseInt(day.clock_in.split(':')[1] || '0', 10) % 15); // Organic organic jitter
          }
        } else if (day.status === 'weekend') {
          val = 50; // Neutral floating baseline for weekends
        }
        return { name: day.date, value: val };
      });
    }

    // Fallback to legacy tracking array
    if (!teacher.attendance_stats?.recent_7_days_trend) {
      return Array.from({ length: 7 }).map((_, i) => ({ name: `Day ${i + 1}`, value: 0 }));
    }
    return teacher.attendance_stats.recent_7_days_trend.map((isPresent, i) => ({
      name: `Day ${i + 1}`,
      value: isPresent ? 100 : 0
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        };

        const [profilesRes, graphsRes, teachersRes] = await Promise.all([
          fetch(`${API_BASE}/profiles/teachers`, options),
          fetch(`${API_BASE}/attendance/teachers/graphs`, options).catch(() => null),
          fetch(`${API_BASE}/teachers`, options).catch(() => null)
        ]);

        let combinedData = [];

        if (profilesRes.ok) {
          const profilesData = await profilesRes.json();
          combinedData = profilesData.data || [];

          if (graphsRes && graphsRes.ok) {
            const graphsData = await graphsRes.json();
            if (graphsData.success && graphsData.data) {
              const graphMap = new Map();
              graphsData.data.forEach(item => {
                graphMap.set(item.teacher_id, item.graphs);
              });
              
              combinedData = combinedData.map(teacher => ({
                ...teacher,
                attendance_graphs: graphMap.get(teacher.id) || null
              }));
            }
          }
        }

        // Merge teachers from the new /api/teachers endpoint
        if (teachersRes && teachersRes.ok) {
          const teachersData = await teachersRes.json();
          const newTeachers = teachersData.data || teachersData || [];
          const existingIds = new Set(combinedData.map(t => t.id));
          
          const additionalTeachers = (Array.isArray(newTeachers) ? newTeachers : []).filter(t => !existingIds.has(t.id)).map(t => ({
            id: t.id,
            name: t.full_name || t.name || 'Unknown',
            email: t.email || '',
            profile_picture: t.profile_photo ? `${API_BASE.replace('/api', '')}/storage/${t.profile_photo}` : null,
            profile: {
              subject_specialty: t.department || t.specialization || '',
              employment_status: t.status === 'active' ? 'full-time' : t.status,
              phone: t.phone || ''
            },
            teacher_id: t.teacher_id,
            employee_id: t.employee_id,
            _raw: t
          }));
          
          combinedData = [...combinedData, ...additionalTeachers];
        }
          
        setTeacherData(combinedData);
      } catch (err) {
        console.error("Failed to fetch teachers profiles or attendance graphs", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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

  const fullTimeCount = teacherData.filter(t => t.profile?.employment_status === 'full-time').length;
  const partTimeCount = teacherData.filter(t => t.profile?.employment_status === 'part-time').length;
  const substituteCount = teacherData.filter(t => t.profile?.employment_status === 'substitute').length;

  const dynamicStats = [
    { label: 'Total Teachers', count: teacherData.length, icon: Users, bgColor: 'bg-white', iconColor: 'text-white', iconBg: 'bg-[#1a365d]' },
    { label: 'Full-Time Teacher', count: fullTimeCount, icon: Clock, bgColor: 'bg-white', iconColor: 'text-[#d81b60]', iconBg: 'bg-[#fae8ff]' },
    { label: 'Part-Time Teacher', count: partTimeCount, icon: Clock, bgColor: 'bg-white', iconColor: 'text-[#0ea5e9]', iconBg: 'bg-[#e0faff]' },
    { label: 'Substitute Teacher', count: substituteCount, icon: RefreshCw, bgColor: 'bg-white', iconColor: 'text-[#6366f1]', iconBg: 'bg-[#eef2ff]' },
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

  let dayStats = { 'Mon': { p: 0, t: 0 }, 'Tue': { p: 0, t: 0 }, 'Wed': { p: 0, t: 0 }, 'Thu': { p: 0, t: 0 }, 'Fri': { p: 0, t: 0 } };
  teacherData.forEach(t => {
    if (t.attendance_graphs?.sparkline_7_days) {
      t.attendance_graphs.sparkline_7_days.forEach(day => {
        const d = new Date(day.date);
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
        if (dayStats[dayLabel] !== undefined) {
          dayStats[dayLabel].t++;
          if (day.status === 'present') {
            dayStats[dayLabel].p++;
          }
        }
      });
    }
  });

  const dynamicAttendanceData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
    const stat = dayStats[day];
    const percentage = stat.t > 0 ? Math.round((stat.p / stat.t) * 100) : 0;
    return { name: day, value: percentage, barValue: percentage, highlight: stat.t > 0 && percentage < 85 }; 
  });

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

        {/* 30-Day Attendance Heatmap Calendar */}
        <div className="lg:col-span-6 bg-white rounded-[40px] p-6 shadow-lg shadow-gray-200/40 border border-white flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 shrink-0">
            <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">30-Day Attendance Heatmap</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm border border-white"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Present</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm border border-white"></div><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Absent</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-gray-100"></div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Weekend</span></div>
            </div>
          </div>
          
          <div className="flex-1 w-full overflow-x-auto custom-scrollbar pb-2 relative">
            <div className="min-w-[800px] flex flex-col gap-3 h-full justify-center">
              <div className="flex ml-[120px] justify-between text-[10px] font-extrabold text-gray-300 uppercase tracking-widest pr-4">
                {Array.from({ length: 30 }).map((_, i) => (
                   <span key={i} className={`flex-1 text-center ${(i + 1) % 5 === 0 ? '' : 'opacity-0 sm:opacity-100'}`}>D{i + 1}</span>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {teacherData.slice(0, 7).map((teacher, i) => (
                  <div key={i} className="flex items-center group cursor-pointer" onClick={() => setSelectedTeacher(teacher)}>
                    <div className="w-[120px] shrink-0 pr-4 flex items-center gap-3">
                      <img src={teacher.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`} alt={teacher.name} className="w-6 h-6 rounded-full object-cover border border-gray-100" />
                      <span className="text-[12px] font-extrabold text-primary-blue group-hover:text-sky-500 transition-colors truncate">
                        {teacher.name.split(' ')[0]} {teacher.name.split(' ')[1] ? teacher.name.split(' ')[1][0] + '.' : ''}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-between gap-1.5 pr-4">
                      {teacher.attendance_graphs?.heat_map_30_days ? (
                        teacher.attendance_graphs.heat_map_30_days.map((dayObj, dayIdx) => (
                          <div 
                            key={dayIdx} 
                            className={`flex-1 h-6 rounded-md transition-all duration-300 hover:scale-[1.2] shadow-sm ${
                              dayObj.status === 'present' ? 'bg-emerald-400/90 hover:bg-emerald-500 hover:shadow-emerald-400/30' :
                              dayObj.status === 'absent' ? 'bg-red-400/90 hover:bg-red-500 hover:shadow-red-400/30' :
                              'bg-gray-100/80 border border-gray-200/50'
                            }`}
                            title={`${teacher.name} - ${dayObj.date}: ${dayObj.status.toUpperCase()}`}
                          ></div>
                        ))
                      ) : (
                        Array.from({ length: 30 }).map((_, dayIdx) => (
                          <div key={dayIdx} className="flex-1 h-6 rounded-md bg-gray-50 border border-gray-100"></div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
                {teacherData.length === 0 && (
                  <div className="py-12 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">Loading graphical array...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 shrink-0">
            <span className="text-[11px] font-bold text-gray-400 italic">Showing top tracked teachers for the past 30 days</span>
            <button className="text-[11px] font-extrabold text-sky-500 hover:text-sky-600 transition-colors uppercase tracking-widest">Full History &rarr;</button>
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
            
            <button 
              onClick={() => navigate('add')}
              className="flex items-center gap-2 bg-primary-pink text-white px-6 py-3 rounded-[20px] text-sm font-extrabold hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-primary-pink/20"
            >
              <Plus size={18} strokeWidth={3} />
              <span>Add Teacher</span>
            </button>
          </div>
        </div>

        {/* Elegant Table */}
        <div className="overflow-x-auto w-full custom-scrollbar pb-4">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-4 pl-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">ID Info</th>
                <th className="pb-4 pl-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Teacher</th>
                <th className="pb-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Department</th>
                <th className="pb-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="pb-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Attendance (7 Days)</th>
                <th className="pb-4 pr-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex items-center justify-center">
                      <RefreshCw size={24} className="text-primary-pink animate-spin" />
                      <span className="ml-3 text-sm font-bold text-gray-500">Loading teachers...</span>
                    </div>
                  </td>
                </tr>
              ) : currentTeachers.length > 0 ? (
                currentTeachers.map((teacher, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedTeacher(teacher)}>
                    <td className="py-4 pl-4">
                      <span className="text-[13px] font-extrabold text-primary-blue bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100/50">
                        {teacher.id.substring(0, 8)}
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-4">
                        <img src={teacher.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`} alt={teacher.name} className="w-10 h-10 rounded-[14px] object-cover border border-gray-100 shadow-sm" />
                        <div>
                          <p className="text-[14px] font-extrabold text-primary-blue leading-tight group-hover:text-sky-600 transition-colors">{teacher.name}</p>
                          <p className="text-[11px] font-bold text-gray-400 mt-0.5">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-[12px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl block w-max max-w-[150px] truncate" title={teacher.profile?.subject_specialty || 'General Sub'}>
                        {teacher.profile?.subject_specialty || 'General Sub'}
                      </span>
                    </td>
                    <td className="py-4">
                      {teacher.profile?.employment_status ? (() => {
                        const s = teacher.profile.employment_status;
                        const styles = {
                          'full-time': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                          'part-time': 'bg-sky-50 text-sky-600 border-sky-100',
                          'substitute': 'bg-violet-50 text-violet-600 border-violet-100',
                        };
                        const labels = { 'full-time': 'Full-Time', 'part-time': 'Part-Time', 'substitute': 'Substitute' };
                        return (
                          <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${styles[s] || 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                            {labels[s] || s}
                          </span>
                        );
                      })() : (
                        <span className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">Pending</span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <LineChart width={80} height={24} data={getSparklineData(teacher)}>
                          <YAxis hide domain={[0, 100]} />
                          <Line type="monotone" dataKey="value" stroke={
                            teacher.profile?.employment_status === 'full-time' ? '#10b981' : 
                            teacher.profile?.employment_status === 'part-time' ? '#0ea5e9' : '#8b5cf6'
                          } strokeWidth={2.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedTeacher(teacher); }}
                          className="px-4 py-1.5 flex items-center gap-1.5 bg-sky-50 text-sky-600 border border-sky-100/50 rounded-xl text-[11px] font-extrabold hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                        >
                          <span>View Profile</span>
                          <ChevronRight size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 text-sm font-bold">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-primary-blue transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <button 
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl font-extrabold text-sm transition-all ${
                  currentPage === idx + 1 
                    ? 'bg-primary-pink text-white shadow-md shadow-primary-pink/25 scale-105' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary-blue'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-100 text-sky-500 hover:bg-sky-50 hover:text-sky-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
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
      
      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-blue/20 backdrop-blur-sm" onClick={() => setSelectedTeacher(null)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-xl p-8 relative z-10 shadow-2xl flex flex-col transform animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
              onClick={() => setSelectedTeacher(null)}
            >
              <X size={20} />
            </button>
            
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6 mt-4">
              <div className="relative mb-5">
                <div className="w-24 h-24 rounded-full border-4 border-gray-50 p-1">
                  <img src={selectedTeacher.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTeacher.name || selectedTeacher.full_name || 'T')}&background=random`} alt={selectedTeacher.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-3 border-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-extrabold text-primary-blue leading-tight mb-1.5">{selectedTeacher.name || selectedTeacher.full_name}</h3>
              <div className="flex items-center gap-2 justify-center mb-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{selectedTeacher.id?.substring(0, 8)}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-[11px] font-bold text-sky-500">{selectedTeacher._raw?.department || selectedTeacher.profile?.subject_specialty?.split(',')[0] || 'General'}</span>
              </div>
              
              {(() => {
                const raw = selectedTeacher._raw;
                const status = raw?.status || selectedTeacher.profile?.employment_status;
                if (!status) return (
                  <div className="text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-500">Status Pending</div>
                );
                const styles = {
                  'active': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                  'full-time': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                  'part-time': 'bg-sky-50 text-sky-600 border-sky-100',
                  'inactive': 'bg-gray-100 text-gray-500 border-gray-200',
                  'substitute': 'bg-violet-50 text-violet-600 border-violet-100',
                  'on_leave': 'bg-amber-50 text-amber-600 border-amber-200',
                };
                const labels = { 'active': 'Active', 'full-time': 'Full-Time', 'part-time': 'Part-Time', 'substitute': 'Substitute', 'inactive': 'Inactive', 'on_leave': 'On Leave' };
                return (
                  <div className={`text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border ${styles[status] || 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                    {labels[status] || status}
                  </div>
                );
              })()}
            </div>
            
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/50 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Phone size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Phone</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary-blue">{selectedTeacher._raw?.phone ? `${selectedTeacher._raw.phone_country_code || ''} ${selectedTeacher._raw.phone}` : selectedTeacher.profile?.phone || '—'}</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/50 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Mail size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary-blue truncate" title={selectedTeacher.email}>{selectedTeacher.email || '—'}</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/50 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Building2 size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Department</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary-blue">{selectedTeacher._raw?.department || selectedTeacher.profile?.subject_specialty?.split(',')[0] || '—'}</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/50 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Briefcase size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Designation</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary-blue">{selectedTeacher._raw?.designation || '—'}</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/50 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <GraduationCap size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Qualification</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary-blue">{selectedTeacher._raw?.qualification || '—'}</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/50 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <CalendarIcon size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Joined</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary-blue">{selectedTeacher._raw?.joining_date ? new Date(selectedTeacher._raw.joining_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span>
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
              <button 
                onClick={() => { setSelectedTeacher(null); navigate(`${selectedTeacher.id}`); }}
                className="flex items-center gap-2 bg-primary-blue text-white px-6 py-3 rounded-xl text-[13px] font-extrabold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-blue/20"
              >
                <ExternalLink size={15} />
                <span>View Full Profile</span>
              </button>
              <button className="flex items-center gap-2 bg-sky-50 text-sky-600 px-5 py-3 rounded-xl text-[13px] font-extrabold hover:bg-sky-100 active:scale-95 transition-all border border-sky-100">
                <MessageCircle size={15} />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
