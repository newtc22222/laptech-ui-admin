import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalForm from '../../components/common/ModalForm';
import {
  CheckBox,
  Form,
  RadioBox,
  TextInput
} from '../../components/validation';

import { userService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
import content from './content';

const genderOptions = [
  {
    label: 'Nam',
    value: 'MALE'
  },
  {
    label: 'Nữ',
    value: 'FEMALE'
  },
  {
    label: 'Khác',
    value: 'OTHER'
  }
];

/**
 * @since 2023-02-14
 */
const UserForm = ({ user, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    control,
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
    console.log(data);
    handleBack();
  };

  const handleSaveData = data => {
    const newData = { ...user, ...data };
    console.log(newData);
    if (isEqualObject(user, data)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    handleBack();
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={user ? handleSaveData : handleCreateData}
      cancelAction={handleBack}
    >
      <TextInput
        label={content.form.name}
        register={register}
        errors={errors}
        attribute="name"
        defaultValue={user?.name}
        readOnly={user?.name}
        required
        errorMessage={content.error.name}
      />
      <TextInput
        label={content.form.phone}
        register={register}
        errors={errors}
        attribute="phone"
        defaultValue={user?.phone}
        readOnly={user?.phone}
      />
      <RadioBox
        className="border rounded-2 mb-2"
        title={content.form.gender}
        control={control}
        name="gender"
        defaultValue={user?.gender}
        options={genderOptions}
      />
      <CheckBox
        control={control}
        label={content.form.status}
        name="active"
        useSwitch
        checked={user?.active}
      />
    </Form>
  );

  return (
    <ModalForm object={user} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default UserForm;
