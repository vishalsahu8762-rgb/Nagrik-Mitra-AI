import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 transition-all duration-150 ${
        hoverable ? 'hover:border-slate-300 hover:shadow-sm cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 pb-4 border-b border-slate-100 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-base font-semibold text-slate-900 tracking-normal flex items-center justify-between ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-xs sm:text-sm text-slate-500 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return <div className={`${className}`} {...props}>{children}</div>;
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
