import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../../redux-feature/auth.slice';
import { createLocalStorage } from '../../helper/CreateStorage';
import TabHeader from './TabHeader';

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

  // get User
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // check current user (handle Reload page)
  if (auth.user === null && storage !== null) {
    if (storage) {
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
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap shadow pt-2 pb-2">
      <Link to="/" className="text-decoration-none">
        <span className="fs-3 fw-bold text-info ms-3">LAPTECH</span>
      </Link>

      <ul className="nav nav-pills">
        {headerTabs.map((name, idx) => (
          <TabHeader name={name} key={idx} />
        ))}
        <li className="nav-item" key="dropdown">
          <div className="dropdown nav-link">
            <Link
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownAccount"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {titleAccountTab}
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow mt-2 me-1"
              aria-labelledby="dropdownAccount"
            >
              <li>
                <Link className="dropdown-item" to="/setting">
                  {titleSystemSetting}
                </Link>
              </li>
              {auth.user && (
                <li>
                  <Link className="dropdown-item" to="/profile">
                    {titleProfile}
                  </Link>
                </li>
              )}
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
                    {titleLogout}
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/auth/login">
                    {titleLogin}
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
