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
  const clickable = typeof onClick === 'function' && !isLocked;

  return (
    <section
      onClick={clickable ? onClick : undefined}
      className={`relative transition-all duration-300 ${
        isLocked ? 'opacity-40' : 'opacity-100'
      } ${clickable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start gap-8">

        {/* STEP INDICATOR */}
        <div className="flex flex-col items-center pt-1">

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

          {!hideDivider && (
            <div className="w-px flex-1 bg-outline-variant/60 min-h-[50px]" />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 pb-14">

          <div className="flex items-center gap-3 mb-6">

            <h2 className="text-headline-sm font-bold text-on-surface tracking-tight uppercase">
              {title}
            </h2>

            {isCompleted && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Completed
              </span>
            )}

            {isLocked && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  lock
                </span>
                Locked
              </span>
            )}

            {isActive && !isCompleted && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Active
              </span>
            )}

          </div>

          <div className="transition-all duration-300">
            {children}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StepContainer;