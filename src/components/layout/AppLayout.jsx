import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Header from './Header';
import Sidebar from './Sidebar';

/**
 * @since 2022-12-22
 */
function AppLayout() {
  return (
    <div className="d-flex flex-column">
      <Header />
      <ToastContainer />
      <div className="d-flex">
        <Sidebar />
        <main className="container-fluid">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
