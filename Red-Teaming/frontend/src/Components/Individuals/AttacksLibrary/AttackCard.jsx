/**
 * [ architectural concept ]: presentation component designed to visualize localized attack vector intelligence.
 * [ purpose ]: renders structured metadata for specific red teaming scenarios, including risk evaluation, 
 * vulnerability descriptions, historical justification metrics, and dynamic coverage indicators.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthFolder/AuthContext.jsx';    //  لجلب صلاحية المستخدم الحالي (Admin/User)

const AttackCard = ({
  name,
  attackType,
  category,
  risk,
  riskLevel,
  description,
  whyItMatters,
  coverage,
  scenarios,
  icon
}) => {

  const { user } = useAuth(); //  سحب بيانات الصلاحية تلقائياً
  const navigate = useNavigate();

  // 1. STYLE CONFIG: dynamic tailwind variant selection mapping based on severity classification
  const riskStyle =
    riskLevel === 'critical'
      ? 'bg-error-container text-error'
      : riskLevel === 'high'
      ? 'bg-secondary-container text-secondary'
      : 'bg-tertiary-container/20 text-tertiary';

  //  دالة عند ضغط الأدمن على زر إدارة السيناريوهات
  const handleManageScenarios = () => {
  navigate(`/admin/scenarios/${attackType}`);
};

  // 2. MAIN VIEWPORT RESOLUTION: micro-interaction card structure
  return (
    <div className="
      hover:-translate-y-1
      transition-all duration-300 ease-out
      hover:shadow-[0_0_25px_rgba(78,222,163,0.18)]
      bg-surface-container-low
      border border-outline-variant
      rounded-xl
      p-8
      flex flex-col
      h-full
      relative
      overflow-hidden
      group
    ">

      {/* NODE: real-time threat severity badge */}
      <div className="absolute top-0 right-0 p-4">
        <span className={`
          px-3 py-1
          rounded-full
          text-[10px]
          font-bold
          uppercase
          tracking-wider
          ${riskStyle}
        `}>
          {risk}
        </span>
      </div>

      {/* NODE: vector identification and classification header */}
      <div className="mb-6">
        <div className="
          w-12 h-12
          bg-primary/10
          rounded-lg
          flex items-center justify-center
          mb-4
          border border-primary/20
        ">
          <span className="material-symbols-outlined text-primary text-3xl">
            {icon}
          </span>
        </div>

        <h3 className="text-headline-md font-bold text-on-surface mb-1">
          {name}
        </h3>

        <span className="text-label-caps text-primary">
          {category}
        </span>
      </div>

      {/* NODE: descriptive context encapsulation */}
      <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
        {description}
      </p>

      {/* impact contextual analysis container */}
      <div className="mt-auto space-y-4">

        <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
          <p className="text-[11px] text-on-surface-variant uppercase font-bold mb-1">
            Why it matters
          </p>
          <p className="text-xs text-on-surface/80 italic leading-relaxed">
            {whyItMatters}
          </p>
        </div>

        {/* defensive coverage and vector scenario statistics */}
        <div className="flex justify-between items-end">

          <div>
            <p className="text-xs font-bold text-on-surface-variant mb-1">
              Coverage: {coverage}%
            </p>

            <div className="w-32 h-1 bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${coverage}%` }}
              />
            </div>
          </div>

          {/* هنا الفحص الذكي والتبديل بين الزر للأدمن والنص العادي لليوزر */}
          {user?.role === 'admin' ? (
            <button 
              onClick={handleManageScenarios}
              className="
                text-xs font-bold text-primary 
                bg-primary/10 hover:bg-primary/20 
                border border-primary/30 
                px-3 py-2 rounded-lg 
                transition-all duration-200 
                active:scale-95
              "
            >
              {scenarios} Scenarios
            </button>
          ) : (
            <span className="text-xs font-bold text-primary">
              {scenarios} Scenarios
            </span>
          )}

        </div>
      </div>
    </div>
  );
};

export default AttackCard;