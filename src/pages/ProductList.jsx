import useProducts from "./useProducts.jsx";
import { useMemo } from "react";
import Pagination from "../components/Pagination.jsx"; 
import ProductGrid from "../components/ProductGrid.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryList from "../components/CategoryList.jsx";
import FilterMenu from "../components/FilterMenu.jsx";
import filterProducts from "./FilterProducts.jsx";
import { useCatalog } from "../contexts/catalog/useCatalog.jsx";


const ProductList = () => {
  const { state, setFilter, setPage } = useCatalog();
  const { selectedFilter, currentPage, productsPerPage } = state;

  const { products, loading, error } = useProducts();

  // Filter products using context's selectedFilter
  const filteredProducts = useMemo(
    () => filterProducts(products, selectedFilter),
    [products, selectedFilter]
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Handlers now update context instead of local state
  const goToPrevious = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const filterOptions = ["All", "Newest", "Oldest", "Popular"];
  const categories = ["Shirt", "T-Shirt", "Accessories", "Jacket", "Cap", "Jeans"];

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

        <FilterMenu
          options={filterOptions}
          selected={selectedFilter}
          onChange={setFilter}
        />
      </div>

      {/* Sidebar remains unchanged */}

      <div className="flex flex-col w-full lg:ml-[3rem] mt-[3rem] lg:mt-[5rem]">
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <ProductGrid>
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
