import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import { PageNotFound, Unauthorization } from '../components/common';
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
  Label,
  Login,
  Notification,
  Pricing,
  ProductPage,
  ProductExperiences,
  Profile,
  ProductStatistic,
  ProfitStatistic,
  SystemStatistic,
  Setting,
  Role,
  User,
  ResetPassword
} from '../pages';

const AppRoute = () => {
  const { roleList } = useSelector(state => state.auth);

  return (
    <Routes>
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/reset-password" element={<ResetPassword />} />
      <Route element={<AuthRoutes />}>
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<FAQ />} />
        <Route path="features" element={<Feature />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
        {/* MAIN */}
        <Route path="" element={<DashBoard />} />
        <Route path="home" element={<DashBoard />} />
        <Route path="notification" element={<Notification />} />
        <Route path="banner" element={<Banner />} />
        <Route path="invoice">
          <Route path="import" element={<ImportPage />} />
          <Route path="order" element={<OrderPage />} />
        </Route>
        <Route path="product">
          <Route path="brand" element={<BrandPage />} />
          <Route path="category" element={<Category />} />
          <Route path="discount" element={<Discount />} />
          <Route path="label" element={<Label />} />
          <Route path="all-products" element={<ProductPage />} />
          <Route path="product-experiences" element={<ProductExperiences />} />
        </Route>
        <Route path="user">
          <Route
            path="role"
            element={
              roleList && roleList.find(role => role.name === 'ADMIN') ? (
                <Role />
              ) : (
                <Unauthorization />
              )
            }
          />
          <Route
            path="all-users"
            element={
              roleList && roleList.find(role => role.name === 'ADMIN') ? (
                <User />
              ) : (
                <Unauthorization />
              )
            }
          />
        </Route>
        <Route path="setting" element={<Setting />} />
        <Route path="profile" element={<Profile />} />
        <Route path="statistic">
          <Route path="products" element={<ProductStatistic />} />
          <Route path="profits" element={<ProfitStatistic />} />
          <Route path="system" element={<SystemStatistic />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
