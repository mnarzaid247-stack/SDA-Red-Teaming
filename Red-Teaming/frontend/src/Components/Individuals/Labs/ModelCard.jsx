/**
 * [ architectural concept ]: presentation container engineered for unified provider intelligence selection.
 * [ purpose ]: standardizes the visualization of machine learning models by mapping distinct vendor metadata, 
 * integrating custom pseudo-radio interactive state indicators, and capturing single-target activation gestures.
 */

import React from 'react';

const ModelCard = ({ name, provider, icon, isSelected, onClick }) => {
  // 1. MAIN VIEWPORT RESOLUTION: interactive bounding box with adaptive conditional borders
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
      {/* NODE: interactive status and iconography mapping header */}
      {/* Header */}
      <div className="flex justify-between items-start mb-4">

        {/* micro-interaction color shift on contextual taxonomy icon */}
        <span className="material-symbols-outlined text-4xl text-on-surface-variant 
        group-hover:text-primary transition-colors">
          {icon}
        </span>

        {/* custom layout simulation of selection state anchor (radio behavior) */}
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

      {/* NODE: model taxonomy identity and infrastructure provider metadata */}
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