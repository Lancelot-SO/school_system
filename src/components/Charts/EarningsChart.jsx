import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const data = [
  { name: 'Jan', earnings: 3500, expenses: -2500 },
  { name: 'Feb', earnings: 2800, expenses: -2000 },
  { name: 'Mar', earnings: 2200, expenses: -1500 },
  { name: 'Apr', earnings: 2600, expenses: -1200 },
  { name: 'May', earnings: 3500, expenses: -2200 },
  { name: 'Jun', earnings: 4500, expenses: -3000 },
  { name: 'Jul', earnings: 5785, expenses: -4020 },
  { name: 'Aug', earnings: 4800, expenses: -4500 },
  { name: 'Sep', earnings: 5100, expenses: -3500 },
  { name: 'Oct', earnings: 2500, expenses: -1500 },
  { name: 'Nov', earnings: 2400, expenses: -1800 },
  { name: 'Dec', earnings: 2800, expenses: -2200 },
];

const EarningsChart = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-[#1a365d]">Earnings</h3>
        <div className="flex items-center gap-2">
          <select className="bg-[#dcf0f4] border-none text-[13px] font-bold text-primary-blue rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary-pink/20 outline-none cursor-pointer border-transparent transition-all">
            <option>Last Year</option>
            <option>Last 6 Months</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 px-1">
        <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#1a365d]"></div>
            <span className="text-[13px] font-bold text-gray-400">Earnings</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#fbcfe8] border-t-2 border-dashed border-[#d81b60]"></div>
            <span className="text-[13px] font-bold text-gray-400">Expenses</span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} stackOffset="sign">
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a365d" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1a365d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="1" x2="0" y2="0">
                <stop offset="5%" stopColor="#d81b60" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#d81b60" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
            <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} 
            tickFormatter={(value) => `$${value}K`}
            domain={[-6, 6]}
            ticks={[-6, -3, 0, 3, 6]}
          />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-50 flex flex-col gap-2 min-w-[140px]">
                      <span className="text-[11px] font-bold text-gray-400 mb-1">{label} 2034</span>
                      {payload.map((item, index) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5" style={{ backgroundColor: item.color }}></div>
                                <span className="text-[11px] font-bold text-gray-400 capitalize">{item.name}</span>
                            </div>
                            <span className="text-[13px] font-extrabold text-primary-blue">
                                ${Math.abs(item.value).toLocaleString()}
                            </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
                type="stepAfter" 
                dataKey="earnings" 
                name="earnings"
                stroke="#1a365d" 
                fillOpacity={1} 
                fill="url(#colorEarnings)" 
                strokeWidth={3} 
            />
            <Area 
                type="stepAfter" 
                dataKey="expenses" 
                name="expenses"
                stroke="#d81b60" 
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
                strokeWidth={3} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;
