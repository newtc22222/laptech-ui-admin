import React from 'react';
import classNames from 'classnames';

import { ReactTable } from '../../components/common';
// import { SelectFilter } from '../../components/common/filter/ColumnFilter';
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
      accessor: 'phone'
    },
    {
      Header: content.gender,
      accessor: 'gender',
      Cell: ({ value }) => content.genderVietsub[value],
      sortType: (rowA, rowB) => {
        return content.genderVietsub[rowA.values.gender].localeCompare(
          content.genderVietsub[rowB.values.gender]
        );
      },
      disableFilters: true
      // Filter: SelectFilter,
      // filter: 'equals'
    },
    {
      Header: content.form.dob,
      accessor: 'dateOfBirth'
    },
    {
      Header: content.status,
      accessor: 'active',
      Cell: ({ value }) => (
        <span
          className={classNames('badge text-uppercase', {
            'text-bg-success': value,
            'text-bg-secondary': !value
          })}
        >
          {value ? content.active : content.inactive}
        </span>
      ),
      sortType: (rowA, rowB) =>
        Number(rowA.values.active) - Number(rowB.values.active),
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
      data={userList}
      hiddenColumns={['createdDate', 'modifiedDate']}
      isSortabled
      isFiltered
      hasGlobalFilter
    />
  );
};

export default UserTable;
