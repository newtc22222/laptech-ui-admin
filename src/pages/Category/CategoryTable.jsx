import React from 'react';

// TODO: build sortable table
import { ReactTable } from '../../components/common';
import content from './content';

function CategoryTable({
  categoryList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) {
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
      Header: content.description,
      accessor: 'description'
    },
    {
      Header: content.image,
      accessor: 'image',
      Cell: ({ row, value }) => (
        <img
          alt={row.values.name}
          src={value}
          className="img-thumbnail"
          style={{ maxWidth: '200px' }}
        />
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
      data={categoryList}
      isSortabled
      isFiltered
    />
  );
}

export default React.memo(CategoryTable);
