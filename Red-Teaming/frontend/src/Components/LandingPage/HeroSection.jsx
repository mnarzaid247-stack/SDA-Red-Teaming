import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative z-10 text-center max-w-4xl mx-auto select-none">
  
      <div className="mb-10">
        <div className="border-t border-[#353944] pt-3 px-8 text-[11px] md:text-xs tracking-[0.3em] font-mono uppercase inline-block">
          <span className="text-[#94a3b8]">[ SYSTEM STATUS: </span>
          <span className="text-[#10b981]">OPERATIONAL</span>
          <span className="text-[#94a3b8]"> ]</span>
        </div>
      </div>

      {/* العنوان الرئيسي الضخم */}
      <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 text-white">
        VERITAS AI
      </h1>

      {/* الوصف الفرعي العريض */}
      <p className="text-[#94a3b8] text-xs md:text-sm tracking-[0.4em] font-light uppercase mb-8">
        AI Security Red Teaming Intelligence System
      </p>

      {/* صف المؤشرات الثانوية - تقليل المسافة لرفع زر الدخول */}
      <div className="flex items-center justify-center space-x-6 text-[10px] md:text-xs tracking-widest font-mono uppercase mb-10">
        <div className="flex items-center gap-2">
          <span className="text-[#94a3b8]">System Status:</span>
          <span className="text-blue-400">Online</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        <div className="text-indigo-400">Secure Environment Active</div>
      </div>

    </section>
  );
};

export default HeroSection;