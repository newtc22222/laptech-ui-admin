import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../../redux-feature/auth.slice';
import { createLocalStorage } from '../../helper/CreateStorage';

/**
 * @since 2022-12-22
 */

const linkCSS = {
  normal: 'nav-link link-light',
  active: 'nav-link link-light active'
};

const headerTabs = ['features', 'pricing', 'faqs', 'about'];

const Header = () => {
  const navigate = useNavigate();
  const storage = createLocalStorage('laptech');

  // get User
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // check current user (handle Reload page)
  if (auth.user === null) {
    if (storage) {
      const payload = {
        user: storage.get('user'),
        accessToken: storage.get('accessToken'),
        refreshToken: storage.get('refreshToken')
      };
      dispatch(setCredentials(payload));
    }
  }

  if (Date.now() > Number(storage.get('maxAgeToken'))) {
    navigate('/auth/login');
  }

  // Check link
  const [linkActive, setLinkActive] = useState(
    sessionStorage.getItem('active-tab') || ''
  );
  const compareLink = name => {
    return linkActive === name ? linkCSS.active : linkCSS.normal;
  };

  const handleActiveTab = name => {
    sessionStorage.setItem('active-tab', name);
    setLinkActive(name);
  };

  const handleLogout = () => {
    storage.remove('user');
    storage.remove('accessToken');
    storage.remove('refreshToken');
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap shadow pt-2 pb-2">
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-3 fw-bold text-info">LAPTECH</span>
      </Link>

      <ul className="nav nav-pills">
        {headerTabs.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              to={'/' + item}
              className={compareLink(item)}
              onClick={() => handleActiveTab(item)}
            >
              {item.toLocaleUpperCase()}
            </Link>
          </li>
        ))}
        <li className="nav-item" key={'dropdown'}>
          <div className="dropdown nav-link">
            <Link
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdown1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="d-none d-sm-inline mx-1">TÀI KHOẢN</span>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow mt-2 me-1"
              aria-labelledby="dropdown1"
            >
              <li>
                <Link className="dropdown-item" to="/setting">
                  Thiết lập ứng dụng
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={auth.user ? '/profile' : '/login'}
                >
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="pb-1">
                {auth.user ? (
                  <Link
                    className="dropdown-item"
                    onClick={() => handleLogout()}
                    to="#"
                  >
                    Đăng xuất
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/auth/login">
                    Đăng nhập
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default memo(Header);
