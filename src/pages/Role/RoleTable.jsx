import React from 'react';

// TODO: build sortable table
import { Loading, SortableTable } from '../../components/common';
import { chooseFieldsOfObject } from '../../utils';
import content from './content';

const fields = ['id', 'name', 'description', 'createdDate', 'modifiedDate'];

/**
 * @since 2023-02-13
 */
const RoleTable = ({
  roleList,
  roleTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (roleList === null || roleList === undefined) return <Loading />;

  const data = chooseFieldsOfObject(roleList, fields);
  const config = [
    {
      label: content.id,
      render: role => role.id,
      sortValue: role => role.id
    },
    {
      label: content.name,
      render: role => <div className="fw-bold">{role.name}</div>,
      sortValue: role => role.name
    },
    {
      label: content.description,
      render: role => role.description,
      sortValue: role => role.description
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: role => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(role)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() => handleShowDeleteModal(role.id, role.name)}
            >
              {content.btnDel}
            </button>
          </div>
        );
      }
    }
  ];

  const keyFn = role => role.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={roleTotalRecord}
    />
  );
};

export default RoleTable;
