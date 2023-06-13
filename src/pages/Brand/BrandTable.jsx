import React from 'react';

import { ReactTable } from '../../components/common';
import { SearchMultipleFilter } from '../../components/common/filter/ColumnFilter';

import content from './content';

const BrandTable = ({
  brandList,
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
      Header: content.name,
      accessor: 'name'
    },
    {
      Header: content.country,
      accessor: 'country',
      Filter: SearchMultipleFilter,
      filter: 'includes'
    },
    {
      Header: content.establishDate,
      accessor: 'establishDate',
      sortType: (rowA, rowB) => {
        const dateA = new Date(rowA.values.establishDate).getTime();
        const dateB = new Date(rowB.values.establishDate).getTime();
        return dateA - dateB;
      }
    },
    {
      Header: content.logo,
      accessor: 'logo',
      Cell: ({ row, value }) => (
        <img alt={row.values.name} src={value} className="img-thumbnail" />
      ),
      disableFilters: true
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
                handleShowDeleteModal(row.values.id, row.values.name)
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
      data={brandList}
      isSortabled
      isFiltered
      hasGlobalFilter
    />
  );
};

export default React.memo(BrandTable);
