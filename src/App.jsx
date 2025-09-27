import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthCallback from './pages/auth/AuthCallback';
import AuthBoundaryModal from './components/auth/AuthBoundaryModal';

import './App.css';
import NotFound from './components/ui/NotFound';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/shop"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/about-us"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <MainLayout>
              <Favorites />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <Checkout />
              </AuthBoundaryModal>
            </MainLayout>
          }
        ></Route>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/product/:slug"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
