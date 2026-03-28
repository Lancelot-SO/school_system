import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const demoData = [
  { name: 'Boys', value: 560, color: '#1a365d' },
  { name: 'Girls', value: 685, color: '#fbcfe8' },
];

const GenderChart = ({ data: apiData }) => {
  const isLiveData = apiData && apiData.total > 0;
  const hasGenderData = isLiveData && (apiData.boys > 0 || apiData.girls > 0);

  // Always show a donut — use live data when available, otherwise fall back to demo
  const chartData = hasGenderData ? [
    { name: 'Boys', value: apiData.boys, color: '#1a365d' },
    { name: 'Girls', value: apiData.girls, color: '#fbcfe8' },
  ] : demoData;

  const total = isLiveData ? apiData.total : 1245;
  const isDemo = !hasGenderData;

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col h-full min-h-[420px]">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-extrabold text-[#1a365d]">Students by Gender</h3>
          {isDemo && (
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">Demo</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-[#dcf0f4] border-none text-[13px] font-bold text-primary-blue rounded-xl px-4 py-2 focus:ring-1 focus:ring-primary-pink/20 outline-none cursor-pointer border-transparent transition-all">
            <option>Grade 9</option>
            <option>All Grades</option>
          </select>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-full h-full max-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={95}
                paddingAngle={10}
                cornerRadius={10}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-3xl font-extrabold text-primary-blue leading-tight">{total.toLocaleString()}</p>
          <p className="text-[11px] font-bold text-gray-400 mt-0.5">{isDemo ? 'Demo' : 'Total'}</p>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-4">
        {(hasGenderData ? chartData : [
          { name: 'Boys', value: apiData?.boys ?? 0, color: '#1a365d' },
          { name: 'Girls', value: apiData?.girls ?? 0, color: '#fbcfe8' },
        ]).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-[3px] ${index === 0 ? 'bg-[#1a365d]' : 'bg-[#fbcfe8]'}`}></div>
            <span className="text-[13px] font-bold text-gray-400">
              {item.name}: <span className="text-primary-blue font-extrabold">{item.value.toLocaleString()}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderChart;
