import React from 'react';
import { 
  Search, 
  Settings, 
  Bell, 
  ChevronDown, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const trendData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 67250 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 62000 },
  { month: 'Jul', amount: 58000 },
  { month: 'Aug', amount: 75000 },
];

const progressData = [
  { label: 'Tuition Fee', percentage: 87.5, collected: 70000, total: 80000 },
  { label: 'Books & Supplies', percentage: 87.5, collected: 10500, total: 12000 },
  { label: 'Activities', percentage: 90, collected: 7200, total: 8000 },
  { label: 'Miscellaneous', percentage: 86.5, collected: 4800, total: 5550 },
];

const tableData = [
  {
    id: 'S-2101',
    name: 'Michael Chen',
    class: '7A',
    fees: [
      { category: 'Tuition Fee', amount: 'GHS 1,200', date: 'Mar 15, 2035', status: 'Paid' },
      { category: 'Books & Supplies', amount: 'GHS 250', date: 'Mar 20, 2035', status: 'Pending' },
      { category: 'Activities', amount: 'GHS 300', date: 'Mar 25, 2035', status: 'Paid' },
      { category: 'Miscellaneous', amount: 'GHS 150', date: 'Mar 30, 2035', status: 'Partially Paid' },
    ]
  },
  {
    id: 'S-2102',
    name: 'Emma Williams',
    class: '7B',
    fees: [
      { category: 'Tuition Fee', amount: 'GHS 1,200', date: 'Mar 12, 2035', status: 'Partially Paid' },
      { category: 'Books & Supplies', amount: 'GHS 200', date: 'Mar 18, 2035', status: 'Paid' },
      { category: 'Activities', amount: 'GHS 250', date: 'Mar 20, 2035', status: 'Pending' },
      { category: 'Miscellaneous', amount: 'GHS 100', date: 'Mar 28, 2035', status: 'Paid' },
    ]
  },
  {
    id: 'S-2103',
    name: 'Rajesh Kumar',
    class: '7C',
    fees: [
      { category: 'Tuition Fee', amount: 'GHS 1,200', date: 'Mar 10, 2035', status: 'Overdue' },
      { category: 'Books & Supplies', amount: 'GHS 220', date: 'Mar 15, 2035', status: 'Pending' },
      { category: 'Activities', amount: 'GHS 300', date: 'Mar 22, 2035', status: 'Paid' },
      { category: 'Miscellaneous', amount: 'GHS 150', date: 'Mar 29, 2035', status: 'Partially Paid' },
    ]
  },
  {
    id: 'S-2104',
    name: 'Hannah Lee',
    class: '8A',
    fees: [
      { category: 'Tuition Fee', amount: 'GHS 1,200', date: 'Mar 14, 2035', status: 'Paid' },
      { category: 'Books & Supplies', amount: 'GHS 250', date: 'Mar 19, 2035', status: 'Overdue' },
      { category: 'Activities', amount: 'GHS 280', date: 'Mar 24, 2035', status: 'Paid' },
      { category: 'Miscellaneous', amount: 'GHS 120', date: 'Mar 27, 2035', status: 'Pending' },
    ]
  },
  {
    id: 'S-2105',
    name: 'Thomas Green',
    class: '8B',
    fees: [
      { category: 'Tuition Fee', amount: 'GHS 1,200', date: 'Mar 18, 2035', status: 'Paid' },
      { category: 'Books & Supplies', amount: 'GHS 230', date: 'Mar 20, 2035', status: 'Partially Paid' },
      { category: 'Activities', amount: 'GHS 270', date: 'Mar 25, 2035', status: 'Pending' },
      { category: 'Miscellaneous', amount: 'GHS 150', date: 'Mar 30, 2035', status: 'Paid' },
    ]
  }
];

const StatCard = ({ icon: Icon, label, value, theme }) => {
  const themes = {
    navy: "bg-fees-navy text-white", // Navy
    sky: "bg-fees-sky text-white",  // Sky
    pink: "bg-fees-pink text-white", // Pink
  };
  
  return (
    <div className={`rounded-[32px] p-7 flex items-center gap-5 shadow-xl shadow-gray-200/20 ${themes[theme]}`}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm shrink-0">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-[28px] font-black leading-tight">GHS {value}</span>
        <span className="text-[13px] font-bold opacity-80 tracking-wide uppercase">{label}</span>
      </div>
    </div>
  );
};

const FeesCollection = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Breadcrumbs only */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-wide uppercase">
          <span>Dashboard</span>
          <span className="opacity-30">•</span>
          <span>Finance</span>
          <span className="opacity-30">•</span>
          <span className="text-primary-pink">Fees Collection</span>
        </div>
      </div>

      {/* Summary Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Stats */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <StatCard 
            icon={CheckCircle2} 
            label="Fees Collected" 
            value="92,500" 
            theme="navy"
          />
          <StatCard 
            icon={Clock} 
            label="Pending Fees" 
            value="12,300" 
            theme="sky"
          />
          <StatCard 
            icon={AlertCircle} 
            label="Overdue Payments" 
            value="4,750" 
            theme="pink"
          />
        </div>

        {/* Center Column - Trend Chart */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50/50 relative overflow-hidden min-w-0">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-[17px] font-extrabold text-primary-blue">Fees Collection Trend</h3>
            <div className="bg-sky-50 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[11px] font-extrabold text-primary-blue tracking-wide">Last 8 Months</span>
              <ChevronDown size={14} className="text-primary-blue" />
            </div>
          </div>
          
          <div className="h-[240px] w-full relative z-10 flex items-center justify-center">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  tickFormatter={(val) => `GHS ${val/1000}K`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-primary-blue text-white px-4 py-2 rounded-xl shadow-lg border border-white/10 text-center animate-in zoom-in-95 duration-200">
                          <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest mb-0.5">{label} 2035</p>
                          <p className="text-[14px] font-extrabold">GHS {payload[0].value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ stroke: '#f472b6', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#f472b6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                  isAnimationActive={false}
                  dot={{ r: 4, fill: '#f472b6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#f472b6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Progress */}
        <div className="lg:col-span-4 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[17px] font-extrabold text-primary-blue">Fees Collection Progress</h3>
            <button className="text-gray-400 hover:text-primary-blue transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {progressData.map((item, idx) => (
              <div key={idx} className="space-y-2.5">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-extrabold text-primary-blue">{item.label}</span>
                    <span className="text-[11px] font-bold text-gray-400">
                      <span className="text-primary-blue">GHS {item.collected.toLocaleString()}</span>/{item.total.toLocaleString()} collected
                    </span>
                  </div>
                  <span className="text-[14px] font-black text-primary-blue tracking-tight">{item.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-blue rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(30,58,138,0.2)]" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fees Collection Table Section */}
      <div className="bg-white rounded-[36px] p-8 shadow-sm border border-gray-50/50 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-[19px] font-extrabold text-primary-blue tracking-tight">Fees Collection</h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-gray-50 px-4 py-2.5 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
              <span className="text-[11px] font-extrabold text-primary-blue tracking-wide">All Classes</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <div className="bg-gray-50 px-4 py-2.5 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
              <span className="text-[11px] font-extrabold text-primary-blue tracking-wide">All Status</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <div className="bg-sky-50 px-4 py-2.5 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-blue-100/50 transition-colors border border-blue-100/30">
              <span className="text-[11px] font-bold text-primary-blue tracking-wide">This Month</span>
              <ChevronDown size={14} className="text-primary-blue" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-8 px-8">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead>
              <tr className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-6 text-left pl-4 font-black">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary-blue transition-colors group">
                    Student
                    <div className="flex flex-col -gap-1 opacity-40 group-hover:opacity-100">
                      <ChevronDown size={10} className="rotate-180" />
                      <ChevronDown size={10} />
                    </div>
                  </div>
                </th>
                <th className="pb-6 text-left font-black">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary-blue transition-colors group">
                    Class
                    <div className="flex flex-col -gap-1 opacity-40 group-hover:opacity-100">
                      <ChevronDown size={10} className="rotate-180" />
                      <ChevronDown size={10} />
                    </div>
                  </div>
                </th>
                <th className="pb-6 text-left font-black">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary-blue transition-colors group">
                    Fee Category
                    <div className="flex flex-col -gap-1 opacity-40 group-hover:opacity-100">
                      <ChevronDown size={10} className="rotate-180" />
                      <ChevronDown size={10} />
                    </div>
                  </div>
                </th>
                <th className="pb-6 text-left font-black">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary-blue transition-colors group">
                    Total Amount
                    <div className="flex flex-col -gap-1 opacity-40 group-hover:opacity-100">
                      <ChevronDown size={10} className="rotate-180" />
                      <ChevronDown size={10} />
                    </div>
                  </div>
                </th>
                <th className="pb-6 text-left font-black">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary-blue transition-colors group">
                    Due Date
                    <div className="flex flex-col -gap-1 opacity-40 group-hover:opacity-100">
                      <ChevronDown size={10} className="rotate-180" />
                      <ChevronDown size={10} />
                    </div>
                  </div>
                </th>
                <th className="pb-6 text-left font-black">
                   <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary-blue transition-colors group">
                    Status
                    <div className="flex flex-col -gap-1 opacity-40 group-hover:opacity-100">
                      <ChevronDown size={10} className="rotate-180" />
                      <ChevronDown size={10} />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {tableData.map((participant, pIdx) => (
                <React.Fragment key={pIdx}>
                  {participant.fees.map((fee, fIdx) => (
                    <tr 
                      key={`${pIdx}-${fIdx}`} 
                      className={`
                        group hover:bg-gray-50/50 transition-colors
                        ${fIdx === 0 ? 'bg-white' : 'bg-transparent'}
                      `}
                    >
                      <td className="py-5 pl-4">
                        {fIdx === 0 ? (
                          <div className="flex items-center gap-3">
                            <span className="bg-sky-50 text-sky-400 text-[10px] font-black px-2 py-1 rounded-md tracking-tighter">
                              {participant.id}
                            </span>
                            <span className="text-[13px] font-extrabold text-primary-blue whitespace-nowrap">
                              {participant.name}
                            </span>
                          </div>
                        ) : null}
                      </td>
                      <td className="py-5">
                        {fIdx === 0 ? (
                          <span className="text-[13px] font-bold text-gray-500">{participant.class}</span>
                        ) : null}
                      </td>
                      <td className="py-5">
                        <span className="text-[13px] font-bold text-gray-600">{fee.category}</span>
                      </td>
                      <td className="py-5">
                        <span className="text-[13px] font-extrabold text-primary-blue">{fee.amount}</span>
                      </td>
                      <td className="py-5">
                        <span className="text-[13px] font-bold text-gray-500 whitespace-nowrap">{fee.date}</span>
                      </td>
                      <td className="py-5">
                        <span className={`
                          inline-flex px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                          ${fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-500' : ''}
                          ${fee.status === 'Pending' ? 'bg-pink-50 text-primary-pink' : ''}
                          ${fee.status === 'Partially Paid' ? 'bg-sky-50 text-sky-400' : ''}
                          ${fee.status === 'Overdue' ? 'bg-rose-50 text-rose-500' : ''}
                        `}>
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Spacer row between students */}
                  <tr className="h-6 bg-transparent" aria-hidden="true">
                    <td colSpan="6"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-gray-400">Show</span>
            <div className="relative inline-block group">
              <select className="appearance-none bg-gray-50 border border-transparent rounded-xl px-4 py-2 pr-10 text-[12px] font-extrabold text-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/10 cursor-pointer transition-all hover:bg-gray-100">
                <option>5</option>
                <option>10</option>
                <option>25</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-primary-blue transition-colors" />
            </div>
            <span className="text-[12px] font-bold text-gray-400">of 25 results</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-300 hover:text-primary-blue hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
              <ChevronLeft size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary-pink/10 text-primary-pink text-[13px] font-black border border-primary-pink/20 shadow-sm">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl text-primary-blue text-[13px] font-black hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl text-primary-blue text-[13px] font-black hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">3</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-300 hover:text-primary-blue hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-4 opacity-70">
        <p className="text-[13px] font-bold text-gray-400">Copyright © 2025 Peterdraw</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#" className="text-[13px] font-bold text-gray-400 hover:text-primary-pink transition-colors">Privacy Policy</a>
          <a href="#" className="text-[13px] font-bold text-gray-400 hover:text-primary-pink transition-colors">Term and conditions</a>
          <a href="#" className="text-[13px] font-bold text-gray-400 hover:text-primary-pink transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          {['facebook', 'x', 'instagram', 'youtube', 'linkedin'].map((social) => (
            <div key={social} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-primary-pink/10 hover:text-primary-pink transition-all text-gray-400 border border-gray-100/50">
              <span className="text-[10px] font-black uppercase tracking-tighter">{social.charAt(0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeesCollection;
