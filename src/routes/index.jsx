import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import { PageNotFound } from '../components/common';
import {
  About,
  Banner,
  BrandPage,
  Category,
  Discount,
  DashBoard,
  FAQ,
  Feature,
  ImportPage,
  OrderPage,
  ViewPage,
  Label,
  Login,
  Notification,
  Pricing,
  ProductPage,
  ProductExperiences,
  Statistic,
  Setting,
  Role,
  User
} from '../pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="auth/login" element={<Login />} />
      <Route element={<AuthRoutes />}>
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<FAQ />} />
        <Route path="features" element={<Feature />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
        {/* MAIN */}
        <Route path="" element={<DashBoard />} />
        <Route path="home" element={<DashBoard />} />
        <Route path="role" element={<Role />} />
        <Route path="user" element={<User />} />
        <Route path="notification" element={<Notification />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="product-experiences" element={<ProductExperiences />} />
        <Route path="banner" element={<Banner />} />
        <Route path="brand" element={<BrandPage />} />
        <Route path="category" element={<Category />} />
        <Route path="discount" element={<Discount />} />
        <Route path="label" element={<Label />} />
        <Route path="invoice">
          <Route path="import" element={<ImportPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="" element={<ViewPage />} />
        </Route>
        <Route path="setting" element={<Setting />} />
        <Route path="statistic">
          <Route path="income" element={<Statistic />} />
          <Route path="product" element={<Statistic />} />
          <Route path="customer" element={<Statistic />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
