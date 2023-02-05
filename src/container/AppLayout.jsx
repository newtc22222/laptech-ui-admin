import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ToastCustom from '../components/ToastCustom';
import { ToastContainer } from 'react-bootstrap';
import { useSelector } from 'react-redux';

/**
 * @since 2022-12-22
 */

function AppLayout() {
  const toastList = useSelector(state => state.toastList);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {toastList.length > 0 && (
              <ToastContainer
                // className="position-absolute top-0 end-0"
                containerPosition="fixed"
                position="top-end"
                className="p-3"
              >
                {toastList.map(props => {
                  return <ToastCustom key={props.id} props={props} />;
                })}
              </ToastContainer>
            )}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
