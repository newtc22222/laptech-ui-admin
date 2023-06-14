import React from 'react';

import { ReactTable } from '../../../../components/common';
import { getCurrencyString, formatDateTime } from '../../../../utils';
import content from '../content';

function InvoiceTable({
  invoiceList,
  userList,
  handleSetUpdateMode,
  handleShowDeleteModal,
  ...rest
}) {
  const columns = [
    {
      Header: content.id,
      accessor: 'id'
    },
    {
      Header: content.userName,
      accessor: 'userId',
      Cell: ({ value }) => _.find(userList, { id: value })?.name || ''
    },
    {
      Header: content.address,
      accessor: 'address'
    },
    {
      Header: content.itemQuantity,
      accessor: 'paymentAmount',
      disableFilters: true
    },
    {
      Header: content.totalCost,
      accessor: 'paymentTotal',
      Cell: ({ value }) => getCurrencyString(value, 'vi-VN', 'VND')
    },
    {
      Header: 'orderStatus',
      accessor: 'orderStatus'
    },
    {
      Header: content.dateCreated,
      accessor: 'createdDate',
      Cell: ({ value }) => formatDateTime(value)
    },
    {
      Header: 'modifiedDate',
      accessor: 'modifiedDate'
    },
    {
      Header: 'setting',
      accessor: 'setting',
      Cell: ({ row }) => (
        <button
          className="btn btn-outline-secondary text-uppercase"
          onClick={() => {
            handleSetUpdateMode(row.values);
          }}
        >
          {content.btnShow}
        </button>
      ),
      disableFilters: true,
      disableSortBy: true
    }
  ];

  return (
    <ReactTable
      columns={columns}
      hiddenColumns={['orderStatus', 'modifiedDate']}
      data={_.sortBy(invoiceList, ['createdDate']).reverse()}
      isFiltered
      isSortabled
      isPagination
    />
  );
}

export default React.memo(InvoiceTable);
