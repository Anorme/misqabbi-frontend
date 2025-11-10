import { memo } from 'react';

const StockBadge = ({ stock }) => {
  // Don't show badge if stock is greater than 5 or undefined
  if (stock === undefined || stock === null || stock > 5) {
    return null;
  }

  const isOutOfStock = stock === 0;
  const isSellingFast = stock > 0 && stock <= 5;

  // Badge styling based on stock status
  const badgeClasses = isOutOfStock
    ? 'bg-msq-purple text-white border-none'
    : 'bg-msq-gold-light text-msq-purple-rich border-none';

  const badgeText = isOutOfStock ? 'SOLD OUT' : isSellingFast && 'SELLING FAST';

  return (
    <div
      className={`absolute top-0 left-0 z-10 px-2.5 py-1 md:px-3 md:py-1.5 border-2 ${badgeClasses} shadow-lg`}
    >
      <span className="text-xs font-bebas uppercase tracking-widest">{badgeText}</span>
    </div>
  );
};

export default memo(StockBadge);
