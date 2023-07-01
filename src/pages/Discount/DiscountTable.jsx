import React from 'react';
import classNames from 'classnames';

import { ReactTable } from '../../components/common';
import {
  NumberCompareFilter,
  SelectFilter
} from '../../components/common/filter/ColumnFilter';
import { formatDateTime } from '../../utils';
import content from './content';

/**
 * @since 2023-02-13
 */
const DiscountTable = ({
  discountList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  const columns = [
    {
      Header: content.id,
      accessor: 'id',
      disableFilters: true
    },
    {
      Header: content.code,
      accessor: 'code'
    },
    {
      Header: content.appliedType,
      accessor: 'appliedType',
      Cell: ({ value }) => (
        <div
          className={classNames('text-center fw-bold', {
            'text-primary': value === 'PURCHASE'
          })}
        >
          {value}
        </div>
      ),
      Filter: SelectFilter,
      filter: 'includes'
    },
    {
      Header: content.rate,
      id: 'rate',
      accessor: row => row.rate * 100,
      Cell: ({ value }) => (
        <div
          className={classNames('text-center fw-bold', {
            'text-info': value > 10,
            'text-warning': value > 30,
            'text-danger': value > 50
          })}
        >
          {value}
        </div>
      ),
      Filter: NumberCompareFilter,
      filter: 'compare'
    },
    {
      Header: content.maxAmount,
      accessor: 'maxAmount',
      Cell: ({ value }) => <div className="text-center">{value}</div>,
      Filter: NumberCompareFilter,
      filter: 'compare'
    },
    {
      Header: content.appliedDate,
      accessor: row => formatDateTime(row['appliedDate']),
      sortType: (rowA, rowB) => {
        const dateA = new Date(rowA.original.appliedDate).getTime();
        const dateB = new Date(rowB.original.appliedDate).getTime();
        return dateA - dateB;
      }
    },
    {
      Header: content.endedDate,
      accessor: row => formatDateTime(row['endedDate']),
      sortType: (rowA, rowB) => {
        const dateA = new Date(rowA.original.endedDate).getTime();
        const dateB = new Date(rowB.original.endedDate).getTime();
        return dateA - dateB;
      }
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
                handleShowDeleteModal(row.values.id, row.values.code)
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
      hiddenColumns={['createdDate', 'modifiedDate']}
      data={discountList}
      isSortabled
      isFiltered
      isPagination
    />
  );
};

export default DiscountTable;
