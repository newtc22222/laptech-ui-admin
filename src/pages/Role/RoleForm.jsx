import React from 'react';
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
    formState: { errors, isSubmitting, isDirty }
  } = useForm();

  const handleCreateData = async data => {
    const newRole = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    await roleService.create(dispatch, newRole, accessToken);
    handleBack();
  };

  const handleSaveData = async data => {
    const newData = { ...role, ...data };
    if (isEqualObject(role, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    const newRole = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    await roleService.update(dispatch, newRole, role.id, accessToken);
    handleBack();
  };
  return (
    <ModalForm object={role} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={role ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <TextInput
          label={content.form.name}
          register={register}
          errors={errors}
          attribute="name"
          defaultValue={role?.name}
          placeholder="STAFF, SUPERVISOR, DBA, KAREN?"
          readOnly={content.fixedRole.includes(role?.name)}
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
    </ModalForm>
  );
};

export default RoleForm;
