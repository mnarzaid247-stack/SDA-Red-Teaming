/**
 * [ architectural concept ]: presentation utility module engineered for sequential taxonomy micro-tag displays.
 * [ purpose ]: standardizes the visual representation of core platform capabilities by rendering flat metadata string matrices, injecting synchronized neon bullet separators, and enabling performance-focused micro-transition hover styling.
 */

import React from 'react';

// 1. DATA CONFIG: static list of high-level features for platform branding positioning
const FEATURES = [
  'AI Model Security Testing',
  'Automated Attack Simulation',
  'Real-time Risk Analysis'
];

const FeatureIndicators = () => {
  // 2. MAIN VIEWPORT RESOLUTION: responsive flexible text container mapping dynamic string tokens
  return (
    <div className="flex items-center justify-center w-full font-mono text-[10px] md:text-xs tracking-widest uppercase text-[#94a3b8]/60">
      <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2">
        
        {FEATURES.map((feature, idx) => (
          <React.Fragment key={feature}>
            
            {/* typographic token displaying static capability identifier */}
            <span className="hover:text-[#10b981] 
            transition-colors duration-300">
              {feature}
            </span>

            {/* conditional lookahead boundary to suppress trailing separation markers on final indices */}
            {idx < FEATURES.length - 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] 
              shadow-[0_0_6px_rgba(16,185,129,0.5)] mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FeatureIndicators;