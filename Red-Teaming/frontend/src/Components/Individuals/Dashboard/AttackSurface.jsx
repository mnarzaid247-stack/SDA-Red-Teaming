/**
 * [ architectural concept ]: Visualizes enterprise attack surface metrics via SVG Donut & Progress bars.
 * [ purpose ]: Ingests `attackDistribution` (vulnerability metrics) and `lastAttack` (timestamp telemetry).
 */

import React, { useState } from 'react';

const AttackSurface = ({
  attackDistribution = [],
  lastAttack = 'No Data'
}) => {

  // 1. STATE CONFIG: Tracks active vector on hover to pipe telemetry into center topology
  const [hovered, setHovered] = useState(null);

  // 2. DESIGN SYSTEM PALETTE: Production hex standards for core visualization
const colors = [
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#8B5CF6',
  '#06B6D4',
  '#EC4899',
];

  // 3. INGESTION PIPELINE: Normalizes raw telemetry and maps design system color tokens
  const data =
    attackDistribution.length > 0
      ? attackDistribution.map((item, index) => ({
          label: item.attack_type,
          value: item.percentage,
          count: item.successful_scenarios,
          color: colors[index % colors.length],
        }))
      : [];


  // 4. SVG GEOMETRY: Core calculations for tracking circle boundary bounds
  const size = 180;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;


  // 5. DATA MATRIX TOTAL: Ingests subset metrics for exact ratio determination
  const total = data.reduce((a, b) => a + b.value, 0);

  let offset = 0;

  // 6. THREAT EVALUATION: Extracts top threat vector sorting elements descending
  const highest =
    data.length > 0
      ? [...data].sort((a, b) => b.value - a.value)[0]
      : null;

  return (
    <div className="bg-surface-container-low border border-outline-variant/40 rounded-3xl p-8">

      {/* NODE: Component Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-headline-sm font-bold text-on-surface">
          Attack Surface
        </h3>

        <span className="material-icons text-on-surface-variant animate-pulse">
          warning
        </span>
      </div>

      {/* NODE: Interactive SVG Grid Topology */}
      <div className="flex flex-col items-center mb-10">

        <div className="relative w-[200px] h-[200px]">

          <svg
            viewBox="0 0 200 200"
            className="w-full h-full rotate-[-90deg]"
          >

            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#1f2937"
              strokeWidth={stroke}
              fill="transparent"
              opacity="0.35"
            />

            {data.map((item) => {

              const percent =
                total > 0
                  ? item.value / total
                  : 0;

              const dash = percent * circumference;

              const circle = (
                <circle
                  key={item.label}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={stroke}
                  strokeDasharray={`${dash} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                />
              );

              offset += dash;

              return circle;
            })}
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
              {hovered
                ? hovered.label
                : highest
                ? 'Highest Risk'
                : 'No Data'}
            </p>

            <p className="text-2xl font-black text-on-surface">
              {hovered
                ? `${hovered.value}%`
                : highest
                ? `${highest.value}%`
                : '0%'}
            </p>

            <p className="text-[10px] text-on-surface-variant uppercase">
              {hovered ? 'Selected' : 'Peak Exposure'}
            </p>

          </div>

        </div>

        {/* Hover Label */}
        {hovered && (
          <div className="mt-4 text-[11px] text-on-surface-variant uppercase tracking-widest">
            {hovered.label}
          </div>
        )}

      </div>

      {/* Breakdown List */}
      <div className="space-y-6">

        {data.map((item) => (
          <div key={item.label} className="space-y-2">

            <div className="flex justify-between items-center">

              <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface">
                {item.label}
              </span>

              <span className="text-[10px] text-on-surface-variant font-bold">
                {item.value}%
              </span>

            </div>

            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}40`,
                }}
              />
            </div>

          </div>
        ))}

      </div>

      {/* Footer */}
      <div
        className="mt-10 pt-6 border-t border-outline-variant/20 flex justify-between text-[10px] uppercase text-on-surface-variant"
      >
        <span>Last Audit</span>

        <span className="text-on-surface">
          {lastAttack}
        </span>

      </div>

    </div>
  );
};

export default AttackSurface;