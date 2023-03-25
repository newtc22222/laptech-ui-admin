import React, { useEffect } from 'react';

import PageHeader from '../../components/common/PageHeader';
// import Loading from '../../components/common/Loading';
// import ServerNotResponse from '../Error/ServerNotResponse';

const pageName = 'Thống kê dữ liệu';

/**
 * @since 2023-03-22
 */
const Statistic = () => {
  useEffect(() => {
    // if (!importList) .getAll(dispatch, accessToken);
  }, []);

  // if (isFetching) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <ServerNotResponse />;
  // }

  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
    </div>
  );
};

export default Statistic;
