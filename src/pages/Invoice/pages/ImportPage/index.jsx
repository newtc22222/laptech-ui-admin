import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../../../components/common';
import { importProductService } from '../../../../services';

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

  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  // Loading
  useEffect(() => {
    importProductService.getAll(dispatch, accessToken); // refresh when mount
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
