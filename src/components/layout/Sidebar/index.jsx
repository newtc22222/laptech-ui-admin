import React, { memo } from 'react';
import classNames from 'classnames';

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
      },
      {
        name: 'product-experiences',
        title: 'Trải nghiệm sản phẩm',
        url: '/product-experiences',
        icon: <i className="fs-5 me-2 bi bi-card-checklist"></i>
      }
    ]
  },
  {
    name: 'statistic',
    title: 'Thống kê',
    icon: <i className="fs-4 bi bi-bar-chart-fill"></i>,
    subTab: [
      {
        name: 'income',
        title: 'Doanh thu',
        icon: <i className="fs-5 bi bi-graph-up"></i>,
        url: '/statistic/income'
      },
      {
        name: 'product',
        title: 'Sản phẩm',
        icon: <i className="fs-5 bi bi-pie-chart-fill"></i>,
        url: '/statistic/product'
      },
      {
        name: 'user-experiance',
        title: 'Trải nghiệm khách hàng',
        icon: <i className="fs-5 bi bi-clipboard-data-fill"></i>,
        url: '/statistic/customer'
      }
    ]
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
        name: 'all-user',
        title: 'Tất cả người dùng',
        url: '/user',
        icon: <i className="fs-4 bi bi-people"></i>
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
const Sidebar = ({ sidebarClass }) => {
  return (
    <div
      className={classNames(
        sidebarClass,
        'bg-primary add-scroll flex-shrink-0 sticky-menu'
      )}
    >
      <div className="d-flex">
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
