import React from 'react';

import { Loading, SortableTable } from '../../../components/common';

import {
  chooseFieldsOfObject,
  formatDateTime,
  getCurrencyString
} from '../../../utils';
import content from './content';

const fields = [
  'id',
  'productId',
  'quantity',
  'importedPrice',
  'importedDate',
  'createdDate',
  'modifiedDate'
];

const ImportedTable = ({
  importTicketList,
  importTicketTotalRecord,
  productList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (!importTicketList || !productList) return <Loading />;

  const data = chooseFieldsOfObject(importTicketList, fields);
  const config = [
    {
      label: content.ticketId,
      render: ticket => <div className="text-center">{ticket.id}</div>,
      sortValue: ticket => ticket.id
    },
    {
      label: content.productId,
      render: ticket => ticket.productId,
      sortValue: ticket => ticket.productId
    },
    // {
    //   label: content.productName,
    //   render: ticket => {
    //     const product = productList.filter(p => p.id === ticket.productId)[0];
    //     return product.name;
    //   },
    //   sortValue: ticket => {
    //     const product = productList.filter(p => p.id === ticket.productId)[0];
    //     return product.name;
    //   }
    // },
    {
      label: content.quantity,
      render: ticket => <div className="text-center">{ticket.quantity}</div>,
      sortValue: ticket => ticket.quantity
    },
    {
      label: content.price,
      render: ticket => getCurrencyString(ticket.importedPrice, 'vi-VN', 'VND'),
      sortValue: ticket => ticket.importedPrice
    },
    {
      label: content.total,
      render: ticket =>
        getCurrencyString(
          ticket.importedPrice * ticket.quantity,
          'vi-VN',
          'VND'
        ),
      sortValue: ticket => ticket.importedPrice * ticket.quantity
    },
    {
      label: content.date,
      render: ticket => formatDateTime(ticket.importedDate),
      sortValue: ticket => ticket.importedDate
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: ticket => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(ticket)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() => handleShowDeleteModal(ticket.id)}
            >
              {content.btnDel}
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={ticket => ticket.id}
      totalRecordData={importTicketTotalRecord}
      defaultSort={['desc', content.date]}
    />
  );
};

export default ImportedTable;
