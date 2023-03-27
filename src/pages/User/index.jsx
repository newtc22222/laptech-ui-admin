import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import apiUser from '../../apis/user.api';

import CheckLoginTimeout from '../../components/validation/CheckLoginTimeout';
import PageHeader from '../../components/common/PageHeader';
import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';
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

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  const {
    data: userList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  // Loading
  useEffect(() => {
    if (!userList || error) apiUser.getAll(dispatch, accessToken);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = useCallback((userId, userName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${userName} khỏi hệ thống không?`,
      () => {
        apiUser.delete(dispatch, userId, accessToken);
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
    <CheckLoginTimeout>
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
    </CheckLoginTimeout>
  );
};

export default User;
