import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useAppContext } from '../../context/AppContext';

const TabHeader = ({ name }) => {
  const { activeTab } = useAppContext();

  return (
    <li className="nav-item">
      <Link
        to={'/' + name}
        className={classNames('nav-link link-light', {
          active: activeTab.tab === name
        })}
      >
        {name.toLocaleUpperCase()}
      </Link>
    </li>
  );
};

export default TabHeader;
