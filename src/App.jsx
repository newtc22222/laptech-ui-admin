import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import AppContext from './context/AppContext';
import AppLayout from './container/AppLayout';
import {
  About,
  DashBoard,
  Customer,
  FAQ,
  Feature,
  Notification,
  Pricing,
  ProductPage,
  BrandPage,
  Category,
  PageNotFound,
  Statistic,
  Login,
  Setting
} from './pages';

/**
 * @since 2022-12-23
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<DashBoard />} />
      <Route path="about" element={<About />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="setting" element={<Setting />} />
      <Route path="customer" element={<Customer />} />
      <Route path="faqs" element={<FAQ />} />
      <Route path="features" element={<Feature />} />
      <Route path="notification" element={<Notification />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="brand" element={<BrandPage />} />
      <Route path="category" element={<Category />} />
      {/* <Route path="invoice/*" element={<Receipt />} /> */}
      <Route path="statistic" element={<Statistic />} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  );
};

export default App;
