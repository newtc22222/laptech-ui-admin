import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import UserTable from './UserTable';
import UserForm from './UserForm';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';
import { userService } from '../../services';

const pageName = 'Người dùng hệ thống';
const objectName = 'users';
const titleButtonAdd = 'Thêm thông tin';

const User = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const userInSystem = useSelector(state => state.auth.user);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: userEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: userList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  // Loading
  useEffect(() => {
    if (!userList || error) userService.getAll(dispatch, accessToken);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = useCallback((userId, userName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${userName} khỏi hệ thống không?`,
      () => {
        userService.delete(dispatch, userId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  const handleBack = useCallback(
    () => action.changeWorkMode(WorkMode.view),
    []
  );

  const handleSetUpdateMode = useCallback(
    user => action.setUpdateMode(user),
    []
  );

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {workMode === WorkMode.create && <UserForm handleBack={handleBack} />}
      {workMode === WorkMode.edit && (
        <UserForm user={userEdit} handleBack={handleBack} />
      )}
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
      {!userList || isFetching ? (
        <Loading />
      ) : (
        <UserTable
          userList={userList.filter(u => u.id !== userInSystem.id)}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </div>
  );
};

export default User;
