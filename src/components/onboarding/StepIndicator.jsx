import React from 'react';

const StepIndicator = ({ currentStep, totalSteps, title }) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-[11px] font-bold text-blue-600">
          {progressPercent}%
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-out rounded-full shadow-sm" 
          style={{ width: `${progressPercent === 0 ? 3 : progressPercent}%` }}
        ></div>
      </div>
      
      <h2 className="text-[2.2rem] font-extrabold text-gray-900 tracking-tight leading-tight ml-1">
        {title}
      </h2>
    </div>
  );
};

export default StepIndicator;
