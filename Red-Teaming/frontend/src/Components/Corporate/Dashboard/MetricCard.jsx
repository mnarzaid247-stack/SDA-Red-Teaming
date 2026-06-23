/**
 * [ ARCHITECTURAL CONCEPT ]: A reusable KPI metric card container built with strict design tokens.
 * [ PROPS / MOCK ]: Ingests dynamic telemetry parameters; fallbacks directly to enterprise cyber mock configurations.
 */
import React from 'react';

const MetricCard = ({
  title = "Vulnerability Index",
  value = "94.2%",
  description = "Real-time threat resistance rate",
  icon = "gavel",
  trend = "+4.3% from yesterday",
  trendLabel = "Stable Operational Cycle",
  accent = 'primary'
}) => {

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
    ">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">

        <div className="flex flex-col gap-1">

          <span className="text-[11px] uppercase tracking-widest text-on-surface-variant">
            {title}
          </span>

          <span className="text-[11px] text-on-surface-variant/70">
            {description}
          </span>

        </div>

        <span className={`material-symbols-outlined ${colors[accent]} text-[20px]`}>
          {icon}
        </span>

      </div>

      {/* VALUE */}
      <h2 className={`text-[34px] font-black ${colors[accent]}`}>
        {value}
      </h2>

      {/* FOOTER */}
      <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/20 pt-3">

        <span className="text-[11px] text-on-surface-variant">
          {trend}
        </span>

        <span className="text-[11px] text-primary uppercase">
          {trendLabel}
        </span>

      </div>

    </div>
  );
};

export default MetricCard;