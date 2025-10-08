import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import Pagination from '../components/Pagination.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import filterProducts from '../utils/filterProducts.js';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';
import { setSearchFromURL } from '../contexts/catalog/catalogActions.js';

import { fetchDiscoverableProducts } from '../api/products.js';
import CategoryNavigation from '../components/layout/CategoryNavigation.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';

const ProductList = () => {
  const { products, selectedFilter, productsPerPage, currentPage, searchParams, isSearching } =
    useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [urlSearchParams] = useSearchParams();
  const [isInitialSearchSynced, setIsInitialSearchSynced] = useState(false);

  // Initialize catalog search state from URL when /shop mounts
  useEffect(() => {
    const urlParams = {
      q: urlSearchParams.get('q') || '',
      minPrice: urlSearchParams.get('minPrice') || '',
      maxPrice: urlSearchParams.get('maxPrice') || '',
      category: urlSearchParams.get('category') || '',
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading, isInitialSearchSynced]);

  // Filter products using context's selectedFilter (only if not searching)
  const filteredProducts = useMemo(
    () => (isSearching ? products : filterProducts(products, selectedFilter)),
    [products, selectedFilter, isSearching]
  );

  const currentProducts = filteredProducts;

  return (
    <>
      <CategoryNavigation />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
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
                  {currentProducts.length} result{currentProducts.length !== 1 ? 's' : ''} found
                  {searchParams.q && ` for "${searchParams.q}"`}
                </p>
              </div>
            )}
            <ProductGrid>
              {currentProducts.map(product => (
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
