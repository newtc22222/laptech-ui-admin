import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import classNames from 'classnames';

const TabBar = ({ name, title, url, icon, parentName }) => {
  const { activeTab, handleSetActiveTab } = useContext(ThemeContext);

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
          className="ms-2 d-none d-sm-inline"
          // style={getTextSubTab()}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};

export default TabBar;
