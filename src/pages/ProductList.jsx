import { useState, useEffect, useMemo } from 'react';

import Pagination from '../components/Pagination.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import filterProducts from '../utils/filterProducts.js';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';

import { fetchPaginatedProducts } from '../api/products.js';
import CategoryNavigation from '../components/layout/CategoryNavigation.jsx';

const ProductList = () => {
  const { products, selectedFilter, productsPerPage, currentPage } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data, totalPages } = await fetchPaginatedProducts(currentPage, productsPerPage);
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
  }, [currentPage, catalogDispatch, productsPerPage]);

  // Filter products using context's selectedFilter
  const filteredProducts = useMemo(
    () => filterProducts(products, selectedFilter),
    [products, selectedFilter]
  );

  const currentProducts = filteredProducts;

  return (
    <>
      <CategoryNavigation />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p className="flex flex-col w-full lg:ml-[3rem] mt-[3rem] lg:mt-[5rem] text-center text-lg text-gray-500">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
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
