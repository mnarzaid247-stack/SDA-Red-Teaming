/**
 * [ architectural concept ]: analytical data aggregator and distribution pipeline layer.
 * [ purpose ]: intercept raw flatten report arrays, dynamically reduce and parse dynamic multi-value attack taxonomy fields, and group cumulative metrics into isolated real-time summary instances via reactive navigation grid components.
 */

import React from 'react';
import ReportCard from './ReportCard.jsx';

// 1. STYLE CONFIG: taxonomy lookup matrix mapping distinct vulnerability types to system iconography
const attackIcons = {
  'Prompt Injection': 'security',
  'Jailbreak': 'lock_open',
  'Data Leakage': 'data_loss_prevention',
  'Unsafe Output': 'warning',
  'Hallucination': 'psychology',
};

const ReportGrid = ({ reports = [] }) => {
  // 2. DATA TRANSFORMATION ROUTINE: algorithmic reduce accumulator that reorganizes flat telemetry logs into nested type hashes
  const groupedReports = reports.reduce((acc, report) => {
    // normalizes incoming state fields into predictable array structures
    const attackTypes = Array.isArray(report.selected_attack_types)
      ? report.selected_attack_types
      : (report.selected_attack_types || '').split(',');

      // loops through extracted tokens to build structural hash sub-counts
    attackTypes.forEach((typeRaw) => {
      const type = typeRaw.trim();
      if (!type) return;

      if (!acc[type]) {
        acc[type] = {
          count: 0,
          items: []
        };
      }
      acc[type].count += 1;
      acc[type].items.push(report);
    });

    return acc;
  }, {});

  // 3. MAIN VIEWPORT RESOLUTION: responsive catalog matrix displaying compiled payload counters
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Object.entries(groupedReports).map(([attackType, data]) => (
        <ReportCard
          key={attackType}
          attackType={attackType} 
          reportsCount={data.count}
          icon={attackIcons[attackType] || 'description'}
        />
      ))}
    </section>
  );
};

export default ReportGrid;