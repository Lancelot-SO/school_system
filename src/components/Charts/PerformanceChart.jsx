import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const defaultData = [
  { name: 'Jul', class7: 82, class8: 88, class9: 78 },
  { name: 'Aug', class7: 75, class8: 95, class9: 86 },
  { name: 'Sep', class7: 78, class8: 92, class9: 82 },
  { name: 'Oct', class7: 82, class8: 85, class9: 78, active: true },
  { name: 'Nov', class7: 76, class8: 88, class9: 84 },
  { name: 'Dec', class7: 84, class8: 90, class9: 72 },
];

const PerformanceChart = ({ data: apiData }) => {
  let chartData = defaultData;
  if (apiData && apiData.labels && apiData.labels.length > 0 && apiData.datasets && apiData.datasets.length > 0) {
    chartData = apiData.labels.map((label, index) => {
      const point = { name: label };
      apiData.datasets.forEach(dataset => {
        point[dataset.label] = dataset.data[index] || 0;
      });
      return point;
    });
  }
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-[#1a365d]">Student Performance</h3>
        <div className="flex items-center gap-2">
          <select className="bg-[#dcf0f4] border-none text-[13px] font-bold text-primary-blue rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary-pink/20 outline-none cursor-pointer border-transparent transition-all">
            <option>Last Semester</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 px-1">
        <div className="flex items-center gap-2">
            <div className="w-3.5 h-0.5 rounded-full bg-[#d1eff6]"></div>
            <span className="text-[13px] font-bold text-gray-400">Class 7</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3.5 h-0.5 rounded-full bg-[#fbcfe8]"></div>
            <span className="text-[13px] font-bold text-gray-400">Class 8</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3.5 h-0.5 rounded-full bg-primary-blue"></div>
            <span className="text-[13px] font-bold text-gray-400">Class 9</span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-50 flex flex-col gap-2 min-w-[120px]">
                      {payload.map((item, index) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: item.color }}></div>
                                <span className="text-[11px] font-bold text-gray-400">{item.name}</span>
                            </div>
                            <span className="text-[13px] font-extrabold text-primary-blue">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Background highlight for active month */}
            <ReferenceArea x1="Oct" x2="Oct" fill="#f8fafc" fillOpacity={1} strokeOpacity={0} />

            <Bar dataKey="class7" name="Class 7" fill="#d1eff6" radius={[4, 4, 0, 0]} barSize={8} />
            <Bar dataKey="class8" name="Class 8" fill="#fbcfe8" radius={[4, 4, 0, 0]} barSize={8} />
            <Bar dataKey="class9" name="Class 9" fill="#1a365d" radius={[4, 4, 0, 0]} barSize={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
