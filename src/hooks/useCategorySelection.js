import { useLocation, useParams } from 'react-router';

export default function useCategorySelection() {
  const location = useLocation();
  const params = useParams();

  // Get selected category from route if on category page
  // Category dropdown handles navigation directly via useNavigate
  const isCategoryPage = location.pathname.startsWith('/category/');
  const selectedCategory = isCategoryPage ? params.category || '' : '';

  return {
    selectedCategory,
  };
}
