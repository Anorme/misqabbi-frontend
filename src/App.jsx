import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import ReturnPolicy from './pages/ReturnPolicy';
import OrderPolicy from './pages/OrderPolicy';
import SizeGuide from './pages/SizeGuide';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import ProductList from './pages/ProductList';
import CategoryPage from './pages/CategoryPage';
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

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserDetails from './pages/admin/AdminUserDetails';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminBoundary from './components/auth/AdminBoundary';

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
          path="/category/:category"
          element={
            <MainLayout>
              <CategoryPage />
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
          path="/contact-us"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/faqs"
          element={
            <MainLayout>
              <FAQs />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/return-policy"
          element={
            <MainLayout>
              <ReturnPolicy />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/order-policy"
          element={
            <MainLayout>
              <OrderPolicy />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/size-guide"
          element={
            <MainLayout>
              <SizeGuide />
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

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AuthBoundaryModal>
              <AdminBoundary>
                <AdminLayout />
              </AdminBoundary>
            </AuthBoundaryModal>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetails />} />
        </Route>

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
