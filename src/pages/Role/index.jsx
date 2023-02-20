import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiRole from '../../apis/role.api';

import RoleTable from './RoleTable';
import RoleForm from './RoleForm';

import ModalCustom from '../../components/Modal';
import Loading from '../../components/common/Loading';

const pageName = 'Quyền sử dụng người dùng';
const objectName = 'roles';
const titleButtonAdd = 'Thêm thông tin';

/**
 * @since 2023-02-13
 */
const Role = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    navigate,
    workMode,
    showModal,
    roleEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    navigate('/auth/login');

  const { roleList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  useEffect(() => {
    apiRole.getAllRoles(dispatch, accessToken);
  }, []);

  const handleShowDeleteModal = useCallback((roleId, roleName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${roleName} khỏi hệ thống không?`,
      () => {
        apiRole.deleteRole(dispatch, roleId, accessToken);
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
        <RoleForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <RoleForm
          role={roleEdit}
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
      <RoleTable
        roleList={roleList}
        handleSetUpdateMode={role => action.setUpdateMode(role)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default Role;
