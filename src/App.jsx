import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import AuthBoundaryModal from './components/auth/AuthBoundaryModal';
import ScrollToTop from './components/ui/ScrollToTop';
import PageLoader from './components/ui/PageLoader';
import AdminBoundary from './components/auth/AdminBoundary';

import './App.css';

// Critical routes - keep eager for initial load
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import NotFound from './components/ui/NotFound';

// Secondary routes
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQs = lazy(() => import('./pages/FAQs'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const OrderPolicy = lazy(() => import('./pages/OrderPolicy'));
const SizeGuide = lazy(() => import('./pages/SizeGuide'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const PaymentCallback = lazy(() => import('./pages/PaymentCallback'));

// Admin pages
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminUserDetails = lazy(() => import('./pages/admin/AdminUserDetails'));
const AdminOrderDetails = lazy(() => import('./pages/admin/AdminOrderDetails'));
const AdminDiscounts = lazy(() => import('./pages/admin/AdminDiscounts'));
const AdminDiscountDetail = lazy(() => import('./pages/admin/AdminDiscountDetail'));
const AdminDiscountNew = lazy(() => import('./pages/admin/AdminDiscountNew'));
const AdminDiscountEdit = lazy(() => import('./pages/admin/AdminDiscountEdit'));

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
                <Suspense fallback={<PageLoader />}>
                  <OrderDetails />
                </Suspense>
              </AuthBoundaryModal>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <Suspense fallback={<PageLoader />}>
                  <Orders />
                </Suspense>
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
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/contact-us"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/faqs"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <FAQs />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/return-policy"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ReturnPolicy />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/order-policy"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <OrderPolicy />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/size-guide"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <SizeGuide />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Favorites />
              </Suspense>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <Suspense fallback={<PageLoader />}>
                  <Checkout />
                </Suspense>
              </AuthBoundaryModal>
            </MainLayout>
          }
        ></Route>

        <Route
          path="/register"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            </MainLayout>
          }
        />

        <Route
          path="/auth/callback"
          element={
            <Suspense fallback={<PageLoader />}>
              <AuthCallback />
            </Suspense>
          }
        />
        <Route
          path="/payment/callback"
          element={
            <Suspense fallback={<PageLoader />}>
              <PaymentCallback />
            </Suspense>
          }
        />

        <Route
          path="/reset-password/:userId/:token"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ResetPassword />
              </Suspense>
            </MainLayout>
          }
        />

        <Route
          path="/product/:slug"
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ProductDetails />
              </Suspense>
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <AuthBoundaryModal>
                <Suspense fallback={<PageLoader />}>
                  <Profile />
                </Suspense>
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
                <Suspense fallback={<PageLoader />}>
                  <AdminLayout />
                </Suspense>
              </AdminBoundary>
            </AuthBoundaryModal>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminProducts />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminOrders />
              </Suspense>
            }
          />
          <Route
            path="orders/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminOrderDetails />
              </Suspense>
            }
          />
          <Route
            path="discounts"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminDiscounts />
              </Suspense>
            }
          />
          <Route
            path="discounts/new"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminDiscountNew />
              </Suspense>
            }
          />
          <Route
            path="discounts/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminDiscountDetail />
              </Suspense>
            }
          />
          <Route
            path="discounts/:id/edit"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminDiscountEdit />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminUsers />
              </Suspense>
            }
          />
          <Route
            path="users/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminUserDetails />
              </Suspense>
            }
          />
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
