import React from 'react';

import { SortableTable } from '../../../../components/common';
import { getCurrencyString, formatDateTime } from '../../../../utils';
import content from '../content';

function InvoiceTable({
  invoiceList,
  userList,
  handleSetUpdateMode,
  handleShowDeleteModal,
  ...rest
}) {
  const configData = [
    {
      label: content.id,
      render: data => (
        <div className="text-truncate" style={{ maxWidth: '10vw' }}>
          {data.id}
        </div>
      ),
      sortValue: data => data.id
    },
    {
      label: content.userName,
      render: data => _.find(userList, { id: data.userId }).name,
      sortValue: data => _.find(userList, { id: data.userId }).name
    },
    {
      label: content.address,
      render: data => data.address,
      sortValue: data => data.address
    },
    {
      label: content.itemQuantity,
      className: 'text-center',
      render: data => data.paymentAmount,
      sortValue: data => data.paymentAmount
    },
    {
      label: content.totalCost,
      className: 'text-center',
      render: data => getCurrencyString(data.paymentTotal, 'vi-VN', 'VND'),
      sortValue: data => data.paymentTotal
    },
    {
      label: content.dateCreated,
      render: data => formatDateTime(data.createdDate),
      sortValue: data => data.createdDate
    },
    {
      label: content.setting,
      className: 'text-center',
      render: data => {
        return (
          <button
            className="btn btn-outline-secondary text-uppercase"
            onClick={() => {
              handleSetUpdateMode(data);
            }}
          >
            {content.btnShow}
          </button>
        );
      }
    }
  ];

  return (
    <SortableTable
      data={invoiceList}
      totalRecordData={invoiceList.length}
      config={configData}
      defaultSort={['desc', content.dateCreated]}
      keyFn={data => data.id}
    />
  );
}

export default InvoiceTable;
