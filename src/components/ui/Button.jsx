import { createElement } from 'react';

const variantClasses = {
  primary:
    'border-msq-purple-rich bg-msq-purple-rich text-white hover:bg-msq-purple hover:border-msq-purple',
  primarySlide:
    'relative overflow-hidden border-msq-purple-rich text-white before:absolute before:inset-y-0 before:right-0 before:z-0 before:w-full before:bg-msq-purple-rich before:transition-all before:duration-300 before:ease-out hover:text-msq-purple-rich hover:before:w-0',
  primarySlideWhite:
    'relative overflow-hidden border-msq-purple-rich bg-msq-purple-rich text-white before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-0 before:bg-white before:transition-all before:duration-300 before:ease-out hover:text-msq-purple-rich hover:before:w-full',
  primarySlideTransparent:
    'relative overflow-hidden border-msq-purple-rich text-white before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-full before:bg-msq-purple-rich before:transition-none hover:before:w-0 hover:before:transition-all hover:before:duration-300 hover:before:ease-out',
  ghost:
    'relative overflow-hidden border-msq-purple-rich text-msq-purple-rich before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-0 before:bg-msq-purple-rich before:transition-all before:duration-300 before:ease-out hover:text-white hover:before:w-full',
};

const Button = ({ as = 'button', variant = 'primary', className = '', children, ...props }) => {
  const baseClasses =
    'inline-flex items-center justify-center border rounded-none cursor-pointer transition-all duration-300';
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
