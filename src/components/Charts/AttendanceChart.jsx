import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { name: 'Mon', attendance: 1144, active: false },
  { name: 'Tue', attendance: 1043, active: false },
  { name: 'Wed', attendance: 933, active: false },
  { name: 'Thu', attendance: 1089, active: true },
  { name: 'Fri', attendance: 1089, active: false },
];

const AttendanceChart = () => {
  const renderCustomBar = (props) => {
    const { x, y, width, height, active } = props;
    const radius = 6;
    const bgHeight = 160; // Fixed visual height for the shadow bar
    const bgY = 40; // Top offset for shadow bars

    return (
      <g>
        {/* Shadow/Background Bar */}
        <rect
          x={x}
          y={bgY}
          width={width}
          height={bgHeight}
          fill="#fdf2f7"
          rx={radius}
        />
        {/* Data Bar */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={active ? '#1a365d' : '#fbcfe8'}
          rx={radius}
        />
      </g>
    );
  };

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col h-full min-h-[420px]">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-[15px] font-extrabold text-[#1a365d]">Student Attendance</h3>
        <div className="flex items-center gap-2">
          <select className="bg-[#dcf0f4] border-none text-[13px] font-bold text-primary-blue rounded-xl px-4 py-2 focus:ring-1 focus:ring-primary-pink/20 outline-none cursor-pointer border-transparent transition-all">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: -40, bottom: 0 }}>
            <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} 
            dy={10}
          />
            <YAxis hide domain={[0, 1500]} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="attendance" shape={(props) => renderCustomBar({ ...props, active: props.payload.active })} barSize={34}>
                 <LabelList 
                    dataKey="attendance" 
                    position="top" 
                    formatter={(val) => val.toLocaleString()}
                    style={{ fill: '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}
                    offset={10}
                />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
