import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
import AuthRoutes from './AuthRoutes';
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
  ImportPage,
  OrderPage,
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
} from '../pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      {/* PUBLIC */}
      <Route path="auth/login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="setting" element={<Setting />} />
      <Route path="faqs" element={<FAQ />} />
      <Route path="features" element={<Feature />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="/*" element={<PageNotFound />} />
      {/* PRIVATE */}
      <Route element={<AuthRoutes />}>
        <Route path="" element={<DashBoard />} />
        <Route path="home" element={<DashBoard />} />
        <Route path="role" element={<Role />} />
        <Route path="user" element={<User />} />
        <Route path="notification" element={<Notification />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="banner" element={<Banner />} />
        <Route path="brand" element={<BrandPage />} />
        <Route path="category" element={<Category />} />
        <Route path="discount" element={<Discount />} />
        <Route path="label" element={<Label />} />
        <Route path="invoice">
          <Route path="import" element={<ImportPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="" element={<Invoice />} />
        </Route>
        <Route path="statistic" element={<Statistic />} />
      </Route>
    </Route>
  )
);

export default router;
