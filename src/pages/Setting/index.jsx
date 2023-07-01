import React, { useEffect } from 'react';

import PageHeader from '../../components/common/PageHeader';
// import Loading from '../../components/common/Loading';
// import ServerNotResponse from '../Error/ServerNotResponse';

const pageName = 'Thiết lập ứng dụng';

const Setting = () => {
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

export default Setting;
