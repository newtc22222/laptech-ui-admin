import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { createLocalStorage } from '../utils/createStorage';

function AuthRoutes() {
  const location = useLocation();
  const storage = createLocalStorage('laptech');
  const user = storage.get('user');
  const timeout = Number(storage.get('maxAgeToken'));

  // user not exist or refresh token out of date
  // check and auto logout, then navigate to login
  if (!user || timeout < Date.now()) {
    storage.remove('user');
    storage.remove('accessToken');
    storage.remove('refreshToken');
    storage.remove('maxAgeToken');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default AuthRoutes;
