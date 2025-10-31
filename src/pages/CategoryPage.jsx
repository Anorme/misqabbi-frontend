import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import Pagination from '../components/ui/Pagination.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import SEO from '../components/SEO';
import CategoryNavigation from '../components/layout/navigation/CategoryNavigation.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';

import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog.js';
import { setPage, setTotalPages, setProducts } from '../contexts/catalog/catalogActions.js';

import { fetchDiscoverableProducts } from '../api/products.js';
import { CATEGORIES } from '../constants/categories.js';

// Category descriptions for SEO
const CATEGORY_DESCRIPTIONS = {
  dresses:
    "Explore Misqabbi's collection of premium dresses. Elegant, soft, and uniquely crafted for her.",
  pants: 'Discover comfortable and stylish pants designed for her. Premium quality, perfect fit.',
  tops: "Shop Misqabbi's curated selection of tops. Soft fabrics, elegant designs made to empower.",
  shorts: "Browse Misqabbi's comfortable shorts collection. Perfect for casual and lounge wear.",
  skirts: 'Discover elegant skirts designed for her. Premium fabrics, timeless style.',
  dungarees: "Shop Misqabbi's dungarees. Modern style with premium comfort.",
};

const CategoryPage = () => {
  const { category: categoryValue } = useParams();
  const navigate = useNavigate();
  const { products, productsPerPage, currentPage, searchParams } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Find category by value
  const category = CATEGORIES.find(cat => cat.value === categoryValue);

  // Redirect to shop if category not found
  useEffect(() => {
    if (!category && categoryValue) {
      navigate('/shop', { replace: true });
    }
  }, [category, categoryValue, navigate]);

  // Fetch products for category
  useEffect(() => {
    if (!category) return;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Category comes from route param, exclude category from searchParams to ensure route value is used
        const { category: _category, ...otherSearchParams } = searchParams;
        const { data, totalPages } = await fetchDiscoverableProducts({
          page: currentPage,
          limit: productsPerPage,
          category: category.value, // Always from route param - required for API filtering
          ...otherSearchParams, // Filters (q, minPrice, maxPrice, sort)
        });
        catalogDispatch(setProducts(data));
        catalogDispatch(setPage(currentPage));
        catalogDispatch(setTotalPages(totalPages));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadProducts();
  }, [category, currentPage, catalogDispatch, productsPerPage, searchParams]);

  if (!category) {
    return null; // Will redirect
  }

  const categoryDescription =
    CATEGORY_DESCRIPTIONS[category.value] ||
    `Shop Misqabbi's collection of ${category.label.toLowerCase()}. Premium quality, uniquely crafted for her.`;

  return (
    <>
      <SEO
        title={category.label}
        description={categoryDescription}
        canonicalPath={`/category/${category.value}`}
      />
      <CategoryNavigation />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bebas text-msq-purple-rich"> {category.label}</h1>
          <p className="text-gray-600 mt-2">{categoryDescription}</p>
        </div>

        {loading ? (
          <div className="flex w-full justify-center items-center lg:ml-[3rem] mt-[3rem] lg:mt-[5rem] py-16">
            <LoadingSpinner size={100} color="#cfb484" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found in this category.</p>
              </div>
            ) : (
              <>
                <ProductGrid>
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </ProductGrid>
                <Pagination />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default CategoryPage;
