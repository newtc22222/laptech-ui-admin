import React from 'react';
import useTable from '../../hooks/useTable';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';

/**
 * @since 2023-02-13
 */
const RoleTable = ({
  roleList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  return useTable(['ID', 'Tên phân quyền', 'Mô tả', 'Thiết lập'], () =>
    roleList?.map(role => (
      <tr key={role.id} className="text-center">
        <td>{role.id}</td>
        <td className="fw-bolder">{role.name}</td>
        <td className="fw-bold text-secondary">{role.description}</td>
        <td style={{ width: '10%' }}>
          <button
            className="btn btn-secondary w-100 mb-2"
            onClick={() => handleSetUpdateMode(role)}
          >
            {titleButtonUpdate}
          </button>{' '}
          <br />
          <button
            className="btn btn-danger w-100"
            onClick={() => handleShowDeleteModal(role.id, role.name)}
          >
            {titleButtonDelete}
          </button>
        </td>
      </tr>
    ))
  );
};

export default RoleTable;
