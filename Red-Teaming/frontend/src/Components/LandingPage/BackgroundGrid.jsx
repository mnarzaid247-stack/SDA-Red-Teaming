/**
 * [ architectural concept ]: global structural ambient layer designed for subtle interface depth enhancement.
 * [ purpose ]: injects a low-contrast math-based coordinate system vector mesh and high-dispersion radial glowing nodes into the base canvas viewport without interrupting upstream pointer-events.
 */

import React from 'react';

const BackgroundGrid = () => {
  // 1. MAIN VIEWPORT RESOLUTION: single layout frame utilizing pseudo-elements to prevent redundant dom bloating
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* NODE: dynamic grid layer that leverages the 'after:' pseudo-element 
        to project the radial ambient glow without spawning empty html nodes
      */}
      <div 
        className="
          absolute inset-0 
          bg-[linear-gradient(to_right,theme(colors.on-background)/2%_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.on-background)/2%_1px,transparent_1px)]
          
          after:absolute after:inset-0 
          after:bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] 
          after:from-primary/4 after:via-transparent after:to-transparent
        "
        style={{ backgroundSize: '40px 40px' }}
      />
      
    </div>
  );
};

export default BackgroundGrid;