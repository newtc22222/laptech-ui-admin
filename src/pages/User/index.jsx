import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { userService } from '../../services';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import UserTable from './UserTable';
import UserForm from './UserForm';

const pageName = 'Người dùng hệ thống';
const objectName = 'users';
const titleButtonAdd = 'Thêm thông tin';

const User = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
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

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      {showModal && (
        <ModalConfirm
          show={showModal}
          setShow={action.showModal}
          {...modalValue}
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
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
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
