/**
 * [ architectural concept ]: presentation navigation link tile engineered for localized summary metrics.
 * [ purpose ]: renders statistical payload tallies for target vulnerability vectors and encapsulates secure, percent-encoded dynamic routing configurations to direct single-target operational insights.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ReportCard = ({
  attackType,
  reportsCount,
  icon = 'description'
}) => {

// 1. DATA TRANSFORMATION ROUTINE: compute percent-encoded navigation paths for deep-linking isolation
const secureUrl = `/reports/attack/${encodeURIComponent(attackType)}`;

// 2. MAIN VIEWPORT RESOLUTION: compound routing block with micro-interaction hover transformations
  return (
    <Link
      to={secureUrl}
      className="
        relative overflow-hidden
        bg-surface-container-low
        border border-outline-variant
        rounded-2xl
        p-6
        cursor-pointer
        transition-all duration-300
        hover:border-primary/50
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(78,222,163,0.08)]
        group
        block
      ">
        {/* NODE: structural background filter - abstract geometry for visual accentuation */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />

        {/* NODE: taxonomy metadata rendering layout */}
      <span className="material-symbols-outlined text-primary text-[22px] mb-6 block">
        {icon}
      </span>

      <h3 className="text-sm uppercase tracking-widest text-on-surface-variant mb-4">
        {attackType}
      </h3>

      {/* NODE: statistical telemetry counter data resolution */}
      <div className="mb-6">
        <p className="text-4xl font-black text-on-surface">
          {reportsCount}
        </p>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">
          Reports
        </p>
      </div>

      {/* NODE: navigational activation call-to-action bar */}
      <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest">
        <span>View Reports</span>
        <span className="material-symbols-outlined text-[16px]">
          arrow_forward
        </span>
      </div>
    </Link>
  );
};

export default ReportCard;