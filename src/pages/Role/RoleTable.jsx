import React from 'react';
import SoftTable from '../../components/common/SoftTable';
import Loading from '../../components/common/Loading';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';
const headerList = ['ID', 'Tên phân quyền', 'Mô tả', 'Thiết lập'];

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

  return (
    <SoftTable
      headerList={headerList}
      dataList={roleList}
      totalRecordData={roleTotalRecord}
      cb_handleRow={(idx_start, idx_end) =>
        roleList.slice(idx_start, idx_end).map(role => (
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
      }
    />
  );
};

export default RoleTable;
