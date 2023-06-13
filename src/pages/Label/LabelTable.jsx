import React from 'react';

// TODO: build sortable table
import { ReactTable } from '../../components/common';
import content from './content';

/**
 * @since 2023-02-13
 */
const LabelTable = ({
  labelList,
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
      Header: content.icon,
      accessor: 'icon',
      disableFilters: true
    },
    {
      Header: content.title,
      accessor: 'title'
    },
    {
      Header: content.description,
      accessor: 'description'
    },
    {
      Header: content.sample,
      accessor: 'sample',
      Cell: ({ row }) => {
        return (
          <div
            title={row.original.title}
            className="d-flex justify-content-center border border-primary rounded-2"
          >
            <div
              className="mx-2"
              dangerouslySetInnerHTML={{ __html: row.original.icon }}
            />
            {row.original.name}
          </div>
        );
      },
      disableFilters: true,
      disableSortBy: true
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
      data={labelList}
      isSortabled
      isFiltered
      hasGlobalFilter
      isPagination
    />
  );
};

export default LabelTable;
