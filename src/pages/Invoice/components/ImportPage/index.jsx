import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PageHeader from '../../../../components/common/PageHeader';
import Loading from '../../../../components/common/Loading';
import ServerNotResponse from '../../../Error/ServerNotResponse';

const pageName = 'Thông tin đơn nhập hàng';

/**
 * @since 2023-03-22
 */
const ImportPage = () => {
  const {
    data: importList,
    isFetching,
    error
  } = useSelector(state => state['imports']);

  // Loading
  useEffect(() => {
    // if (!importList) .getAll(dispatch, accessToken);
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
    </div>
  );
};

export default ImportPage;
