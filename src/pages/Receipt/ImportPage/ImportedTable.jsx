import React from 'react';

import { ReactTable } from '../../../components/common';

import { formatDateTime, getCurrencyString } from '../../../utils';
import content from './content';
import SelectMultipleFilter from '../../../components/common/filter/ColumnFilter/SearchMultipleFilter';
import {
  NumberCompareFilter,
  NumberRangeFilter
} from '../../../components/common/filter/ColumnFilter';

const ImportedTable = ({
  importTicketList,
  productList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  const columns = [
    {
      Header: content.ticketId,
      accessor: 'id'
    },
    {
      Header: content.productId,
      accessor: 'productId',
      Filter: SelectMultipleFilter,
      filter: 'includes'
    },
    {
      Header: content.productName,
      accessor: 'productName',
      Cell: ({ row }) =>
        productList.find(product => product.id === row.values.productId)
          ?.name || ''
    },
    {
      Header: content.quantity,
      accessor: 'quantity',
      Filter: NumberCompareFilter,
      filter: 'compare'
    },
    {
      Header: content.price,
      accessor: 'importedPrice',
      Cell: ({ value }) => getCurrencyString(value, 'vi-VN', 'VND'),
      Filter: NumberRangeFilter,
      filter: 'between'
    },
    {
      Header: content.total,
      id: 'total',
      accessor: row => row.quantity * row.importedPrice,
      Cell: ({ value }) => getCurrencyString(value, 'vi-VN', 'VND'),
      Filter: NumberRangeFilter,
      filter: 'between'
    },
    {
      Header: content.date,
      id: 'importedDate',
      accessor: row => formatDateTime(row['importedDate'])
    },
    {
      Header: 'createdDate',
      accessor: 'createdDate'
    },
    {
      Header: 'modifiedDate',
      accessor: 'modifiedDate'
    },
    {
      Header: content.setting,
      accessor: 'setting',
      Cell: ({ row }) => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(row.original)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() =>
                handleShowDeleteModal(row.values.id, row.values.id)
              }
            >
              {content.btnDel}
            </button>
          </div>
        );
      },
      disableFilters: true,
      disableSortBy: true
    }
  ];

  return (
    <ReactTable
      columns={columns}
      hiddenColumns={['productName', 'createdDate', 'modifiedDate']}
      data={_.sortBy(importTicketList, ['createdDate']).reverse()}
      isFiltered
      // hasGlobalFilter
      isSortabled
      isPagination
    />
  );
};

export default ImportedTable;
