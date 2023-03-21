import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux-feature/store';

import AppProvider from './context/AppContext';
import AppLayout from './layout/AppLayout';
import {
  About,
  Banner,
  BrandPage,
  Category,
  Discount,
  DashBoard,
  FAQ,
  Feature,
  Invoice,
  Label,
  Login,
  Notification,
  PageNotFound,
  Pricing,
  ProductPage,
  Statistic,
  Setting,
  Role,
  User
} from './pages';

import './styles/css/laptech.css';

/**
 * @since 2022-12-23
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<DashBoard />} />
      {/* MAIN */}
      <Route path="auth/login" element={<Login />} />
      <Route path="role" element={<Role />} />
      <Route path="user" element={<User />} />
      <Route path="notification" element={<Notification />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="banner" element={<Banner />} />
      <Route path="brand" element={<BrandPage />} />
      <Route path="category" element={<Category />} />
      <Route path="discount" element={<Discount />} />
      <Route path="label" element={<Label />} />
      <Route path="invoice" element={<Invoice />} />
      <Route path="statistic" element={<Statistic />} />
      {/* Extra */}
      <Route path="about" element={<About />} />
      <Route path="setting" element={<Setting />} />
      <Route path="faqs" element={<FAQ />} />
      <Route path="features" element={<Feature />} />
      <Route path="pricing" element={<Pricing />} />
      {/* DEFAULT ERROR PAGE */}
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  );
};

export default App;
