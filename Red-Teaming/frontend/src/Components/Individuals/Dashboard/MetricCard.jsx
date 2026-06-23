/**
 * [ architectural concept ]: A reusable KPI metric card container built with strict design tokens.
 * [ purpose ]: Ingests `title`, `value`, `description`, `icon`, `trend`, `trendLabel`, and theme `accent`.
 */
import React from 'react';

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendLabel,
  accent = 'primary'
}) => {

  // 1. DESIGN SYSTEM MAPPING: Pairs component theme accents with explicit utility class tokens
  const colors = {
    primary: 'text-primary',
    danger: 'text-error',
    neutral: 'text-on-surface'
  };

  return (
    <div className="
      bg-surface-container-low
      border border-outline-variant
      rounded-2xl p-6
      flex flex-col justify-between
      transition-all duration-300
      hover:-translate-y-1
      hover:bg-surface-container
      hover:shadow-[0_0_25px_rgba(78,222,163,0.10)]
    ">

      {/* NODE: Component Header */}
      <div className="flex justify-between items-start mb-3">

        <div className="flex flex-col gap-1">

          <span className="text-[11px] uppercase tracking-widest text-on-surface-variant">
            {title}
          </span>

          {description && (
            <span className="text-[11px] text-on-surface-variant/70 leading-snug">
              {description}
            </span>
          )}

        </div>

        {/* ICON */}
        <span className={`material-symbols-outlined ${colors[accent]} text-[20px]`}>
          {icon}
        </span>

      </div>

      {/* VALUE */}
      <h2 className={`text-[34px] font-black ${colors[accent]}`}>
        {value ?? '—'}
      </h2>

      {/* TREND */}
      {(trend || trendLabel) && (
        <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/20 pt-3">

          {trend && (
            <span className="text-[11px] text-on-surface-variant">
              {trend}
            </span>
          )}

          {trendLabel && (
            <span className="text-[11px] text-primary uppercase tracking-wide">
              {trendLabel}
            </span>
          )}

        </div>
      )}

    </div>
  );
};

export default MetricCard;