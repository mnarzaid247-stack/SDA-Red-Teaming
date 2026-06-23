import React from 'react';
import ReportCard from './ReportCard.jsx';

const attackIcons = {
  'Prompt Injection': 'security',
  'Jailbreak': 'lock_open',
  'Data Leakage': 'data_loss_prevention',
  'Unsafe Output': 'warning',
  'Hallucination': 'psychology',
};

const ReportGrid = ({ reports = [] }) => {
  const groupedReports = reports.reduce((acc, report) => {
    const attackTypes = Array.isArray(report.selected_attack_types)
      ? report.selected_attack_types
      : (report.selected_attack_types || '').split(',');

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

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Object.entries(groupedReports).map(([attackType, data]) => (
        <ReportCard
          key={attackType}
          attackType={attackType} // هنا الإيرور لذلك عدلته لك
          reportsCount={data.count}
          icon={attackIcons[attackType] || 'description'}
        />
      ))}
    </section>
  );
};

export default ReportGrid;