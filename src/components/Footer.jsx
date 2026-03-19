import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-gray-100 px-2 pb-6">
      <p className="text-[13px] text-gray-400 font-bold mb-4 md:mb-0">
        Copyright © 2025 Peterdraw <span className="mx-2">·</span> Privacy Policy <span className="mx-2">·</span> Term and conditions <span className="mx-2">·</span> Contact
      </p>
      <div className="flex items-center gap-4 text-gray-300">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold hover:bg-primary-pink hover:text-white hover:border-primary-pink transition-all cursor-pointer">f</div>
          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold hover:bg-primary-pink hover:text-white hover:border-primary-pink transition-all cursor-pointer">𝕏</div>
          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold hover:bg-primary-pink hover:text-white hover:border-primary-pink transition-all cursor-pointer">i</div>
          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold hover:bg-primary-pink hover:text-white hover:border-primary-pink transition-all cursor-pointer">▶</div>
          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold hover:bg-primary-pink hover:text-white hover:border-primary-pink transition-all cursor-pointer">in</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
