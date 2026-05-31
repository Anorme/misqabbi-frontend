import { createElement } from 'react';

const variantClasses = {
  ghost: 'border-msq-purple-rich text-msq-purple-rich before:bg-msq-purple-rich hover:text-white',
};

const Button = ({ as = 'button', variant = 'ghost', className = '', children, ...props }) => {
  const baseClasses =
    'relative inline-flex items-center justify-center overflow-hidden border rounded-none cursor-pointer transition-colors duration-300 before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-0 before:transition-all before:duration-300 before:ease-out hover:before:w-full';
  const contentClasses = 'relative z-10';

  return createElement(
    as,
    {
      className: `${baseClasses} ${variantClasses[variant] || ''} ${className}`,
      ...props,
    },
    <span className={contentClasses}>{children}</span>
  );
};

export default Button;
