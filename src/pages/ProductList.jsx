import { useState, useEffect, useMemo } from 'react';

import Pagination from '../components/Pagination.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CategoryList from '../components/CategoryList.jsx';
import FilterMenu from '../components/FilterMenu.jsx';
import filterProducts from '../utils/filterProducts.js';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';

import { fetchPaginatedProducts } from '../api/products.js';

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

  const filterOptions = ['All', 'Newest', 'Oldest', 'Popular'];
  const categories = ['Shirt', 'T-Shirt', 'Accessories', 'Jacket', 'Cap', 'Jeans'];

  return (
    <div className="h-auto">
      <h1 className="text-[#4a0579] text-2xl flex justify-self-start font-mono pl-[20px]">
        MISQABBI/ <span className="text-[#c01da8]">Shop </span>
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-center">
        <h1 className="text-[#630254] text-5xl font-sans flex justify-start ml-[140px] mt-[50px]">
          Items
        </h1>

        <CategoryList categories={categories} />

        <FilterMenu options={filterOptions} />
      </div>

      <div className="flex flex-col w-full lg:ml-[3rem] mt-[3rem] lg:mt-[5rem]">
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading products...</p>
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
      </div>
    </div>
  );
};

export default ProductList;
