import React from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../../context/AppContext';

/**
 * @since 2022-12-22
 */
const titleBackHome = 'Server toang rồi! Về trang chủ đợi tiếp đi!';

const ServerNotResponse = ({
  pathNavigate = '/',
  tab = 'home',
  subTab,
  ...rest
}) => {
  const { handleSetActiveTab } = useAppContext();

  return (
    <div className="container text-center">
      <img
        className="img-fluid img-thumbnail"
        alt="Server not response"
        src={require('./server-not-response.jpg')}
      />
      <h2 className="text-uppercase mt-3">
        <Link
          className="text-decoration-none"
          to={pathNavigate}
          onClick={() => handleSetActiveTab(tab, subTab)}
        >
          {titleBackHome}
        </Link>
      </h2>
    </div>
  );
};

export default ServerNotResponse;
