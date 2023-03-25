import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PageHeader from '../../../../components/common/PageHeader';
import Loading from '../../../../components/common/Loading';
import ServerNotResponse from '../../../Error/ServerNotResponse';

const pageName = 'Thông tin đơn bán hàng';

/**
 * @since 2023-03-22
 */
const OrderPage = () => {
  const {
    data: invoiceList,
    isFetching,
    error
  } = useSelector(state => state['invoices']);

  // Loading
  useEffect(() => {
    // if (!invoiceList) .getAll(dispatch, accessToken);
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

export default OrderPage;
