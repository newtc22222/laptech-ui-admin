import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';

/**
 * @since 2022-12-22
 */
function AppLayout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <Sidebar sidebarClass={'col-auto col-lg-2 px-0'} />
          <main className="col-auto col-sm-10 col-lg-10 container-md">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
