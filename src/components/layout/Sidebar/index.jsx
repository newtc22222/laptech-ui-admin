import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Typeahead } from 'react-bootstrap-typeahead';

import TabBar from './TabBar';
import TabBarDropDown from './TabBarDropDown';

const sideBarTab = [
  {
    name: 'home',
    title: 'Trang chủ',
    url: '/home',
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
    title: 'Quản lý Đơn hàng',
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
      }
    ]
  },
  {
    name: 'product',
    title: 'Quản lý Sản phẩm',
    icon: <i className="fs-4 bi-grid-fill"></i>,
    subTab: [
      {
        name: 'brand',
        title: 'Thương hiệu',
        url: '/product/brand',
        icon: <i className="fs-5 me-2 bi bi-globe"></i>
      },
      {
        name: 'category',
        title: 'Phân loại',
        url: '/product/category',
        icon: <i className="fs-5 me-2 bi bi-list-ul"></i>
      },
      {
        name: 'discount',
        title: 'Mã chiết khấu',
        url: '/product/discount',
        icon: <i className="fs-5 me-2 bi bi-percent"></i>
      },
      {
        name: 'label',
        title: 'Nhãn thuộc tính',
        url: '/product/label',
        icon: <i className="fs-5 me-2 bi bi-tag"></i>
      },
      {
        name: 'all',
        title: 'Tất cả sản phẩm',
        url: '/product/all',
        icon: <i className="fs-5 me-2 bi bi-laptop"></i>
      },
      {
        name: 'product-experiences',
        title: 'Trải nghiệm sản phẩm',
        url: '/product/product-experiences',
        icon: <i className="fs-5 me-2 bi bi-card-checklist"></i>
      }
    ]
  },
  {
    name: 'user',
    title: 'Quản lý Người dùng',
    icon: <i className="fs-4 bi-person-circle"></i>,
    subTab: [
      {
        name: 'role',
        title: 'Phân quyền',
        url: '/user/role',
        icon: <i className="fs-5 me-2 bi bi-person-fill-lock"></i>
      },
      {
        name: 'all',
        title: 'Tất cả người dùng',
        url: '/user/all',
        icon: <i className="fs-4 bi bi-people"></i>
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
        url: '/statistic/user-experiance'
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

const searchOption = [];
sideBarTab.forEach(tab => {
  if (tab.subTab) {
    tab.subTab.map(t => {
      searchOption.push({ value: t.url, label: t.title });
    });
  } else {
    searchOption.push({ value: tab.url, label: tab.title });
  }
});

/**
 * @since 2023-02-14
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const [searchTab, setSearchTab] = useState([]);
  const handleSearchTab = tab => {
    if (tab.length > 0) {
      navigate(tab[0].value);
      setSearchTab([]);
    }
  };

  return (
    <div
      className={classNames(
        'sidebar bg-primary add-scroll flex-shrink-0 sticky-menu',
        toggle ? 'toggleOpen' : 'toggleClose'
      )}
    >
      <ul className="nav d-flex flex-column flex-fill" id="menu">
        <li className="nav-item px-3 py-2">
          <div className="d-flex gap-2">
            {toggle && (
              <div className="flex-fill">
                {/* <Select
                  options={searchOption}
                  onChange={tab => {
                    navigate(tab.value);
                  }}
                /> */}
                <Typeahead
                  id="search-sidebar"
                  options={searchOption}
                  selected={searchTab}
                  onChange={handleSearchTab}
                  placeholder="Search tab ..."
                />
              </div>
            )}
            <button
              className="btn btn-primary bg-dark bg-opacity-75"
              type="button"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? '<<' : '>>'}
            </button>
          </div>
        </li>
        {sideBarTab.map((tab, idx) => {
          return tab.subTab ? (
            <TabBarDropDown key={idx} tab={tab} toggle={toggle} />
          ) : (
            <TabBar
              key={idx}
              name={tab.name}
              title={tab.title}
              url={tab.url}
              icon={tab.icon}
              subTab={tab.subTab}
              toggle={toggle}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default memo(Sidebar);
