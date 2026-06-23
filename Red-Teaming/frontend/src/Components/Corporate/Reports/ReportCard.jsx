import React from 'react';
import { Link } from 'react-router-dom';

const ReportCard = ({
  attackType,
  reportsCount,
  icon = 'description'
}) => {
  // نمرر الاسم الأصلي مشفراً للحفاظ على الفراغات وحالة الأحرف كما هي في قاعدة البيانات
  const secureUrl = `/reports/attack/${encodeURIComponent(attackType)}`;

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
      "
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />

      <span className="material-symbols-outlined text-primary text-[22px] mb-6 block">
        {icon}
      </span>

      <h3 className="text-sm uppercase tracking-widest text-on-surface-variant mb-4">
        {attackType}
      </h3>

      <div className="mb-6">
        <p className="text-4xl font-black text-on-surface">
          {reportsCount}
        </p>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">
          Reports
        </p>
      </div>

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