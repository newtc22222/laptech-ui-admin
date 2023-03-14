import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const TabBar = ({ name, title, url, icon, parentName }) => {
  const { activeTab, handleSetActiveTab } = useContext(ThemeContext);

  console.log(activeTab);

  const getBackground = () => {
    if (parentName) {
      return { backgroundColor: '#1e7fff' };
    }
    return activeTab === name ? { backgroundColor: '#0e4893' } : {};
  };

  // const getTextSubTab = () => {
  //   return parentName ? { color: '#0e4893' } : {};
  // };

  return (
    <li className="nav-item">
      <Link
        to={url}
        className="nav-link link-light align-middle ps-3 pe-3"
        style={getBackground()}
        onClick={() => handleSetActiveTab(parentName || name)}
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
