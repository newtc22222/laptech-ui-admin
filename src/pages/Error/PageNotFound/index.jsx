import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @since 2022-12-22
 */

function PageNotFound() {
  return (
    <div className="container-fluid text-center">
      <Link to="/">
        <img
          className="img-fluid mt-5"
          alt="Page not found"
          src={require('./page-not-found.png')}
        />
      </Link>
    </div>
  );
}

export default PageNotFound;
