import React from 'react';
import classNames from 'classnames';

import { ReactTable } from '../../components/common';
import { SelectFilter } from '../../components/common/filter/ColumnFilter';
import content from './content';

/**
 * @since 2023-02-14
 */
const UserTable = ({
  userList,
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
      Header: content.phone,
      accessor: 'phone',
      disableSortBy: true
    },
    {
      Header: content.gender,
      id: 'gender',
      accessor: row => content.genderVietsub[row.gender],
      Filter: SelectFilter,
      filter: 'equals'
    },
    {
      Header: content.form.dob,
      accessor: 'dateOfBirth'
    },
    {
      Header: content.status,
      id: 'active',
      accessor: row =>
        (row.active ? content.active : content.inactive).toUpperCase(),
      Cell: ({ row, value }) => (
        <span
          className={classNames(
            'badge',
            row.original.active ? 'text-bg-success' : 'text-bg-secondary'
          )}
        >
          {value}
        </span>
      ),
      Filter: SelectFilter,
      filter: 'equals'
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
      data={userList}
      hiddenColumns={['createdDate', 'modifiedDate']}
      isSortabled
      isFiltered
      hasGlobalFilter
    />
  );
};

export default UserTable;
