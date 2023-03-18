import React from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ToastCustom from '../components/common/ToastCustom';

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
          <main className="col-auto col-md-9 col-lg-10 ms-sm-auto px-md-4">
            {toastList.length > 0 && (
              <ToastContainer
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
