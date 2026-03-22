import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2, Circle, Camera, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const OnboardingProgress = ({ setupData }) => {
  // If data is missing or all steps are completed, don't show the banner.
  if (!setupData) return null;
  
  const { has_profile, has_students, has_teachers } = setupData;
  if (has_profile && has_students && has_teachers) return null;

  // Calculate progress logic
  const steps = [
    { key: 'profile', ok: has_profile, label: 'Upload School Logo & Profile', icon: Camera, path: '/onboarding/school-details' },
    { key: 'students', ok: has_students, label: 'Import Students', icon: GraduationCap, path: '/onboarding/upload-students' },
    { key: 'teachers', ok: has_teachers, label: 'Import Teachers', icon: Briefcase, path: '/onboarding/upload-teachers' }
  ];
  
  const completedCount = steps.filter(s => s.ok).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 sm:p-8 rounded-[24px] shadow-sm border border-indigo-100 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden mb-2">
      {/* Decorative background elements blur */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -left-8 w-40 h-40 bg-purple-200/40 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex-1 relative z-10 hidden sm:block md:block">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-[12px] flex items-center justify-center shadow-md drop-shadow-sm">
            <Target className="text-white" size={20} />
          </div>
          <div>
             <h2 className="text-xl font-extrabold text-indigo-950 tracking-tight">Complete your school setup</h2>
             <p className="text-[13px] text-indigo-800/70 font-semibold">{progressPercent}% Completed • {3 - completedCount} tasks remaining</p>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full bg-white/60 h-2.5 rounded-full mt-4 overflow-hidden border border-indigo-100/50">
           <div 
             className="h-full bg-indigo-600 transition-all duration-1000 ease-out rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]" 
             style={{ width: `${progressPercent === 0 ? 3 : progressPercent}%` }} // Minimal width to show the bar dot
           ></div>
        </div>
      </div>

      {/* Mobile Title Block */}
      <div className="w-full relative z-10 flex sm:hidden items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-[12px] flex items-center justify-center shadow-md shrink-0">
            <Target className="text-white" size={20} />
          </div>
          <div className="flex flex-col leading-tight">
             <h2 className="text-[17px] font-extrabold text-indigo-950 tracking-tight">Onboarding Tracker</h2>
             <p className="text-[12px] text-indigo-800/70 font-semibold">{3 - completedCount} tasks remaining</p>
          </div>
      </div>

      <div className="flex flex-col gap-3 w-full md:w-[50%] lg:w-[45%] relative z-10">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <Link 
              key={index}
              to={step.path} 
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 group ${step.ok ? 'bg-white/50 border-transparent opacity-60 hover:opacity-80' : 'bg-white border-indigo-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:border-indigo-300 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center ${step.ok ? 'text-green-500' : 'text-gray-300'}`}>
                  {step.ok ? <CheckCircle2 size={22} className="fill-green-50" /> : <Circle size={22} />}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${step.ok ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-indigo-600 shadow-xs'}`}>
                    <StepIcon size={16} strokeWidth={2.5}/>
                  </div>
                  <span className={`text-[14px] font-bold ${step.ok ? 'text-gray-500 line-through' : 'text-indigo-950'}`}>
                    {step.label}
                  </span>
                </div>
              </div>
              {!step.ok && (
                 <ArrowRight size={16} className="text-indigo-300 group-hover:text-indigo-600 transition-colors transform group-hover:translate-x-1" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingProgress;
