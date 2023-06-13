import React from 'react';

// TODO: build sortable table
import { ReactTable } from '../../components/common';
import { formatDateTime } from '../../utils';
import content from './content';

/**
 * @since 2023-02-13
 */
const RoleTable = ({
  roleList,
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
      accessor: 'name',
      Cell: ({ value }) => <span className="fw-bold">{value}</span>
    },
    {
      Header: content.description,
      accessor: 'description'
    },
    {
      Header: content.createdDate,
      accessor: 'createdDate',
      Cell: ({ value }) => formatDateTime(value)
    },
    {
      Header: content.modifiedDate,
      accessor: 'modifiedDate',
      Cell: ({ value }) => formatDateTime(value)
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
              disabled={content.fixedRole.includes(row.values.name)}
            >
              {content.btnDel}
            </button>
          </div>
        );
      },
      disableFilters: true
    }
  ];

  return <ReactTable columns={columns} data={roleList} isFiltered />;
};

export default RoleTable;
