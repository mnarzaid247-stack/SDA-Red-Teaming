import React from 'react';

const AttackCard = ({
  name,
  category,
  risk,
  riskLevel,
  description,
  whyItMatters,
  coverage,
  scenarios,
  icon
}) => {

  const riskStyle =
    riskLevel === 'critical'
      ? 'bg-error-container text-error'
      : riskLevel === 'high'
      ? 'bg-secondary-container text-secondary'
      : 'bg-tertiary-container/20 text-tertiary';

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

      {/* Risk badge */}
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

      {/* Icon */}
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

      {/* Description */}
      <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
        {description}
      </p>

      {/* Why it matters */}
      <div className="mt-auto space-y-4">

        <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
          <p className="text-[11px] text-on-surface-variant uppercase font-bold mb-1">
            Why it matters
          </p>
          <p className="text-xs text-on-surface/80 italic leading-relaxed">
            {whyItMatters}
          </p>
        </div>

        {/* Footer */}
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

          <span className="text-xs font-bold text-primary">
            {scenarios} Scenarios
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttackCard;