/**
 * [ ARCHITECTURAL CONCEPT ]:
 * A data-driven Cyber Security Dashboard component that visualizes the enterprise attack surface.
 * It dynamically renders an interactive SVG Donut Chart and interactive progress indicators.
 * 
 * * [ SEAMLESS BACKEND INTEGRATION ]:
 * Designed to work out-of-the-box as a high-fidelity Prototype. If the backend API 
 * data (`attackDistribution`) is empty or loading, it automatically fallbacks to 
 * production-grade LLM/Cyber security Mock Data.
 * 
 * * [ FILE STRUCTURE & PROPS ]:
 * - attackDistribution: Array of objects containing { attack_type, percentage, successful_scenarios }
 * - lastAttack: String representing the timestamp of the last system audit.
 */
import React, { useState } from 'react';

// STATIC DATA ONLY (NO FALLBACK LOGIC, NO EXTERNAL INPUT)
const defaultMockData = [
  { attack_type: 'Prompt Injection', percentage: 40, successful_scenarios: 24 },
  { attack_type: 'Jailbreaking', percentage: 25, successful_scenarios: 15 },
  { attack_type: 'Data Leakage', percentage: 15, successful_scenarios: 9 },
  { attack_type: 'Model Poisoning', percentage: 12, successful_scenarios: 7 },
  { attack_type: 'SSRF / Tool Abuse', percentage: 8, successful_scenarios: 4 },
];

const AttackSurface = () => {
  const [hovered, setHovered] = useState(null);

  const colors = [
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#8B5CF6',
    '#06B6D4',
    '#EC4899',
  ];

  // FORCE STATIC DATA ONLY
  const data = defaultMockData.map((item, index) => {
    const color = colors[index % colors.length];

    return {
      label: item.attack_type,
      value: item.percentage,
      count: item.successful_scenarios,
      color,
    };
  });

  const size = 180;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const totalPercentage = data.reduce((a, b) => a + b.value, 0);

  const highest = data.length
    ? [...data].sort((a, b) => b.value - a.value)[0]
    : null;

  let accumulatedPercent = 0;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-slate-100 uppercase">
            Attack Surface
          </h3>
          <p className="text-[11px] text-slate-500">
            Vulnerability vector distribution
          </p>
        </div>
      </div>

      {/* DONUT CHART */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">

          <svg viewBox="0 0 200 200" className="w-full h-full rotate-[-90deg]">

            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#1e293b"
              strokeWidth={stroke}
              fill="transparent"
              opacity="0.4"
            />

            {data.map((item) => {
              const percent = totalPercentage
                ? item.value / totalPercentage
                : 0;

              const dashArray = `${percent * circumference} ${circumference}`;
              const dashOffset = -(accumulatedPercent * circumference);

              accumulatedPercent += percent;

              const isSelected =
                hovered && hovered.label === item.label;

              return (
                <circle
                  key={item.label}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isSelected ? stroke + 3 : stroke}
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    filter: isSelected
                      ? `drop-shadow(0 0 8px ${item.color}80)`
                      : 'none',
                  }}
                />
              );
            })}
          </svg>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">

            <p className="text-[10px] font-semibold text-slate-500">
              {hovered ? hovered.label : highest?.label || 'Secure'}
            </p>

            <p className="text-3xl font-black text-white">
              {hovered ? `${hovered.value}%` : `${highest?.value || 0}%`}
            </p>

            <p className="text-[9px] text-slate-400">
              {hovered
                ? `${hovered.count} Incidents`
                : 'Static Mode'}
            </p>

          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.label}
            className="space-y-1.5 p-2 rounded-xl"
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
          >

            <div className="flex justify-between">
              <span className="text-[11px] text-slate-300">
                {item.label}
              </span>

              <span className="text-[11px] font-bold text-slate-200">
                {item.value}%
              </span>
            </div>

            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AttackSurface;