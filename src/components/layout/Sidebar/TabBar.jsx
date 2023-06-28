import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useAppContext } from '../../context/AppContext';

const TabBar = ({ name, title, url, icon, parentName, toggle }) => {
  const { activeTab } = useAppContext();

  const getBackground = () => {
    if (parentName) {
      return { backgroundColor: '#3988ef' };
    }
    if (activeTab.tab === name) {
      return { backgroundColor: '#0e4893' };
    }
  };

  return (
    <li className="nav-item">
      <Link
        to={url}
        className={classNames('nav-link px-3 link-light', {
          'link-dark fw-bold': activeTab.subTab === name,
          'd-flex align-items-center': toggle,
          'text-center': !toggle
        })}
        style={getBackground()}
      >
        {icon}
        {toggle && (
          <span className="ms-3 text-uppercase d-none d-lg-inline">
            {title}
          </span>
        )}
      </Link>
    </li>
  );
};

export default TabBar;
