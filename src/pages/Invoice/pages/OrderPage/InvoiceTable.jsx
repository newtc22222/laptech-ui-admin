import React from 'react';

import { SortableTable } from '../../../../components/common';
import { getCurrencyString, formatDateTime } from '../../../../utils';
import content from './content';

function InvoiceTable({ invoiceList, setShowModal, setInvoice, ...props }) {
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
      label: content.dateCreated,
      render: data => formatDateTime(data.createdDate),
      sortValue: data => data.createdDate
    },
    {
      label: content.itemQuantity,
      render: data => <div className="text-center">{data.items.length}</div>,
      sortValue: data => data.items.length
    },
    {
      label: content.totalCost,
      render: data => {
        const totalCost = data.items
          .map(i => i.discountPrice * i.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return (
          <div className="text-center">
            {getCurrencyString(totalCost, 'vi-VN', 'VND')}
          </div>
        );
      },
      sortValue: data => data.items.length
    },
    {
      label: content.setting,
      render: data => {
        return (
          <button
            className="btn btn-outline-secondary text-uppercase"
            onClick={() => {
              setShowModal(true);
              setInvoice(data);
            }}
          >
            {content.btnShow}
          </button>
        );
      }
    }
  ];

  const keyFn = data => data.id;

  return (
    <SortableTable
      data={invoiceList}
      totalRecordData={invoiceList.length}
      config={configData}
      defaultSort={['desc', content.dateCreated]}
      keyFn={keyFn}
    />
  );
}

export default InvoiceTable;
