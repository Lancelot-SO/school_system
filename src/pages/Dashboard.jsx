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
import OnboardingProgress from '../components/OnboardingProgress';
import { GraduationCap, Presentation, Contact2, Trophy } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://lumi-api.artfricastudio.com/api/dashboard', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          // Assuming typical Laravel payload wrapped in 'data' or direct object
          setData(result.data || result);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const stats = [
    { title: 'Enrolled Students', value: data?.overview?.enrolled_students ?? '1,245', icon: GraduationCap, color: 'bg-[#1a365d]', iconColor: 'text-white' },
    { title: 'Active Teachers', value: data?.overview?.active_teachers ?? '86', icon: Presentation, color: 'bg-[#fbcfe8]', iconColor: 'text-[#d81b60]' },
    { title: 'Support Staff', value: data?.overview?.support_staff ?? '34', icon: Contact2, color: 'bg-[#1a365d]', iconColor: 'text-white' },
    { title: 'Total Awards', value: data?.overview?.total_awards ?? '152', icon: Trophy, color: 'bg-[#fbcfe8]', iconColor: 'text-[#d81b60]' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 py-6 items-stretch">
      {/* Main Content Area */}
      <div className="flex-[3] flex flex-col gap-6 min-w-0">
        
        {/* Dynamic Onboarding Reminder Banner */}
        <OnboardingProgress setupData={data?.onboarding} />

        {/* Stats Grid: 4 cols on lg+, 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Grid: 2 cols on md+, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PerformanceChart data={data?.student_performance} />
          <GenderChart data={data?.students_by_gender} />
          <EarningsChart data={data?.earnings} />
          <AttendanceChart data={data?.student_attendance} />
        </div>

        {/* Notice Board - Flexible height to match sidebar */}
        <NoticeBoard className="flex-1" />

        {/* Tablet Navigation: (Calendar, Events, ToDo, Activity) below Notice Board for MD screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
            <CalendarCard />
            <UpcomingEvents data={data?.events} />
            <ToDoList data={data?.to_do_list} />
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
        <UpcomingEvents data={data?.events} />
        <ToDoList data={data?.to_do_list} />
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
