import React from 'react';

const InitializeButton = ({ onLogin, onGuest, isLoading = false, isComplete = false }) => {
  return (
    <>
      <style>{`
        @keyframes cursorBlink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .custom-cursor-blink {
          animation: cursorBlink 1s step-end infinite;
        }
      `}</style>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">

        {/* INDIVIDUALS BUTTON (أفراد) */}
        <button
          onClick={onLogin} // يمكنك تعديل الدالة المستدعاة هنا حسب الرغبة
          disabled={isLoading || isComplete}
          className="group relative flex items-center justify-center px-7 py-3.5 bg-[#171b26]/50 border border-[#353944] hover:border-[#10b981] transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
        >
          <div className="flex items-center space-x-2 font-mono text-sm md:text-base text-white/90">
            <span className="text-[#10b981]">&gt;</span>

            <span className="tracking-wide">
              {isLoading ? 'Initializing...' : 'Individuals'}
            </span>

            <span className="inline-block w-2 h-4 bg-[#10b981] custom-cursor-blink"></span>
          </div>

          <div className="absolute inset-0 bg-[#10b981]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </button>

        {/* CORPORATE BUTTON (شركات) */}
        <button
          onClick={onGuest} // ربطته بـ onGuest أو يمكنك تغييره لدالة أخرى مخصصة للشركات
          disabled={isLoading || isComplete}
          className="group relative flex items-center justify-center px-7 py-3.5 bg-[#171b26]/50 border border-[#353944] hover:border-[#10b981] transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
        >
          <div className="flex items-center space-x-2 font-mono text-sm md:text-base text-white/90">
            <span className="text-[#10b981]">&gt;</span>

            <span className="tracking-wide">
              {isLoading ? 'Initializing...' : 'Corporate'}
            </span>

            <span className="inline-block w-2 h-4 bg-[#10b981] custom-cursor-blink"></span>
          </div>

          <div className="absolute inset-0 bg-[#10b981]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </button>

      </div>
    </>
  );
};

export default InitializeButton;