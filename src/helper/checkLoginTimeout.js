import React from 'react';
import { Navigate } from 'react-router-dom';
import { createLocalStorage } from './createStorage';

function checkLoginTimeout() {
  const storage = createLocalStorage('laptech');
  const timeout = Number(storage.get('maxAgeToken'));

  if (timeout < Date.now()) {
    return <Navigate to="/auth/login" />;
  }
}

export default checkLoginTimeout;
