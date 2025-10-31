import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import Pagination from '../components/ui/Pagination.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import SEO from '../components/SEO';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';
import { setSearchFromURL } from '../contexts/catalog/catalogActions.js';

import { fetchDiscoverableProducts } from '../api/products.js';
import CategoryNavigation from '../components/layout/navigation/CategoryNavigation.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';

import scrollToTop from '../utils/scrollToTop.js';

const ProductList = () => {
  const { products, productsPerPage, currentPage, searchParams, isSearching } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [urlSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isInitialSearchSynced, setIsInitialSearchSynced] = useState(false);

  // Backward compatibility: redirect /shop?category=X to /category/X
  useEffect(() => {
    const categoryParam = urlSearchParams.get('category');
    if (categoryParam) {
      // Remove category from query params and redirect to category route
      const newParams = new URLSearchParams(urlSearchParams);
      newParams.delete('category');
      const remainingParams = newParams.toString();
      const redirectUrl = `/category/${categoryParam}${remainingParams ? `?${remainingParams}` : ''}`;
      navigate(redirectUrl, { replace: true });
      return;
    }
  }, [urlSearchParams, navigate]);

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
    // Mark initial sync complete (if there were params, state will update before next effect run)
    setIsInitialSearchSynced(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialSearchSynced) return;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data, totalPages } = await fetchDiscoverableProducts({
          page: currentPage,
          limit: productsPerPage,
          ...searchParams,
        });
        catalogDispatch(setProducts(data));
        catalogDispatch(setPage(currentPage));
        catalogDispatch(setTotalPages(totalPages));
        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage, catalogDispatch, productsPerPage, searchParams, isInitialSearchSynced]);

  // Scroll to top when loading completes (new results loaded)
  useEffect(() => {
    if (!loading && isInitialSearchSynced) {
      scrollToTop();
    }
  }, [loading, isInitialSearchSynced]);

  return (
    <>
      <SEO
        title="Shop"
        description="Discover Misqabbi&rsquo;s curated lounge and casual wear. Soft, elegant, and made to empower her."
        canonicalPath="/shop"
      />
      <CategoryNavigation />
      <main className="w-full px-4 sm:px-6 lg:px-8 pt-12 pb-8 lg:my-8">
        {loading ? (
          <div className="flex w-full justify-center items-center lg:ml-[3rem] mt-[3rem] lg:mt-[5rem] py-16">
            <LoadingSpinner size={100} color="#cfb484" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
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
            <ProductGrid>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ProductGrid>
            <Pagination />
          </>
        )}
      </main>
    </>
  );
};

export default ProductList;
