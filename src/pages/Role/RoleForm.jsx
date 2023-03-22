import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalForm from '../../components/common/ModalForm';

import apiRole from '../../apis/role.api';

import { getUpdateByUserInSystem } from '../../helper/getUser';

const titleName = 'Tiêu đề (hiển thị trực tiếp)';
const titleDescription = 'Thông tin chi tiết về phân quyền';

const RoleForm = ({ role, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const descriptionRef = useRef();

  const handleCreateData = async () => {
    const newRole = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      ...getUpdateByUserInSystem()
    };

    await apiRole.create(dispatch, newRole, accessToken);
    handleBack();
  };

  const handleSaveData = async () => {
    const newRole = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      modifiedDate: new Date().toISOString(),
      ...getUpdateByUserInSystem()
    };
    await apiRole.update(dispatch, newRole, role.id, accessToken);
    handleBack();
  };

  const renderForm = (
    <>
      <div className="mb-3">
        <label htmlFor="role-name" className="form-role">
          {titleName}
        </label>
        <input
          type="text"
          className="form-control"
          id="role-name"
          defaultValue={role?.name}
          ref={nameRef}
          placeholder="STAFF, SUPERVISOR, DBA, KAREN?"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role-description" className="form-role">
          {titleDescription}
        </label>
        <textarea
          className="form-control"
          id="role-description"
          defaultValue={role?.description}
          ref={descriptionRef}
          placeholder="The person who can controll fire and water?"
        />
      </div>
    </>
  );

  return (
    <ModalForm
      object={role}
      handleBack={handleBack}
      action={() => {
        role ? handleSaveData() : handleCreateData();
      }}
    >
      {renderForm}
    </ModalForm>
  );
};

export default RoleForm;
