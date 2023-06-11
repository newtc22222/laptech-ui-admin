import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import TabHeader from './TabHeader';
import { useAppContext } from '../../context/AppContext';
import { logout, setCredentials } from '../../../store/slice/auth.slice';
import { createLocalStorage } from '../../../utils';

/**
 * @since 2022-12-22
 */

const headerTabs = ['features', 'pricing', 'faqs', 'about'];
const titleAccountTab = 'ACCOUNT';
const titleSystemSetting = 'Thiết lập hệ thống';
const titleProfile = 'Thông tin cá nhân';
const titleLogin = 'Đăng nhập';
const titleLogout = 'Đăng xuất';

const Header = () => {
  const navigate = useNavigate();
  const storage = createLocalStorage('laptech');
  const { handleSetActiveTab } = useAppContext();

  // get User
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (auth.user === null) {
    if (storage.get('user')) {
      const payload = {
        user: storage.get('user'),
        accessToken: storage.get('accessToken'),
        refreshToken: storage.get('refreshToken')
      };
      dispatch(setCredentials(payload));
    }
  }

  const handleLogout = () => {
    storage.remove('user');
    storage.remove('accessToken');
    storage.remove('refreshToken');
    storage.remove('maxAgeToken');
    dispatch(logout());
    handleSetActiveTab('login');
    navigate('/auth/login');
  };

  return (
    <header className="navbar navbar-dark bg-dark navbar-expand-sm sticky-top">
      <div className="container-fluid d-flex flex-wrap">
        <Link
          to="/"
          className="nav me-auto text-decoration-none"
          onClick={() => handleSetActiveTab('home')}
        >
          <span className="fs-3 fw-bold text-info">LAPTECH</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav nav-pills">
              {headerTabs.map((name, idx) => (
                <TabHeader name={name} key={idx} />
              ))}
              <li className="nav-item dropdown" key="dropdown">
                <a
                  className="nav-link text-white dropdown-toggle"
                  id="dropdownAccount"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                >
                  {titleAccountTab}
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small m-0">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/setting"
                      onClick={() => handleSetActiveTab('setting')}
                    >
                      {titleSystemSetting}
                    </Link>
                  </li>
                  {auth.user && (
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/profile"
                        onClick={() => handleSetActiveTab('profile')}
                      >
                        {titleProfile}
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="pb-1">
                    {auth.user ? (
                      <a
                        className="dropdown-item"
                        role="button"
                        onClick={() => handleLogout()}
                      >
                        {titleLogout}
                      </a>
                    ) : (
                      <Link
                        className="dropdown-item"
                        to="/auth/login"
                        onClick={() => handleSetActiveTab('login')}
                      >
                        {titleLogin}
                      </Link>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
