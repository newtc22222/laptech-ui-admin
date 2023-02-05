import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';

const linkCSS = {
  normal: 'nav-link link-light align-middle px-0',
  active: 'nav-link link-light align-middle px-0 fs-5 fw-bold'
};

const Sidebar = () => {
  // Active tab
  const [isActive, setIsActive] = useState('');
  const handleActive = name => {
    setIsActive(name);
  };
  const setLinkCSS = name => {
    if (isActive === '' && name === 'home') return linkCSS.active;
    return isActive === name ? linkCSS.active : linkCSS.normal;
  };

  // Expand tab (Toggle)
  const [showToggle, setShowToggle] = useState([]);
  const handleShowToggle = name => {
    if (showToggle.includes(name)) {
      setShowToggle(prev => prev.filter(x => x !== name));
    } else {
      setShowToggle(prev => [...prev, name]);
    }
  };
  const getToggle = name => {
    return showToggle.includes(name) ? 'show' : '';
  };

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary position-fixed">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link
              to="/"
              className={setLinkCSS('home')}
              onClick={() => handleActive('home')}
            >
              <i className="fs-4 bi-house"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">Trang chủ</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/notification"
              className={setLinkCSS('notification') + ' text-warning'}
              onClick={() => handleActive('notification')}
            >
              <i className="fs-4 bi bi-bell"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">Thông báo</span>
            </Link>
          </li>
          <li>
            <Link
              className={setLinkCSS('invoice')}
              data-bs-toggle="collapse"
              data-bs-target="#invoice-collapse"
              aria-expanded="true"
              onClick={() => handleShowToggle('invoice')}
            >
              <i className="fs-4 bi-table"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">Đơn hàng</span>
            </Link>
            <div
              className={'collapse ' + getToggle('invoice')}
              id="invoice-collapse"
            >
              <ul
                className="link-toggle-nav list-unstyled fw-normal pb-1 small"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <Link
                    to="/invoice/import"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('invoice')}
                  >
                    <i className="fs-5 me-2 bi bi-box-arrow-in-down"></i>{' '}
                    <span className="d-none d-sm-inline">Đơn nhập hàng</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoice/order"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('invoice')}
                  >
                    <i className="fs-5 me-2 bi bi-box-seam"></i>{' '}
                    <span className="d-none d-sm-inline">Đơn bán hàng</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoice"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('invoice')}
                  >
                    <i className="fs-5 me-2 bi bi-boxes"></i>{' '}
                    <span className="d-none d-sm-inline">Tất cả đơn hàng</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link
              className={setLinkCSS('product')}
              data-bs-toggle="collapse"
              data-bs-target="#product-collapse"
              aria-expanded="true"
              onClick={() => handleShowToggle('product')}
            >
              <i className="fs-4 bi-grid"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">Sản phẩm</span>
            </Link>
            <div
              className={'collapse ' + getToggle('product')}
              id="product-collapse"
            >
              <ul
                className="link-toggle-nav list-unstyled fw-normal pb-1 small"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li>
                  <Link to="/brand" className="nav-link link-light px-0 ms-3">
                    <i className="fs-5 me-2 bi bi-globe"></i>{' '}
                    <span
                      className="d-none d-sm-inline"
                      onClick={() => handleActive('product')}
                    >
                      Nhãn hàng
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/category"
                    className="nav-link link-light px-0 ms-3"
                  >
                    <i className="fs-5 me-2 bi bi-list-ul"></i>{' '}
                    <span
                      className="d-none d-sm-inline"
                      onClick={() => handleActive('product')}
                    >
                      Phân loại
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/product" className="nav-link link-light px-0 ms-3">
                    <i className="fs-5 me-2 bi bi-laptop"></i>{' '}
                    <span
                      className="d-none d-sm-inline"
                      onClick={() => handleActive('product')}
                    >
                      Tất cả sản phẩm
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/statistic"
              className={setLinkCSS('statistic')}
              onClick={() => handleActive('statistic')}
            >
              <i className="fs-4 bi bi-bar-chart"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">Thống kê</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/setting"
              className={setLinkCSS('setting')}
              onClick={() => handleActive('setting')}
            >
              <i className="fs-4 bi bi-wrench-adjustable"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">
                Thiết lập ứng dụng
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/customer"
              className={setLinkCSS('customer')}
              onClick={() => handleActive('customer')}
            >
              <i className="fs-4 bi-people"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">Người dùng</span>{' '}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Sidebar);
