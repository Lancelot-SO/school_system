import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const OnboardingHeader = () => {
  const location = useLocation();
  const isStep1 = location.pathname.includes('school-details');

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-8 md:px-12 sticky top-0 z-50 w-full justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <GraduationCap size={24} />
        </div>
        <h1 className="text-xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
          The Digital Institution
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {!isStep1 && (
          <>
            <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-blue-700 transition-colors">Dashboard</Link>
            <Link to="/courses" className="text-sm font-semibold text-slate-500 hover:text-blue-700 transition-colors">Courses</Link>
            <Link to="/admissions" className="text-sm font-semibold text-blue-700 transition-colors">Admissions</Link>
          </>
        )}
        <button className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
          Skip
        </button>
      </nav>
    </header>
  );
};

export default OnboardingHeader;
