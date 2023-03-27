import React from 'react';
import { Navigate } from 'react-router-dom';

import apiRole from '../../../apis/role.api';
import { createLocalStorage } from '../../../utils/createStorage';
import { useDispatch } from 'react-redux';

/**
 * @param {{children: JSX.Element}}
 * @returns
 */
function CheckLoginTimeout({ children }) {
  const storage = createLocalStorage('laptech');
  const timeout = Number(storage.get('maxAgeToken'));

  // check and auto logout, then navigate to login
  if (timeout < Date.now()) {
    storage.remove('user');
    storage.remove('accessToken');
    storage.remove('refreshToken');
    return <Navigate to="/auth/login" />;
  }

  // // check and auto get new accessToken
  // const dispatch = useDispatch();
  // const {
  //   data: roleList,
  //   isFetching,
  //   error
  // } = apiRole.getAll(dispatch, storage.get('accessToken'));

  return children;
}

export default CheckLoginTimeout;
