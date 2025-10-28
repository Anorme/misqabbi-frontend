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
import ScrollToTop from './components/ui/ScrollToTop';

import './App.css';
import NotFound from './components/ui/NotFound';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import PaymentCallback from './pages/PaymentCallback';

const App = () => {
  return (
    <div>
      <ScrollToTop />
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
          path="/orders/:id"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <OrderDetails />
              </AuthBoundaryModal>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <Orders />
              </AuthBoundaryModal>
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

        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/payment/callback" element={<PaymentCallback />} />

        <Route
          path="/reset-password/:userId/:token"
          element={
            <MainLayout>
              <ResetPassword />
            </MainLayout>
          }
        />

        <Route
          path="/product/:slug"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <Profile />
              </AuthBoundaryModal>
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
