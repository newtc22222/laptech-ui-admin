import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../../components/common';

const pageName = 'Thông tin tất cả hoá đơn';

/**
 * @since 2023-03-22
 */
const ViewPage = () => {
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

export default ViewPage;
