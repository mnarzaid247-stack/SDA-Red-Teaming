/**
 * [ architectural concept ]: layout orchestrator designed for sequential wizard flow containment.
 * [ purpose ]: standardizes tracking across multi-stage configurations by computing contextual states (active, completed, locked) and rendering conditional visual lines, step milestones, and interactive accessibility boundaries.
 */

import React from 'react';

const StepContainer = ({
  step,
  title,
  isActive,
  isCompleted,
  isLocked,
  children,
  hideDivider,
  onClick
}) => {

  // 1. INTERACTION CONFIG: conditional flag determination for interaction safety constraints
  const clickable = typeof onClick === 'function' && !isLocked;

  // 2. MAIN VIEWPORT RESOLUTION: localized step block wrap with interactive dynamic triggers
  return (
    <section
      onClick={clickable ? onClick : undefined}
      className={`relative transition-all duration-300 ${
        isLocked ? 'opacity-40' : 'opacity-100'
      } ${clickable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start gap-3 sm:gap-8">

        {/* NODE: progress milestone indicators - numerical state circles and pipeline connectors */}
        <div className="flex flex-col items-center pt-1">

          {/* status state mapping for localized circular nodes */}
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              font-semibold text-sm transition-all duration-300
              border
              ${
                isCompleted
                  ? 'bg-primary text-on-primary border-primary'
                  : isActive
                  ? 'bg-primary text-on-primary border-primary shadow-[0_0_10px_var(--color-primary)]'
                  : isLocked
                  ? 'bg-surface-container text-on-surface-variant border-outline-variant'
                  : 'bg-surface-container-high text-on-surface-variant border-outline-variant'
              }
            `}
          >
            {isCompleted ? (
              <span className="material-symbols-outlined text-lg">
                check
              </span>
            ) : (
              step
            )}
          </div>

          {/* linear pipeline connector linking continuous sections */}
          {!hideDivider && (
            <div className="w-px flex-1 bg-outline-variant/60 min-h-[50px]" />
          )}
        </div>

        {/* NODE: nested slot content block with descriptive metadata header */}
        <div className="flex-1 pb-14">

          {/* action header capturing current sequential identifier info and badges */}
          <div className="flex items-center gap-3 mb-6">

            <h2 className="text-lg sm:text-lg sm:text-headline-sm font-bold text-on-surface tracking-tight uppercase">
              {title}
            </h2>

            {/* validation flag badge mapping for completed pipelines */}
            {isCompleted && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Completed
              </span>
            )}

            {/* structural restriction indicator badge for safe flow enforcement */}
            {isLocked && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  lock
                </span>
                Locked
              </span>
            )}

            {/* tracking baseline indicator badge for active pipeline focus */}
            {isActive && !isCompleted && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Active
              </span>
            )}

          </div>

          {/* functional runtime slot content wrapper */}
          <div className="transition-all duration-300">
            {children}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StepContainer;