import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
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
      <Route path="invoice">
        <Route path="import" element={<ImportPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="" element={<Invoice />} />
      </Route>
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

export default router;
