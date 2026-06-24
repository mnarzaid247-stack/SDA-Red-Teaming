/**
 * [ architectural concept ]: Primary identity presentation layer serving as the root interface gateway.
 * [ purpose ]: Establishes the core branding vectors, system telemetry indicators, and system deployment status definitions for the AI Security framework.
 */
import React from 'react';

const HeroSection = () => {

  // 1. ANCHOR VIEWPORT NODE: Centralized layout alignment utilizing absolute user-interaction dampening (select-none)
  return (
    <section className="relative z-10 text-center max-w-4xl mx-auto select-none">
      
      {/* 2. OPERATIONAL TELEMETRY: System state verification micro-banner */}
      <div className="mb-10">
        <div className="border-t border-[#353944] pt-3 px-8 text-[11px] md:text-xs tracking-[0.3em] font-mono uppercase inline-block">
          <span className="text-[#94a3b8]">[ SYSTEM STATUS: </span>
          <span className="text-[#10b981]">OPERATIONAL</span>
          <span className="text-[#94a3b8]"> ]</span>
        </div>
      </div>

      {/* 3. CORE BRAND VECTOR: High-impact typography defining the primary platform moniker */}
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4 text-white">
        VERITAS AI
      </h1>

      {/* 4. DOMAIN SPECIFICATION SUBTEXT: Extended spacing tracking to emphasize the system's defensive security scope */} 
     <p className="text-[#94a3b8] text-[10px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.3em] md:tracking-[0.4em] font-light uppercase mb-8 px-2">
        AI Security Red Teaming Intelligence System
      </p>

      {/* 5. LIVE ENVIRONMENT METRICS: Status nodes tracking connectivity and runtime integrity */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] md:text-xs tracking-widest font-mono uppercase mb-10">
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