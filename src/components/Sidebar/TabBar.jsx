import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AppContext } from '../../context/AppContext';

const TabBar = ({ name, title, url, icon, parentName }) => {
  const { activeTab, handleSetActiveTab } = useContext(AppContext);

  const getBackground = () => {
    if (parentName) {
      return { backgroundColor: '#1e7fff' };
    }
    if (activeTab.tab === name) {
      return { backgroundColor: '#0e4893' };
    }
  };

  return (
    <li className="nav-item">
      <Link
        to={url}
        className={classNames('nav-link align-middle ps-3 pe-3 link-light', {
          'link-dark fw-bold': activeTab.subTab === name
        })}
        style={getBackground()}
        onClick={() =>
          handleSetActiveTab(parentName || name, parentName && name)
        }
      >
        {icon}
        <span
          className="ms-3 text-uppercase d-none d-lg-inline"
          // style={getTextSubTab()}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};

export default TabBar;
