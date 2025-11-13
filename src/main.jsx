import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

import App from './App.jsx';
import { AuthProvider } from './contexts/auth/AuthProvider.jsx';
import { CatalogProvider } from './contexts/catalog/CatalogProvider.jsx';
import { CartProvider } from './contexts/cart/CartProvider.jsx';
import AuthInterceptorProvider from './components/auth/AuthInterceptorProvider.jsx';

import './index.css';
import './styles/tailwind.css';

// Lazy load ToastContainer since it's not critical for initial render
const ToastContainer = lazy(() =>
  import('react-toastify').then(module => ({ default: module.ToastContainer }))
);

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
          <CatalogProvider>
            <CartProvider>
              <Router>
                <AuthInterceptorProvider>
                  <App />
                </AuthInterceptorProvider>
              </Router>
              <Suspense fallback={null}>
                <ToastContainer theme={undefined} autoClose={3000} />
              </Suspense>
            </CartProvider>
          </CatalogProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
