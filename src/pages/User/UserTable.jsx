import React from 'react';
import SoftTable from '../../components/common/SoftTable';
import Loading from '../../components/common/Loading';

import { getStringBackTime } from '../../utils/HandleTimer';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';
const headerList = [
  'ID',
  'Tên người dùng',
  'Số điện thoại',
  'Giới tính',
  'Trạng thái tài khoản',
  'Lần đăng nhập gần nhất',
  'Thiết lập'
];
const gender = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác'
};

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

  return (
    <SoftTable
      headerList={headerList}
      dataList={userList}
      totalRecordData={userTotalRecord}
      cb_handleRow={(idx_start, idx_end) =>
        userList.slice(idx_start, idx_end).map(user => (
          <tr key={user.id} className="text-center">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{gender[user.gender]}</td>
            <td>{gender.isActive && <span>?</span>}</td>
            <td>{getStringBackTime(user.modifiedDate)}</td>
            <td style={{ width: '10%' }}>
              <button
                className="btn btn-secondary w-100 mb-2"
                onClick={() => handleSetUpdateMode(user)}
              >
                {titleButtonUpdate}
              </button>{' '}
              <br />
              <button
                className="btn btn-danger w-100"
                onClick={() => handleShowDeleteModal(user.id, user.name)}
                disabled={user.isActive}
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

export default UserTable;
