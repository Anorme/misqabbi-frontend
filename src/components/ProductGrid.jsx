import { useCatalogState } from '../contexts/catalog/useCatalog.js';

const ProductGrid = ({ children }) => {
  const { layout } = useCatalogState();

  const baseCols = layout.mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2';
  const desktopCols = layout.desktopColumns === 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-4';

  return <div className={`grid ${baseCols} ${desktopCols} gap-6`}>{children}</div>;
};

export default ProductGrid;
