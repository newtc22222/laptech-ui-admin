import React from 'react';
import classNames from 'classnames';

import { ReactTable } from '../../components/common';
import { SelectFilter } from '../../components/common/filter/ColumnFilter';
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
      accessor: 'rate',
      Cell: ({ value }) => (
        <div
          className={classNames('text-center fw-bold', {
            'text-info': value > 0.1,
            'text-warning': value > 0.3,
            'text-danger': value > 0.5
          })}
        >
          {value * 100}
        </div>
      )
    },
    {
      Header: content.maxAmount,
      accessor: 'maxAmount',
      Cell: ({ value }) => <div className="text-center">{value}</div>
    },
    {
      Header: content.appliedDate,
      accessor: 'appliedDate',
      Cell: ({ value }) => formatDateTime(value)
    },
    {
      Header: content.endedDate,
      accessor: 'endedDate',
      Cell: ({ value }) => formatDateTime(value)
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
              onClick={() => handleSetUpdateMode(row.values)}
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
