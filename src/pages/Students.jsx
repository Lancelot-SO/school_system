import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen,
  Award,
  Search, 
  Filter, 
  ChevronDown, 
  Plus, 
  MoreVertical,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart
} from 'recharts';

const stats = [
  { label: 'Total Students', count: 1245, icon: Users, bgColor: 'bg-white', iconColor: 'text-white', iconBg: 'bg-[#1a365d]' },
  { label: 'Recent Admissions', count: 142, icon: Plus, bgColor: 'bg-white', iconColor: 'text-[#d81b60]', iconBg: 'bg-[#fae8ff]' },
  { label: 'Average Attendance', count: '94%', icon: GraduationCap, bgColor: 'bg-white', iconColor: 'text-[#0ea5e9]', iconBg: 'bg-[#e0faff]' },
  { label: 'Academic Excellence', count: 86, icon: Award, bgColor: 'bg-white', iconColor: 'text-[#6366f1]', iconBg: 'bg-[#eef2ff]' },
];

const performanceData = [
  { term: 'Term 1', math: 75, science: 80, english: 85 },
  { term: 'Term 2', math: 78, science: 82, english: 88 },
  { term: 'Term 3', math: 85, science: 88, english: 90 },
  { term: 'Term 4', math: 92, science: 85, english: 94 },
];

const genderData = [
  { name: 'Boys', value: 680, color: '#1a365d', percentage: '55%' },
  { name: 'Girls', value: 565, color: '#fbcfe8', percentage: '45%' },
];

const initialStudents = [
  { id: 'S-2001', name: 'Samantha Collins', grade: '9th Grade', section: 'A', gender: 'Female', phone: '+1 234 567 8900', email: 'sam.c@student.org', image: 'https://i.pravatar.cc/150?u=11' },
  { id: 'S-2002', name: 'Marcus Johnson', grade: '10th Grade', section: 'B', gender: 'Male', phone: '+1 234 567 8901', email: 'marcus.j@student.org', image: 'https://i.pravatar.cc/150?u=12' },
  { id: 'S-2003', name: 'Isabella Rodriguez', grade: '11th Grade', section: 'C', gender: 'Female', phone: '+1 234 567 8902', email: 'isa.r@student.org', image: 'https://i.pravatar.cc/150?u=13' },
  { id: 'S-2004', name: 'Ethan Williams', grade: '9th Grade', section: 'A', gender: 'Male', phone: '+1 234 567 8903', email: 'ethan.w@student.org', image: 'https://i.pravatar.cc/150?u=14' },
  { id: 'S-2005', name: 'Sophia Lee', grade: '12th Grade', section: 'A', gender: 'Female', phone: '+1 234 567 8904', email: 'sophia.l@student.org', image: 'https://i.pravatar.cc/150?u=15' },
  { id: 'S-2006', name: 'Liam Brown', grade: '10th Grade', section: 'D', gender: 'Male', phone: '+1 234 567 8905', email: 'liam.b@student.org', image: 'https://i.pravatar.cc/150?u=16' },
];

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!payload || payload.term !== 'Term 3') {
    return cx ? <circle cx={cx} cy={cy} r={4} fill="#1a365d" stroke="#fff" strokeWidth={2} /> : null;
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#fae8ff" stroke="#fae8ff" strokeWidth={4} opacity={0.6} />
      <circle cx={cx} cy={cy} r={4} fill="#1a365d" stroke="#fff" strokeWidth={2} />
    </g>
  );
};

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  const filteredStudents = initialStudents.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedGrade === 'All' || student.grade === selectedGrade)
  );

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  // Ensure current page is valid when filtering reduces total pages
  const validCurrentPage = Math.min(currentPage, totalPages);
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }

  const currentStudents = filteredStudents.slice((validCurrentPage - 1) * itemsPerPage, validCurrentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in duration-500 overflow-x-hidden pb-12">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto">
        {/* Academic Performance Over Time */}
        <div className="lg:col-span-8 bg-white rounded-[40px] p-6 shadow-lg shadow-gray-200/40 border border-white flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">Academic Performance</h3>
            <div className="flex items-center gap-1 bg-sky-100/50 px-3 py-1.5 rounded-xl border border-sky-100/50 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[11px] font-bold text-sky-600">Yearly</span>
              <ChevronDown size={14} className="text-sky-400" />
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="term" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[50, 100]}
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="math" name="Mathematics" stroke="#1a365d" strokeWidth={3} dot={<CustomDot />} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="science" name="Science" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="english" name="English" stroke="#fbcfe8" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a365d]"></div>
              <span className="text-[10px] font-bold text-gray-500">Mathematics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
              <span className="text-[10px] font-bold text-gray-500">Science</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#fbcfe8]"></div>
              <span className="text-[10px] font-bold text-gray-500">English</span>
            </div>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="lg:col-span-4 bg-white rounded-[40px] p-6 shadow-lg shadow-gray-200/40 border border-white flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-primary-blue tracking-tight">Gender Distribution</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg text-gray-400">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="relative w-full h-[180px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={10}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
              <span className="text-2xl font-extrabold text-primary-blue">1,245</span>
            </div>
          </div>
          <div className="w-full space-y-3 mt-4 px-4 bg-gray-50/50 p-4 rounded-3xl">
            {genderData.map((gender, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[4px]" style={{ backgroundColor: gender.color }}></div>
                  <span className="text-[12px] font-bold text-gray-500 group-hover:text-primary-blue transition-colors">{gender.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-extrabold text-primary-blue/60">{gender.value}</span>
                  <span className="text-[12px] font-extrabold text-primary-blue w-8 text-right bg-white px-2 py-0.5 rounded-lg shadow-sm">{gender.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students Data Table Section */}
      <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-2xl font-extrabold text-primary-blue tracking-tight">Students Directory</h2>
          
          <div className="flex flex-wrap items-center gap-4 flex-1 justify-end">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or ID..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-[20px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue/5 transition-all text-primary-blue"
              />
            </div>
            
            <div className="relative">
              <select 
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="appearance-none flex items-center gap-2 bg-gray-50 pl-10 pr-10 py-3 rounded-[20px] border border-gray-100 text-sm font-bold text-primary-blue hover:bg-gray-100 transition-all focus:outline-none cursor-pointer"
              >
                <option value="All">All Grades</option>
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
              </select>
              <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            <button className="flex items-center gap-2 bg-primary-pink text-white px-6 py-3 rounded-[20px] text-sm font-extrabold hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-primary-pink/20">
              <Plus size={18} strokeWidth={3} />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Elegant Table */}
        <div className="overflow-x-auto w-full custom-scrollbar pb-4">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-4 pl-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">ID Info</th>
                <th className="pb-4 pl-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Student</th>
                <th className="pb-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Grade & Section</th>
                <th className="pb-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Gender</th>
                <th className="pb-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</th>
                <th className="pb-4 pr-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentStudents.length > 0 ? (
                currentStudents.map((student, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 pl-4">
                      <span className="text-[13px] font-extrabold text-primary-blue bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100/50">
                        {student.id}
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-4">
                        <img src={student.image} alt={student.name} className="w-10 h-10 rounded-[14px] object-cover border border-gray-100 shadow-sm" />
                        <div>
                          <p className="text-[14px] font-extrabold text-primary-blue leading-tight">{student.name}</p>
                          <p className="text-[11px] font-bold text-sky-500 mt-0.5">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-extrabold text-gray-700">{student.grade}</span>
                        <span className="text-[11px] font-bold text-gray-400 mt-0.5">Section {student.section}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1.5 rounded-[12px] text-[12px] font-bold ${
                        student.gender === 'Female' 
                          ? 'bg-pink-50 text-pink-600 border border-pink-100' 
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-[13px] font-extrabold text-gray-600">{student.phone}</span>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:text-red-500 hover:border-red-200 transition-all shadow-sm">
                          <Trash2 size={14} />
                        </button>
                        <button className="p-2 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm text-gray-400">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 text-sm font-bold">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area / Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-100">
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
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-blue pointer-events-none" />
              </div>
              <span className="text-sm font-bold text-gray-400">of {filteredStudents.length} results</span>
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
    </div>
  );
};

export default Students;
