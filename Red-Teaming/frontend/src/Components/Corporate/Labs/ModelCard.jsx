import React from 'react';

const ModelCard = ({ name, provider, icon, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative luminous-border
        p-6 rounded-lg cursor-pointer
        bg-surface-container-low
        hover:bg-surface-container-high
        transition-all group
        ${isSelected ? 'border-primary ring-1 ring-primary/20' : 'border border-outline-variant'}
      `}
    >

      {/* Header */}
      <div className="flex justify-between items-start mb-4">

        {/* Icon */}
        <span className="material-symbols-outlined text-4xl text-on-surface-variant 
        group-hover:text-primary transition-colors">
          {icon}
        </span>

        {/* Radio (Steetch style) */}
        <div className={`
          w-4 h-4 rounded-full border-2 flex items-center justify-center
          border-outline-variant transition-all
          ${isSelected ? 'bg-primary border-primary' : ''}
        `}>
          {isSelected && (
            <div className="w-1.5 h-1.5 rounded-full bg-on-primary" />
          )}
        </div>

      </div>

      {/* Content */}
      <h3 className="text-headline-sm font-bold text-on-surface mb-1">
        {name}
      </h3>

      <p className="text-label-caps text-on-surface-variant uppercase tracking-widest">
        {provider}
      </p>

    </div>
  );
};

export default ModelCard;