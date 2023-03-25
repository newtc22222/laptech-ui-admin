import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import apiRole from '../../apis/role.api';

import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import PageHeader from '../../components/common/PageHeader';
import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';
import checkLoginTimeout from '../../helper/checkLoginTimeout';

const pageName = 'Quyền sử dụng người dùng';
const objectName = 'roles';
const titleButtonAdd = 'Thêm thông tin';

/**
 * @since 2023-02-13
 */
const Role = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { dispatch, workMode, showModal, roleEdit, modalValue, action } =
    useWorkspace();

  if (accessToken === null || accessToken === undefined)
    navigate('/auth/login');

  const {
    data: roleList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  useEffect(() => {
    if (!roleList) apiRole.getAll(dispatch, accessToken);
  }, []);

  const handleShowDeleteModal = useCallback((roleId, roleName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${roleName} khỏi hệ thống không?`,
      () => {
        apiRole.delete(dispatch, roleId, accessToken);
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
    checkLoginTimeout() || (
      <div>
        {showModal && (
          <ModalConfirm
            show={showModal}
            setShow={action.showModal}
            props={modalValue}
          />
        )}
        {workMode === WorkMode.create && (
          <RoleForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
        )}
        {workMode === WorkMode.edit && (
          <RoleForm
            role={roleEdit}
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
        <RoleTable
          roleList={roleList}
          handleSetUpdateMode={role => action.setUpdateMode(role)}
          handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
        />
      </div>
    )
  );
};

export default Role;
