/**
 * [ architectural concept ]: global atomic reusable interface element for user interaction execution.
 * [ purpose ]: standardizes systemic action triggers by applying dynamic visual state variants, handling adaptive accessibility states, and encapsulating safe click interaction patterns across the application.
 */

import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  // 1. STYLE CONFIG: core typographical foundations and state utility classes
  const baseStyles = 'px-8 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center';
  
  // 2. STYLE CONFIG: design token matrix mapping for specific thematic variant signatures
  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 shadow-lg shadow-primary/20',
    outline: 'border border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface',
    ghost: 'text-on-surface-variant hover:text-on-surface'
  };

  // 3. STYLE CONFIG: accessibility restriction classes for disabled flow safety
  const disabledStyles = 'opacity-30 cursor-not-allowed grayscale active:scale-100';

  // 4. MAIN VIEWPORT RESOLUTION: atomic markup synthesis and attribute propagation
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {/* NODE: slotted children resolution layer */}
      {children}
    </button>
  );
};

export default Button;