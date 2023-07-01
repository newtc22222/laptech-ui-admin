import React from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../../context/AppContext';

/**
 * @since 2022-12-22
 */
const PageNotFound = ({ pathNavigate = '/', ...rest }) => {
  const { handleSetActiveTab } = useAppContext();
  return (
    <div className="container-fluid h-100 position-relative">
      <Link to={pathNavigate} onClick={() => handleSetActiveTab('home')}>
        <img
          className="img-fluid position-absolute top-50 start-50 translate-middle"
          alt="Page not found"
          src={require('../../../../assets/images/404_not_found.jpg')}
        />
      </Link>
    </div>
  );
};

export default PageNotFound;
