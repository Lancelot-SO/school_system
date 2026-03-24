import React from 'react';

const OnboardingLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] p-4 sm:p-8 font-sans">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white/40 p-3 sm:p-4 relative">
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;
