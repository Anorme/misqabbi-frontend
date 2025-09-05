export default function MsqButton({ label, variant = 'gold', className = '', onClick }) {
  let variantClasses = '';

  if (variant === 'gold') {
    variantClasses =
      'text-msq-gold-light border-msq-gold-light hover:bg-msq-gold-light hover:text-white';
  } else if (variant === 'purple') {
    variantClasses = 'text-msq-purple border-msq-purple hover:bg-msq-purple hover:text-white';
  } else if (variant === 'purple-deep') {
    variantClasses =
      'text-msq-purple-deep border-msq-purple-deep hover:bg-msq-purple-deep hover:text-white';
  } else if (variant === 'purple-light') {
    variantClasses =
      'text-msq-purple-light border-msq-purple-light hover:bg-msq-purple-light hover:text-white';
  } else if (variant === 'purple-rich') {
    variantClasses =
      'text-msq-purple-rich border-msq-purple-rich hover:bg-msq-purple-rich hover:text-white';
  }

  const baseClasses =
    'text-[16px] font-lato border px-5 py-3 rounded-none cursor-pointer transition';

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {label}
    </button>
  );
}
