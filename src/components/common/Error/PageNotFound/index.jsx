import React from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../../context/AppContext';

/**
 * @since 2022-12-22
 */
const PageNotFound = ({ pathNavigate = '/', ...rest }) => {
  const { handleSetActiveTab } = useAppContext();
  return (
    <div className="container-fluid text-center">
      <Link to={pathNavigate} onClick={() => handleSetActiveTab('home')}>
        <img
          className="img-fluid mt-5"
          alt="Page not found"
          src={require('./page-not-found.png')}
        />
      </Link>
    </div>
  );
};

export default PageNotFound;
