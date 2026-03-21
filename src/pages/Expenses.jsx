import React from 'react';
import { 
  Search, 
  Settings, 
  Bell, 
  MoreHorizontal, 
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronDown,
  Clock,
  Briefcase,
  Layers,
  Wrench,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const trendData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 73250 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 51200 },
  { month: 'Jul', amount: 49000 },
  { month: 'Aug', amount: 54000 },
];

const reimbursementData = [
  { id: 'RQ-3001', staff: 'Argen Maulie', dept: 'Mathematics', amount: 120, desc: 'Books Purchase', date: 'Mar 2, 2035', status: 'Approved' },
  { id: 'RQ-3002', staff: 'Bella Cruz', dept: 'Science', amount: 250, desc: 'Lab Equipment', date: 'Mar 3, 2035', status: 'Declined' },
  { id: 'RQ-3003', staff: 'Francesca Gill', dept: 'Physical Ed.', amount: 180, desc: 'Sports Supplies', date: 'Mar 5, 2035', status: 'Approved' },
  { id: 'RQ-3004', staff: 'Darlah Ahmed', dept: 'Social Studies', amount: 300, desc: 'Seminar Travel', date: 'Mar 6, 2035', status: 'Pending' },
  { id: 'RQ-3005', staff: 'Esteban Parez', dept: 'Arts', amount: 90, desc: 'Art Materials', date: 'Mar 8, 2035', status: 'Pending' },
];

const breakdownData = [
  { name: 'Salaries', value: 68750, color: '#1e293b', percent: '55%' },
  { name: 'Supplies', value: 18750, color: '#f472b6', percent: '15%' },
  { name: 'Maintenance', value: 15000, color: '#38bdf8', percent: '12%' },
  { name: 'Events', value: 12500, color: '#fbbf24', percent: '10%' },
  { name: 'Others', value: 10000, color: '#94a3b8', percent: '8%' },
];

const ledgerData = [
  { id: 'EX-5001', date: 'Mar 1, 2035', dept: 'Mathematics', category: 'Supplies', desc: 'Graphing calculators', qty: '15', amount: 750, icon: Layers },
  { id: 'EX-5002', date: 'Mar 1, 2035', dept: 'Science', category: 'Maintenance', desc: 'Lab equipment servicing', qty: '-', amount: 1200, icon: Wrench },
  { id: 'EX-5003', date: 'Mar 2, 2035', dept: 'Language', category: 'Supplies', desc: 'English literature textbooks', qty: '40', amount: 1000, icon: Layers },
  { id: 'EX-5004', date: 'Mar 3, 2035', dept: 'Social', category: 'Events', desc: 'Field trip bus rental', qty: '2 buses', amount: 900, icon: Calendar },
  { id: 'EX-5005', date: 'Mar 3, 2035', dept: 'Arts', category: 'Supplies', desc: 'Paint sets & brushes', qty: '25 sets', amount: 600, icon: Layers },
  { id: 'EX-5006', date: 'Mar 4, 2035', dept: 'Physical Education', category: 'Maintenance', desc: 'Gym floor repairs', qty: '-', amount: 2500, icon: Wrench },
  { id: 'EX-5007', date: 'Mar 5, 2035', dept: 'Mathematics', category: 'Salaries', desc: 'Monthly teacher salary', qty: '-', amount: 5000, icon: Briefcase },
  { id: 'EX-5008', date: 'Mar 6, 2035', dept: 'Science', category: 'Salaries', desc: 'Monthly teacher salary', qty: '-', amount: 5000, icon: Briefcase },
];

const Expenses = () => {
  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-20">
      {/* Breadcrumbs only */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
            <span>Dashboard</span>
            <span className="text-gray-300">/</span>
            <span>Finance</span>
            <span className="text-gray-300">/</span>
            <span className="text-primary-pink">Expenses</span>
          </div>
        </div>

      {/* Top Section - Trend & Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Expense Trend */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50/50 relative overflow-hidden min-w-0">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-[17px] font-extrabold text-primary-gray">Expense Trend</h3>
            <div className="bg-sky-50 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[11px] font-extrabold text-sky-600 uppercase tracking-widest">Last 8 Months</span>
              <ChevronDown size={14} className="text-sky-400" />
            </div>
          </div>
          
          <div className="h-[240px] w-full mt-4 flex items-center justify-center">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
                   tickFormatter={(value) => `$${value/1000}K`}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc', opacity: 0.4}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px'}}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                />
                <Bar 
                  dataKey="amount" 
                  radius={[8, 8, 0, 0]} 
                  barSize={32}
                >
                  {trendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.month === 'Apr' ? '#1e293b' : '#fae8ff'} />
                  ))}
                </Bar>
                {/* Horizontal Target Line Placeholder logic */}
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Mock Target Line */}
          <div className="absolute top-[85px] left-[70px] right-[40px] border-t-2 border-dashed border-sky-400 opacity-50"></div>
          <div className="absolute top-[108px] left-[230px] flex flex-col items-center">
             <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg border border-gray-50 flex flex-col items-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">April 2035</span>
                <span className="text-[12px] font-black text-primary-gray">$73,250</span>
                <div className="w-2 h-2 bg-white border-b border-r border-gray-50 rotate-45 -mb-2 mt-1"></div>
             </div>
          </div>
        </div>

        {/* Reimbursements Tracking */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50/50 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[17px] font-extrabold text-primary-gray">Reimbursements Tracking</h3>
            <div className="bg-sky-50 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-sky-100 transition-colors">
              <span className="text-[11px] font-extrabold text-sky-600 uppercase tracking-widest">This Week</span>
              <ChevronDown size={14} className="text-sky-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 opacity-50">
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Request ID <ChevronDown size={10} className="inline ml-1" /></th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Staff Name <ChevronDown size={10} className="inline ml-1" /></th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount <ChevronDown size={10} className="inline ml-1" /></th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Submitted <ChevronDown size={10} className="inline ml-1" /></th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Proof</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reimbursementData.map((row) => (
                  <tr key={row.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="py-4 text-[12px] font-bold text-sky-500 whitespace-nowrap">{row.id}</td>
                    <td className="py-4 whitespace-nowrap">
                      <p className="text-[12px] font-black text-primary-gray">{row.staff}</p>
                      <p className="text-[10px] font-bold text-gray-400">{row.dept}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
                          <DollarSign size={10} strokeWidth={3} />
                        </div>
                        <span className="text-[12px] font-black text-primary-gray">${row.amount}</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 pl-8">{row.desc}</p>
                    </td>
                    <td className="py-4 text-[11px] font-bold text-gray-500 whitespace-nowrap">{row.date}</td>
                    <td className="py-4 text-center">
                       <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-100 text-[10px] font-extrabold text-gray-500 hover:bg-gray-50 transition-all">
                         <FileText size={14} className="text-gray-300" />
                         View File
                       </button>
                    </td>
                    <td className="py-4">
                      {row.status === 'Pending' ? (
                        <div className="flex items-center gap-3">
                          <button className="text-[10px] font-black text-sky-500 hover:underline">Approve</button>
                          <button className="text-[10px] font-black text-red-500 hover:underline">Decline</button>
                        </div>
                      ) : (
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wide leading-none
                          ${row.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Middle Section - Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 bg-white rounded-[40px] p-8 shadow-sm border border-gray-50/50 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[17px] font-extrabold text-primary-gray underline decoration-primary-pink decoration-2 underline-offset-8">Expense Breakdown</h3>
            <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={24} /></button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Donut Chart */}
            <div className="relative w-64 h-64 shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Expense</span>
                  <span className="text-2xl font-black text-primary-gray mt-1">$125,000</span>
               </div>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 flex-1">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex flex-col gap-3 p-5 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 transition-all cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md" style={{backgroundColor: item.color}}></div>
                    <span className="text-[13px] font-black text-primary-gray">{item.name}</span>
                  </div>
                  <div className="flex items-end justify-between">
                     <span className="text-[12px] font-bold text-gray-400">${item.value.toLocaleString()}</span>
                     <span className="text-[14px] font-black text-primary-blue">{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Main Expenses Table */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50/50 flex flex-col min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h3 className="text-xl font-black text-primary-gray">Expenses</h3>
          <div className="flex flex-wrap items-center gap-3">
             <div className="bg-sky-50 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-sky-100 transition-colors">
               <span className="text-[11px] font-extrabold text-sky-600 uppercase tracking-widest">All Categories</span>
               <ChevronDown size={14} className="text-sky-400" />
             </div>
             <div className="bg-sky-50 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-sky-100 transition-colors">
               <span className="text-[11px] font-extrabold text-sky-600 uppercase tracking-widest">This Month</span>
               <ChevronDown size={14} className="text-sky-400" />
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 opacity-50">
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expense ID <ChevronDown size={10} className="inline ml-1" /></th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Date <ChevronDown size={10} className="inline ml-1" /></th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Department <ChevronDown size={10} className="inline ml-1" /></th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Category <ChevronDown size={10} className="inline ml-1" /></th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description <ChevronDown size={10} className="inline ml-1" /></th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Quantity <ChevronDown size={10} className="inline ml-1" /></th>
                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount <ChevronDown size={10} className="inline ml-1" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ledgerData.map((row) => (
                <tr key={row.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="py-5 text-[12px] font-bold text-sky-500">{row.id}</td>
                  <td className="py-5 text-[12px] font-bold text-gray-500 text-center">{row.date}</td>
                  <td className="py-5 text-[12px] font-bold text-gray-600 text-center">{row.dept}</td>
                  <td className="py-5 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 rounded-xl text-sky-600">
                      <row.icon size={12} className="opacity-70" />
                      <span className="text-[11px] font-black tracking-wide leading-none">{row.category}</span>
                    </div>
                  </td>
                  <td className="py-5 text-[13px] font-bold text-gray-500">{row.desc}</td>
                  <td className="py-5 text-[12px] font-bold text-gray-400 text-center">{row.qty}</td>
                  <td className="py-5 text-right">
                    <span className="text-[14px] font-black text-rose-500">${row.amount.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 mt-6 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-bold text-gray-400">Show</span>
            <div className="bg-gray-50 px-3 py-1.5 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
              <span className="text-[13px] font-black text-primary-gray">8</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">of 40 results</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl border border-gray-100 text-gray-300 hover:text-primary-blue hover:bg-gray-50 transition-all shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 5].map((p, i) => (
                <button 
                  key={i} 
                  className={`w-10 h-10 rounded-xl text-[13px] font-black transition-all shadow-sm
                    ${p === 1 ? 'bg-primary-pink text-white shadow-primary-pink/20' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-all shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-6 px-4 mt-8 pt-8 border-t border-gray-100 opacity-60">
        <p className="text-sm font-bold text-gray-500">Copyright © 2025 Peterdraw</p>
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Term and conditions', 'Contact'].map(link => (
            <a key={link} href="#" className="text-sm font-bold text-gray-500 hover:text-primary-blue transition-colors tracking-tight">{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
           {/* Social placeholders */}
           <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all cursor-pointer">
                <Settings size={14} />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all cursor-pointer">
                <Settings size={14} />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all cursor-pointer">
                <Settings size={14} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
