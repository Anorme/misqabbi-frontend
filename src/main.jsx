import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

import App from './App.jsx';
import { AuthProvider } from './contexts/auth/AuthProvider.jsx';
import { FormProvider } from './contexts/form/FormProvider.jsx';
import { CatalogProvider } from './contexts/catalog/CatalogProvider.jsx';
import { CartProvider } from './contexts/cart/CartProvider.jsx';
import { FavoritesProvider } from './contexts/favorites/FavoritesProvider.jsx';
import AuthInterceptorProvider from './components/auth/AuthInterceptorProvider.jsx';

import './index.css';
import './styles/tailwind.css';

// Configure TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retries for faster failure feedback
      refetchOnMount: true, // Refetch on mount for fresh data
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <FormProvider>
            <CatalogProvider>
              <CartProvider>
                <FavoritesProvider>
                  <Router>
                    <AuthInterceptorProvider>
                      <App />
                    </AuthInterceptorProvider>
                  </Router>
                  <ToastContainer theme={undefined} autoClose={3000} />
                </FavoritesProvider>
              </CartProvider>
            </CatalogProvider>
          </FormProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
