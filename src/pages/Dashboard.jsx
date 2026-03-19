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
import Header from '../components/Header';
import CalendarCard from '../components/CalendarCard';
import { GraduationCap, Presentation, Contact2, Trophy } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f8f9fa]">
      <div className="max-w-[1600px] mx-auto">

        <div className="flex flex-col gap-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 xl:col-span-3 flex flex-col gap-6">
              {/* Dashboard Title */}
              <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-extrabold text-[#1a365d]">Dashboard</h1>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                  title="Enrolled Students"
                  value="1,245"
                  icon={GraduationCap}
                  color="bg-[#1a365d]"
                  iconColor="text-white"
                />
                <StatCard
                  title="Active Teachers"
                  value="86"
                  icon={Presentation}
                  color="bg-[#fbcfe8]"
                  iconColor="text-[#d81b60]"
                />
                <StatCard
                  title="Support Staff"
                  value="34"
                  icon={Contact2}
                  color="bg-[#1a365d]"
                  iconColor="text-white"
                />
                <StatCard
                  title="Total Awards"
                  value="152"
                  icon={Trophy}
                  color="bg-[#fbcfe8]"
                  iconColor="text-[#d81b60]"
                />
              </div>

              {/* Performance & Earnings Row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
                <PerformanceChart />
                <EarningsChart />
              </div>

              {/* Gender, Attendance & ToDo Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                <GenderChart />
                <AttendanceChart />
                <ToDoList />
              </div>

              {/* Notice Board */}
              <NoticeBoard className="flex-1" />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
              <CalendarCard />
              <UpcomingEvents />
              <RecentActivity className="flex-1" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
