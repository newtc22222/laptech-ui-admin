import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../../redux-feature/auth.slice';

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

  // get User
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // check current user (handle Reload page)
  if (auth.user === null) {
    if (localStorage.getItem('laptechUser')) {
      const payload = {
        user: localStorage.getItem('laptechUser'),
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      };
      dispatch(setCredentials(payload));
    }
  }

  // Check link
  const [linkActive, setLinkActive] = useState(
    window.location.pathname.replace('/', '')
  );
  const compareLink = name => {
    if (name === 'home' && linkActive === '') return linkCSS.active;
    return linkActive === name ? linkCSS.active : linkCSS.normal;
  };

  const handleClick = name => {
    setLinkActive(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('laptechUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
        <li className="nav-item">
          <Link
            to="/"
            className={compareLink('home')}
            aria-current="page"
            onClick={() => handleClick('home')}
          >
            HOME
          </Link>
        </li>
        {/* Another tab */}
        {headerTabs.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              to={'/' + item}
              className={compareLink(item)}
              onClick={() => handleClick(item)}
            >
              {item.toLocaleUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <div className="dropdown ms-3 me-3">
        <Link
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdown1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="d-none d-sm-inline mx-1">TÀI KHOẢN</span>
        </Link>
        <ul
          className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow m-0"
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
          <li>
            {auth.user ? (
              <p className="dropdown-item" onClick={() => handleLogout()}>
                Đăng xuất
              </p>
            ) : (
              <Link className="dropdown-item" to="/auth/login">
                Đăng nhập
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default memo(Header);
