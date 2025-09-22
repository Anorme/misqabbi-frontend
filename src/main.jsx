import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';
import { AuthProvider } from './contexts/auth/AuthProvider.jsx';
import { FormProvider } from './contexts/form/FormProvider.jsx';
import { CatalogProvider } from './contexts/catalog/CatalogProvider.jsx';
import { CartProvider } from './contexts/cart/CartProvider.jsx';

import './index.css';
import './styles/tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FormProvider>
        <CatalogProvider>
          <CartProvider>
            <Router>
              <App />
            </Router>
            <ToastContainer theme={undefined} autoClose={3000} />
          </CartProvider>
        </CatalogProvider>
      </FormProvider>
    </AuthProvider>
  </StrictMode>
);
