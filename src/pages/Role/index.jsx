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

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <ServerNotResponse />;
  }

  function renderFormModal() {
    switch (workMode) {
      case WorkMode.create:
        return (
          <RoleForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
        );
      case WorkMode.edit:
        return (
          <RoleForm
            role={roleEdit}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <div>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {renderFormModal()}
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
  );
};

export default Role;
