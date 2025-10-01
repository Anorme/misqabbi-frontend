import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import { setSearchParams } from '../contexts/catalog/catalogActions';

export default function useCategorySelection() {
  const { searchParams } = useCatalogState();
  const dispatch = useCatalogDispatch();

  const selectedCategory = searchParams.category || '';

  const selectCategory = categoryValue => {
    // Update search params with new category
    dispatch(
      setSearchParams({
        ...searchParams,
        category: categoryValue,
      })
    );
  };

  const clearCategory = () => {
    // Remove category from search params
    const { category: _category, ...otherParams } = searchParams;
    dispatch(setSearchParams(otherParams));
  };

  return {
    selectedCategory,
    selectCategory,
    clearCategory,
  };
}
