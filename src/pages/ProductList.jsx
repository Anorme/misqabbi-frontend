import { useState, useEffect, useMemo } from 'react';

import Pagination from '../components/Pagination.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import filterProducts from '../utils/filterProducts.js';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';

import { fetchDiscoverableProducts } from '../api/products.js';
import CategoryNavigation from '../components/layout/CategoryNavigation.jsx';

const ProductList = () => {
  const { products, selectedFilter, productsPerPage, currentPage, searchParams, isSearching } =
    useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [currentPage, catalogDispatch, productsPerPage, searchParams]);

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
          <p className="flex flex-col w-full lg:ml-[3rem] mt-[3rem] lg:mt-[5rem] text-center text-lg text-gray-500">
            {isSearching ? 'Searching products...' : 'Loading products...'}
          </p>
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
