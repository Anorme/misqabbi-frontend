import { useCatalogState } from '../../contexts/catalog/useCatalog';
import ProductGrid from './ProductGrid';
import ProductCardSkeleton from './ProductCardSkeleton';

const getSkeletonCount = (columns, productsPerPage) => {
  return Math.min(productsPerPage, columns * 2);
};

const SkeletonGrid = ({ count }) => {
  return (
    <ProductGrid>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </ProductGrid>
  );
};

const ProductGridSkeleton = () => {
  const { layout, productsPerPage } = useCatalogState();
  const maxSkeletons = productsPerPage || 12;

  const mobileCount = getSkeletonCount(layout.mobileColumns, maxSkeletons);
  const tabletCount = getSkeletonCount(layout.tabletColumns, maxSkeletons);
  const desktopCount = getSkeletonCount(layout.desktopColumns, maxSkeletons);

  return (
    <div role="status" aria-label="Loading products" aria-live="polite">
      <div className="md:hidden">
        <SkeletonGrid count={mobileCount} />
      </div>
      <div className="hidden md:block lg:hidden">
        <SkeletonGrid count={tabletCount} />
      </div>
      <div className="hidden lg:block">
        <SkeletonGrid count={desktopCount} />
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
