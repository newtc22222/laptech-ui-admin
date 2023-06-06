import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import AppLayout from '../components/layout/AppLayout';
import { authService } from '../services';
import { createLocalStorage } from '../utils/createStorage';

function AuthRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();

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

  const { exp } = jwtDecode(storage.get('accessToken'));
  if (exp <= Date.now() / 1000) {
    authService.refreshToken(dispatch, {
      refreshToken: storage.get('refreshToken')
    });
  }

  return <AppLayout />;
}

export default AuthRoutes;
