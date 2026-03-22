import React from 'react';

const OnboardingFooter = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="h-16 border-t border-gray-100 flex items-center bg-white px-8 md:px-12 justify-between text-[11px] font-medium text-slate-400 uppercase tracking-widest">
      <p>© {year} The Digital Institution. All institutional rights reserved.</p>
      
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Security Standards</a>
      </div>
    </footer>
  );
};

export default OnboardingFooter;
