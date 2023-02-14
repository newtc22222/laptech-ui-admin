import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const titleHome = 'Trang chủ';
const titleNotification = 'Thông báo';
const titleBanner = 'Bảng hiệu';
const titleInvoice = {
  all: 'Tất cả đơn hàng',
  default: 'Đơn hàng',
  import: 'Đơn nhập hàng',
  sell: 'Đơn bán hàng'
};
const titleProduct = {
  all: 'Tất cả sản phẩm',
  default: 'Sản phẩm',
  label: 'Nhãn thuộc tính',
  brand: 'Thương hiệu',
  category: 'Phân loại',
  discount: 'Mã chiết khấu',
  comment: 'Bình luận',
  feedback: 'Đánh giá'
};
const titleStatistic = 'Thống kê';
const titleSetting = 'Thiết lập ứng dụng';
const titleUser = {
  all: 'Tất cả người dùng',
  default: 'Người dùng',
  address: 'Địa chỉ',
  feedback: 'Đánh giá',
  role: 'Phân quyền'
};

const linkCSS = {
  normal: 'nav-link link-light align-middle px-0',
  active: 'nav-link link-light align-middle px-0 fs-5 fw-bold'
};

/**
 * @since 2023-02-14
 */
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
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary position-fixed add-scroll">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
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
              <i className="fs-4 bi-house-fill"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">{titleHome}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/notification"
              className={setLinkCSS('notification') + ' text-warning'}
              onClick={() => handleActive('notification')}
            >
              <i className="fs-4 bi bi-bell-fill"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">
                {titleNotification}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/banner"
              className={setLinkCSS('banner')}
              onClick={() => handleActive('banner')}
            >
              <i className="fs-4 bi bi-badge-ad-fill"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">{titleBanner}</span>
            </Link>
          </li>
          <li>
            <div
              className={setLinkCSS('invoice')}
              data-bs-toggle="collapse"
              data-bs-target="#invoice-collapse"
              aria-expanded="false"
              aria-controls="invoice-collapse"
              style={{ cursor: 'pointer' }}
              onClick={() => handleShowToggle('invoice')}
            >
              <i className="fs-4 bi-table"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">
                {titleInvoice.default}
              </span>
            </div>
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
                    <span className="d-none d-sm-inline">
                      {titleInvoice.import}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoice/order"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('invoice')}
                  >
                    <i className="fs-5 me-2 bi bi-box-seam"></i>{' '}
                    <span className="d-none d-sm-inline">
                      {titleInvoice.sell}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoice"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('invoice')}
                  >
                    <i className="fs-5 me-2 bi bi-boxes"></i>{' '}
                    <span className="d-none d-sm-inline">
                      {titleInvoice.all}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div
              className={setLinkCSS('product')}
              data-bs-toggle="collapse"
              data-bs-target="#product-collapse"
              aria-expanded="true"
              style={{ cursor: 'pointer' }}
              onClick={() => handleShowToggle('product')}
            >
              <i className="fs-4 bi-grid-fill"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">
                {titleProduct.default}
              </span>
            </div>
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
                      {titleProduct.brand}
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
                      {titleProduct.category}
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/discount"
                    className="nav-link link-light px-0 ms-3"
                  >
                    <i className="fs-5 me-2 bi bi-percent"></i>{' '}
                    <span
                      className="d-none d-sm-inline"
                      onClick={() => handleActive('product')}
                    >
                      {titleProduct.discount}
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/label" className="nav-link link-light px-0 ms-3">
                    <i className="fs-5 me-2 bi bi-tag"></i>{' '}
                    <span
                      className="d-none d-sm-inline"
                      onClick={() => handleActive('product')}
                    >
                      {titleProduct.label}
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
                      {titleProduct.all}
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
              <i className="fs-4 bi bi-bar-chart-fill"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">{titleStatistic}</span>
            </Link>
          </li>
          <li>
            <Link
              className={setLinkCSS('customer')}
              data-bs-toggle="collapse"
              data-bs-target="#customer-collapse"
              aria-expanded="true"
              onClick={() => handleShowToggle('customer')}
            >
              <i className="fs-4 bi-person-circle"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">
                {titleUser.default}
              </span>
            </Link>
            <div
              className={'collapse ' + getToggle('customer')}
              id="customer-collapse"
            >
              <ul
                className="link-toggle-nav list-unstyled fw-normal pb-1 small"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <Link
                    to="/role"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('customer')}
                  >
                    <i className="fs-5 me-2 bi bi-person-fill-lock"></i>{' '}
                    <span className="d-none d-sm-inline">{titleUser.role}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer/:id/address"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('customer')}
                  >
                    <i className="fs-5 me-2 bi bi-person-vcard"></i>{' '}
                    <span className="d-none d-sm-inline">
                      {titleUser.address}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer"
                    className="nav-link link-light px-0 ms-3"
                    onClick={() => handleActive('customer')}
                  >
                    <i className="fs-5 me-2 bi bi-people-fill"></i>{' '}
                    <span className="d-none d-sm-inline">{titleUser.all}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/setting"
              className={setLinkCSS('setting')}
              onClick={() => handleActive('setting')}
            >
              <i className="fs-4 bi bi-wrench-adjustable"></i>{' '}
              <span className="ms-1 d-none d-sm-inline">{titleSetting}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Sidebar);
