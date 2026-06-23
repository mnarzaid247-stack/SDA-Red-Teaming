import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'px-8 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center';
  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 shadow-lg shadow-primary/20',
    outline: 'border border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface',
    ghost: 'text-on-surface-variant hover:text-on-surface'
  };

  const disabledStyles = 'opacity-30 cursor-not-allowed grayscale active:scale-100';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;