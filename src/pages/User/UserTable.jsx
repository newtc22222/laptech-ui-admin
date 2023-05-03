import React from 'react';

import { Loading, SortableTable } from '../../components/common';
import { chooseFieldsOfObject, makeToast, toastType } from '../../utils';
import content from './content';
import classNames from 'classnames';

const fields = [
  'id',
  'name',
  'phone',
  'email',
  'dateOfBirth',
  'gender',
  'active',
  'createdDate',
  'modifiedDate'
];

/**
 * @since 2023-02-14
 */
const UserTable = ({
  userList,
  userTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (userList === null || userList === undefined) return <Loading />;

  const data = chooseFieldsOfObject(userList, fields);
  const config = [
    {
      label: content.id,
      render: user => user.id,
      sortValue: user => user.id
    },
    {
      label: content.name,
      render: user => user.name,
      sortValue: user => user.name
    },
    {
      label: content.phone,
      render: user => user.phone
    },
    {
      label: content.gender,
      render: user => content.genderVietsub[user.gender],
      sortValue: user => content.genderVietsub[user.gender]
    },
    {
      label: content.status,
      render: user => (
        <span
          className={classNames('badge text-uppercase', {
            'text-bg-success': user.active,
            'text-bg-secondary': user.active === false
          })}
        >
          {user.active ? content.active : content.inactive}
        </span>
      ),
      sortValue: user => user.active
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: user => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(user)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() => {
                if (user.active) {
                  makeToast(content.rejected, toastType.warning);
                  return;
                }
                handleShowDeleteModal(user.id, user.name);
              }}
            >
              {content.btnDel}
            </button>
          </div>
        );
      }
    }
  ];
  const keyFn = user => user.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={userTotalRecord}
    />
  );
};

export default UserTable;
