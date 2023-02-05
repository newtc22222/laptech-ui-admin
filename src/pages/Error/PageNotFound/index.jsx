import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @since 2022-12-22
 */

function PageNotFound() {
  return (
    <Link to="/">
      <img
        className="position-absolute top-50 start-50 translate-middle"
        alt="Page not found"
        src={require('./page-not-found.png')}
      />
    </Link>
  );
}

export default PageNotFound;
