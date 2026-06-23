/**
 * [ ARCHITECTURAL CONCEPT ]: Interactive SVG Line Chart mapping dual telemetry tracking vectors.
 * [ PROPS ]: Self-contained analytical container rendering continuous time-series resilience data.
 */

import React, { useState } from 'react';

// Static timeline labels mapping 7-day operational cycles
const days = ['MON 01','TUE 02','WED 03','THU 04','FRI 05','SAT 06','SUN 07'];

const ResilienceTrend = () => {
  // 1. STATE CONFIG: Tracks real-time mouse position data matrices for live tooltips
  const [tooltip, setTooltip] = useState(null);

  // 2. DATA MATRIX: Baseline coordinate mapping pairs matching X axis scales to percentage bounds
  const data = [
    { x: 0, defense: 70, attack: 30 },
    { x: 166, defense: 68, attack: 32 },
    { x: 332, defense: 75, attack: 25 },
    { x: 498, defense: 72, attack: 28 },
    { x: 664, defense: 80, attack: 20 },
    { x: 830, defense: 88, attack: 12 },
    { x: 1000, defense: 85, attack: 15 },
  ];

  // 3. CALCULATION PIPELINE: Discovers nearest vector point on mouse movement across viewport bounding box
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;

    const nearest = data.reduce((prev, curr) =>
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev);

    setTooltip({
      x: nearest.x,
      defense: nearest.defense,
      attack: nearest.attack,
      mouseX: e.clientX - rect.left,
      mouseY: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="
        xl:col-span-3
        bg-surface-container-low
        border border-outline-variant/60
        rounded-3xl
        p-10
        relative
        overflow-hidden
        shadow-[0_0_40px_rgba(0,0,0,0.08)]">

      {/* NODE: Component Header & Legend Info */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 relative z-10">

        <div>
          <h3 className="font-headline-lg text-on-surface mb-2">
            Security Resilience Trend
          </h3>
          <p className="text-body-md text-on-surface-variant">
            Model robustness analysis over the last 7 cycles.
          </p>
        </div>

        {/* LEGEND MAP */}
        <div className="flex gap-8">

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#4edea3]" />
            <span className="text-label-caps uppercase text-on-surface">
              Defense Neutralization
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-error shadow-[0_0_10px_#ffb4ab]" />
            <span className="text-label-caps uppercase text-on-surface">
              Attack Success Rate
            </span>
          </div>

        </div>
      </div>

      {/* NODE: Core Visualization Engine Container */}
      <div className="relative h-[450px] w-full mt-8 flex">

        {/* Y AXIS STEPS */}
        <div className="flex flex-col justify-between text-[10px] text-on-surface-variant pr-4 pb-8 opacity-60 font-label-caps">
          <span>100%</span>
          <span>80%</span>
          <span>60%</span>
          <span>40%</span>
          <span>20%</span>
          <span>0%</span>
        </div>

        <div
          className="flex-1 relative"
          onMouseMove={handleMove}
          onMouseLeave={() => setTooltip(null)}>

          {/* BACKGROUND CHART GRID LINES */}
          <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-full border-t ${
                  i === 5
                    ? 'border-outline-variant/40'
                    : 'border-dotted border-outline-variant/20'
                }`}/>
            ))}
          </div>

          {/* INTERACTIVE SVG GRID: Dynamic Paths and Gradient Geometry Mapping */}
          <svg
            viewBox="0 0 1000 400"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none" >

            <defs>
              <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4edea3" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffb4ab" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* PATH: Attack Threat Mapping (Red Vector) */}
            <path
              d="M0,200 L166,220 L332,180 L498,240 L664,280 L830,300 L1000,320"
              fill="none"
              stroke="#ffb4ab"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_6px_rgba(255,180,171,0.4)]"
            />

            <path
              d="M0,200 L166,220 L332,180 L498,240 L664,280 L830,300 L1000,320 V400 H0 Z"
              fill="url(#redGradient)"
            />

            {/* PATH: Defense Robustness Mapping (Green Vector) */}
            <path
              d="M0,350 L166,320 L332,280 L498,300 L664,240 L830,120 L1000,80"
              fill="none"
              stroke="#4edea3"
              strokeWidth="3"
              className="drop-shadow-[0_0_10px_rgba(78,222,163,0.45)]"
            />

            <path
              d="M0,350 L166,320 L332,280 L498,300 L664,240 L830,120 L1000,80 V400 H0 Z"
              fill="url(#greenGradient)"
            />

            {/* ANCHORS: Critical Peak Plot Points */}
            <circle cx="830" cy="120" r="6" fill="#4edea3" />
            <circle cx="830" cy="300" r="4" fill="#ffb4ab" />

          </svg>

          {/* X AXIS LABELS */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-2 text-[10px] text-on-surface-variant opacity-80 tracking-widest font-label-caps">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* NODE: Dynamic Floating Interaction Tooltip */}
          {tooltip && (
            <div
              className="absolute bg-surface-container-high border 
              border-outline-variant/60 rounded-2xl p-4 z-20 pointer-events-none 
              backdrop-blur-md transition-all duration-150"
              style= {{left: tooltip.mouseX,
                       top: tooltip.mouseY - 80,}}>

              <div className="text-[15px] uppercase text-on-surface-variant mb-2">
                LIVE REPORT
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between gap-6">
                  <span className="text-primary">DEFENSE</span>
                  <span className="font-bold text-on-surface">{tooltip.defense}%</span>
                </div>

                <div className="flex justify-between gap-6">
                  <span className="text-error">ATTACK</span>
                  <span className="font-bold text-on-surface">{tooltip.attack}%</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ResilienceTrend;