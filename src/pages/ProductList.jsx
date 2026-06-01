import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import Pagination from '../components/ui/Pagination.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import ProductGridSkeleton from '../components/products/ProductGridSkeleton.jsx';
import SEO from '../components/SEO';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';
import { setSearchFromURL } from '../contexts/catalog/catalogActions.js';

import { useProducts } from '../hooks/queries/useProducts.js';

import scrollToTop from '../utils/scrollToTop.js';

const ProductList = () => {
  const { products, productsPerPage, currentPage, searchParams, isSearching } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [urlSearchParams] = useSearchParams();

  // Initialize catalog search state from URL when /shop mounts (category handled by routes)
  useEffect(() => {
    const urlParams = {
      q: urlSearchParams.get('q') || '',
      minPrice: urlSearchParams.get('minPrice') || '',
      maxPrice: urlSearchParams.get('maxPrice') || '',
      sort: urlSearchParams.get('sort') || 'latest',
    };
    const hasAnyParam = Object.values(urlParams).some(v => v);
    if (hasAnyParam) {
      catalogDispatch(setSearchFromURL(urlParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use TanStack Query for product fetching with caching
  const {
    data: productsData,
    isLoading: loading,
    isFetching,
    isError,
    error,
  } = useProducts({
    page: currentPage,
    limit: productsPerPage,
    ...searchParams,
  });
  const isGridLoading = loading || isFetching;

  // Sync query data back to catalog context for consistency
  useEffect(() => {
    if (productsData?.data && productsData?.totalPages !== undefined) {
      catalogDispatch(setProducts(productsData.data));
      catalogDispatch(setPage(currentPage));
      catalogDispatch(setTotalPages(productsData.totalPages));
    }
  }, [productsData, currentPage, catalogDispatch]);

  // Scroll to top when loading completes (new results loaded)
  useEffect(() => {
    if (!isGridLoading && productsData) {
      scrollToTop();
    }
  }, [isGridLoading, productsData]);

  const productList = useMemo(() => {
    return products.map(product => <ProductCard key={product._id} product={product} />);
  }, [products]);

  return (
    <>
      <SEO
        title="Shop"
        description="Discover Misqabbi&rsquo;s curated lounge and casual wear. Soft, elegant, and made to empower her."
        canonicalPath="/shop"
      />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bebas text-msq-purple-rich">Made with Love, Made for You</h1>
          <p className="text-gray-600 mt-2">
            Discover our full collection of made-to-measure pieces. Each designed to help you feel
            like the main character you are.
          </p>
        </div>

        {isGridLoading ? (
          <ProductGridSkeleton />
        ) : isError ? (
          <p className="text-center text-red-500">{error?.message || 'Failed to load products'}</p>
        ) : (
          <>
            {isSearching && (
              <div className="mb-4 text-center">
                <p className="text-gray-600">
                  {products.length} result{products.length !== 1 ? 's' : ''} found
                  {searchParams.q && ` for "${searchParams.q}"`}
                </p>
              </div>
            )}
            <ProductGrid>{productList}</ProductGrid>
            <Pagination />
          </>
        )}
      </main>
    </>
  );
};

export default ProductList;
