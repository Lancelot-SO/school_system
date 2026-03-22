import React from 'react';

const StepIndicator = ({ currentStep, totalSteps, title }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(totalSteps)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 w-12 rounded-full transition-all duration-500 ${
              i + 1 <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
        Step {String(currentStep).padStart(2, '0')} of {String(totalSteps).padStart(2, '0')}
      </p>
      
      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
    </div>
  );
};

export default StepIndicator;
