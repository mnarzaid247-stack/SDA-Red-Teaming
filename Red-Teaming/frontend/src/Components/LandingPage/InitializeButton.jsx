/**
 * [ architectural concept ]: Dual-channel initialization trigger vector.
 * [ purpose ]: Governs access routing by bifurcating incoming session requests into specialized user tiers (Individuals vs. Corporate) while enforcing runtime lifecycle locks.
 */
import React from 'react';

const InitializeButton = ({ onLogin, onGuest, isLoading = false, isComplete = false }) => {
  return (
    <>
      {/* NOTE: Dedicated local animation declared exclusively for this component's cursor 
          to maintain self-contained modularity and avoid polluting the global configuration. */}
      <style>{`
        @keyframes cursorBlink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .custom-cursor-blink {
          animation: cursorBlink 1s step-end infinite;
        }
      `}</style>

      {/* GATEWAY CONTAINER: Responsive execution layout block */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">

        {/* B2C ACTION VECTOR: Primary routing node for independent asset operators (Individuals) */}
        <button
          onClick={onLogin} // أقدر أعدل عليه
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

        {/* B2B ACTION VECTOR: Enterprise routing node for multi-tenant organizational telemetry (Corporate) */}
        <button
          onClick={onGuest}
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