import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';

const pageName = 'Thông tin tất cả hoá đơn';

/**
 * @since 2023-03-22
 */
const Invoice = () => {
  const {
    data: invoiceList,
    isFetching: isInvoiceFetching,
    error: invoiceError
  } = useSelector(state => state['invoices']);

  const {
    data: importList,
    isFetching: isImportFetching,
    error: importError
  } = useSelector(state => state['imports']);

  // Loading
  useEffect(() => {
    // if (!importList) .getAll(dispatch, accessToken);
  }, []);

  if (isImportFetching || isInvoiceFetching) {
    return <Loading />;
  }

  if (invoiceError || importError) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
    </div>
  );
};

export default Invoice;
