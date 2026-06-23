/**
 * [ architectural concept ]: presentation header component acting as the contextual entry point for attack analytics.
 * [ purpose ]: establishes visual hierarchy and immediately anchors the user's focus by rendering the localized title and operational description of the active vulnerability workspace.
 */
import React from 'react';

const AttackHero = ({ 
  title = "Untitled",
  description = "" 
}) => {

  // 1. MAIN VIEWPORT RESOLUTION: typographic structural layout for workspace identity
  return (
    <header className="max-w-4xl space-y-4">
      
      {/* NODE: dynamic title rendering for section identification */}
      {title && (
        <h1 className="text-headline-lg font-bold tracking-tight text-primary leading-tight">
          {title}
        </h1>
      )}

      {/* NODE: contextual description block for workspace scoping */}
      {description && (
        <p className="text-body-md text-on-surface-variant mt-1 max-w-1xl">
          {description}
        </p>
      )}

    </header>
  );
};

export default AttackHero;