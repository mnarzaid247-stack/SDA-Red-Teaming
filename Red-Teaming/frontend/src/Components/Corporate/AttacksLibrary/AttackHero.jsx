import React from 'react';

const AttackHero = ({ 
  title = "Untitled",
  description = "" 
}) => {
  return (
    <header className="max-w-4xl space-y-4">
      
      {title && (
        <h1 className="text-headline-lg font-bold tracking-tight text-primary leading-tight">
          {title}
        </h1>
      )}

      {description && (
        <p className="text-body-md text-on-surface-variant mt-1 max-w-1xl">
          {description}
        </p>
      )}

    </header>
  );
};

export default AttackHero;