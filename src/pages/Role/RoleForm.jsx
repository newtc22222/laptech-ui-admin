import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalForm from '../../components/common/ModalForm';
import { Form, AreaInput, TextInput } from '../../components/validation';

import { roleService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
import content from './content';

const RoleForm = ({ role, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast(content.error.missing, toastType.error);
    }
  }, [errors]);

  const handleCreateData = data => {
    const newRole = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    roleService.create(dispatch, newRole, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    const newData = { ...role, ...data };
    if (isEqualObject(role, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    const newRole = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    roleService.update(dispatch, newRole, role.id, accessToken);
    reset();
    handleBack();
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={role ? handleSaveData : handleCreateData}
      cancelAction={handleBack}
    >
      <TextInput
        label={content.form.name}
        register={register}
        errors={errors}
        attribute="name"
        defaultValue={role?.name}
        placeholder="STAFF, SUPERVISOR, DBA, KAREN?"
        required
        errorMessage={content.error.name}
      />
      <AreaInput
        label={content.form.description}
        register={register}
        errors={errors}
        attribute="description"
        defaultValue={role?.description}
        placeholder="STAFF, SUPERVISOR, DBA, KAREN?"
        required
        errorMessage={content.error.description}
      />
    </Form>
  );

  return (
    <ModalForm object={role} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default RoleForm;
