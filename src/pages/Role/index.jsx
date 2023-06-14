import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { roleService } from '../../services';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';

const pageName = 'Quyền sử dụng người dùng';
const objectName = 'roles';
const titleButtonAdd = 'Thêm thông tin';

/**
 * @since 2023-02-13
 */
const Role = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: roleEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: roleList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  useEffect(() => {
    if (!roleList || error) roleService.getAll(dispatch, accessToken);
  }, []);

  const handleShowDeleteModal = useCallback((roleId, roleName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${roleName} khỏi hệ thống không?`,
      () => {
        roleService.delete(dispatch, roleId, accessToken);
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
    role => action.setUpdateMode(role),
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
      {workMode === WorkMode.create && <RoleForm handleBack={handleBack} />}
      {workMode === WorkMode.edit && (
        <RoleForm role={roleEdit} handleBack={handleBack} />
      )}
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
          disabled={!roleList || isFetching || error}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
      {!roleList || isFetching ? (
        <Loading />
      ) : (
        <RoleTable
          roleList={roleList}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </div>
  );
};

export default Role;
