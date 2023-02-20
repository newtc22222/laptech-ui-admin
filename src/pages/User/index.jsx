import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiUsers from '../../apis/user.api';

import UserTable from './UserTable';
import UserForm from './UserForm';

import ModalCustom from '../../components/Modal';
import Loading from '../../components/common/Loading';

import { getStringBackTime } from '../../utils/HandleTimer';

const pageName = 'Người dùng hệ thống';
const objectName = 'users';
const titleButtonAdd = 'Thêm thông tin';

const User = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    Navigate,
    workMode,
    showModal,
    userEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  const { userList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  // Loading
  useEffect(() => {
    apiUsers.getAllUser(dispatch);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = useCallback((userId, userName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${userName} khỏi hệ thống không?`,
      () => {
        apiUsers.blockUser(dispatch, userId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      {showModal && (
        <ModalCustom
          show={showModal}
          setShow={action.showModal}
          props={modalValue}
        />
      )}
      {workMode === WorkMode.create && (
        <UserForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <UserForm
          user={userEdit}
          handleBack={() => action.changeWorkMode(WorkMode.view)}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{pageName}</h1>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </div>
      <UserTable
        userList={userList}
        userTotalRecord={userList?.length}
        handleSetUpdateMode={user => action.setUpdateMode(user)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default User;
