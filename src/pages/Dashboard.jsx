import React from 'react';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/Charts/PerformanceChart';
import EarningsChart from '../components/Charts/EarningsChart';
import GenderChart from '../components/Charts/GenderChart';
import AttendanceChart from '../components/Charts/AttendanceChart';
import ToDoList from '../components/ToDoList';
import NoticeBoard from '../components/NoticeBoard';
import RecentActivity from '../components/RecentActivity';
import UpcomingEvents from '../components/UpcomingEvents';
import Footer from '../components/Footer';
import CalendarCard from '../components/CalendarCard';
import { GraduationCap, Presentation, Contact2, Trophy } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Enrolled Students', value: '1,245', icon: GraduationCap, color: 'bg-[#1a365d]', iconColor: 'text-white' },
    { title: 'Active Teachers', value: '86', icon: Presentation, color: 'bg-[#fbcfe8]', iconColor: 'text-[#d81b60]' },
    { title: 'Support Staff', value: '34', icon: Contact2, color: 'bg-[#1a365d]', iconColor: 'text-white' },
    { title: 'Total Awards', value: '152', icon: Trophy, color: 'bg-[#fbcfe8]', iconColor: 'text-[#d81b60]' },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-6 py-6 items-stretch">
      {/* Main Content Area */}
      <div className="flex-[3] flex flex-col gap-6 min-w-0">
        {/* Stats Grid: 4 cols on lg+, 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Grid: 2 cols on md+, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PerformanceChart />
          <GenderChart />
          <EarningsChart />
          <AttendanceChart />
        </div>

        {/* Notice Board - Flexible height to match sidebar */}
        <NoticeBoard className="flex-1" />

        {/* Tablet Navigation: (Calendar, Events, ToDo, Activity) below Notice Board for MD screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
            <CalendarCard />
            <UpcomingEvents />
            <ToDoList />
            <RecentActivity />
        </div>

        {/* Desktop Footer (at the very bottom of the main content column) */}
        <div className="hidden xl:block mt-auto pt-6 border-t border-gray-50">
           <Footer />
        </div>
      </div>

      {/* Right Sidebar: (Desktop only) */}
      <div className="flex-1 hidden xl:flex flex-col gap-6 min-w-[320px]">
        <CalendarCard />
        <UpcomingEvents />
        <ToDoList />
        <RecentActivity className="flex-1" />
      </div>

      {/* Mobile/Tablet Footer */}
      <div className="xl:hidden">
          <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
