import React, { memo } from 'react';

import './style.css';
import TabBar from './TabBar';
import TabBarDropDown from './TabBarDropDown';

const sideBarTab = [
  {
    name: 'home',
    title: 'Trang chủ',
    url: '/',
    icon: <i className="fs-4 bi-house-fill"></i>
  },
  {
    name: 'notification',
    title: 'Thông báo',
    url: '/notification',
    icon: <i className="fs-4 bi bi-bell-fill"></i>
  },
  {
    name: 'banner',
    title: 'Bảng hiệu',
    url: '/banner',
    icon: <i className="fs-4 bi bi-badge-ad-fill"></i>
  },
  {
    name: 'invoice',
    title: 'Đơn hàng',
    icon: <i className="fs-4 bi-table"></i>,
    subTab: [
      {
        name: 'import',
        title: 'Đơn nhập hàng',
        url: '/invoice/import',
        icon: <i className="fs-5 me-2 bi bi-box-arrow-in-down"></i>
      },
      {
        name: 'order',
        title: 'Đơn bán hàng',
        url: '/invoice/order',
        icon: <i className="fs-5 me-2 bi bi-box-seam"></i>
      },
      {
        name: 'all-invoice',
        title: 'Tất cả đơn hàng',
        url: '/invoice',
        icon: <i className="fs-5 me-2 bi bi-boxes"></i>
      }
    ]
  },
  {
    name: 'product',
    title: 'Sản phẩm',
    icon: <i className="fs-4 bi-grid-fill"></i>,
    subTab: [
      {
        name: 'brand',
        title: 'Thương hiệu',
        url: '/brand',
        icon: <i className="fs-5 me-2 bi bi-globe"></i>
      },
      {
        name: 'category',
        title: 'Phân loại',
        url: '/category',
        icon: <i className="fs-5 me-2 bi bi-list-ul"></i>
      },
      {
        name: 'discount',
        title: 'Mã chiết khấu',
        url: '/discount',
        icon: <i className="fs-5 me-2 bi bi-percent"></i>
      },
      {
        name: 'label',
        title: 'Nhãn thuộc tính',
        url: '/label',
        icon: <i className="fs-5 me-2 bi bi-tag"></i>
      },
      {
        name: 'all-product',
        title: 'Tất cả sản phẩm',
        url: '/product',
        icon: <i className="fs-5 me-2 bi bi-laptop"></i>
      }
    ]
  },
  {
    name: 'statistic',
    title: 'Thống kê',
    url: '/statistic',
    icon: <i className="fs-4 bi bi-bar-chart-fill"></i>
  },
  {
    name: 'user',
    title: 'Người dùng',
    icon: <i className="fs-4 bi-person-circle"></i>,
    subTab: [
      {
        name: 'role',
        title: 'Phân quyền',
        url: '/role',
        icon: <i className="fs-5 me-2 bi bi-person-fill-lock"></i>
      },
      {
        name: 'address',
        title: 'Địa chỉ',
        url: '/address',
        icon: <i className="fs-5 me-2 bi bi-person-vcard"></i>
      },
      {
        name: 'all-user',
        title: 'Tất cả người dùng',
        url: '/user',
        icon: <i className="fs-4 bi bi-wrench-adjustable"></i>
      }
    ]
  },
  {
    name: 'setting',
    title: 'Thiết lập ứng dụng',
    url: '/setting',
    icon: <i className="fs-4 bi bi-wrench-adjustable"></i>
  }
];

/**
 * @since 2023-02-14
 */
const Sidebar = () => {
  return (
    <div className="col-auto col-md-3 col-lg-2 px-0 bg-primary position-fixed add-scroll">
      <div className="d-flex align-items-center align-items-sm-start">
        <ul className="nav flex-column flex-fill" id="menu">
          {sideBarTab.map((tab, idx) => {
            return tab.subTab ? (
              <TabBarDropDown key={idx} tab={tab} />
            ) : (
              <TabBar
                key={idx}
                name={tab.name}
                title={tab.title}
                url={tab.url}
                icon={tab.icon}
                subTab={tab.subTab}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(Sidebar);
