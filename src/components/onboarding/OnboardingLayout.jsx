import React from 'react';
import OnboardingHeader from './OnboardingHeader';
import OnboardingFooter from './OnboardingFooter';

const OnboardingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-inter">
      <OnboardingHeader />
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <OnboardingFooter />
    </div>
  );
};

export default OnboardingLayout;
