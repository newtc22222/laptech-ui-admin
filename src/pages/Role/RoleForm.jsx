import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/common/ModalForm';

import apiRoles from '../../apis/role.api';

import { addToast } from '../../redux-feature/toast_notify';
import { getUpdateByUserInSystem } from '../../helper/getUser';

const titleName = 'Tiêu đề (hiển thị trực tiếp)';
const titleDescription = 'Thông tin chi tiết về phân quyền';

const RoleForm = ({ role, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const descriptionRef = useRef();

  const handleCreateData = async () => {
    try {
      const newRole = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        ...getUpdateByUserInSystem()
      };

      await apiRoles.createNewRole(dispatch, newRole, accessToken);
      handleBack();
    } catch (err) {
      console.log(err);
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Không thể tạo thông tin phân quyền mới!'
        })
      );
    }
  };

  const handleSaveData = async () => {
    try {
      const newRole = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        modifiedDate: new Date().toISOString(),
        ...getUpdateByUserInSystem()
      };
      await apiRoles.updateRole(dispatch, newRole, role.id, accessToken);
      handleBack();
    } catch (err) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Không thể cập nhật thông tin phân quyền!'
        })
      );
    }
  };

  return (
    <ModalForm
      object={role}
      handleBack={handleBack}
      action={() => {
        role ? handleSaveData() : handleCreateData();
      }}
      FormContent={() => (
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
      )}
    />
  );
};

export default RoleForm;
