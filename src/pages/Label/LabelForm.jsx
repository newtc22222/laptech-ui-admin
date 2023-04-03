import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { labelService } from '../../services';

import ModalForm from '../../components/common/ModalForm';
import { Form, TextInput } from '../../components/validation';

import { makeToast, toastType } from '../../utils/makeToast';
import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';
import content from './content';

/**
 * @since 2023-02-13
 */
const LabelForm = ({ label, handleBack }) => {
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
      makeToast('Vui lòng cập nhật đầy đủ thông tin!', toastType.error);
    }
  }, [errors]);

  const handleCreateData = data => {
    const newLabel = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    labelService.create(dispatch, newLabel, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    const newLabel = {
      ...data,
      ...getUpdateByUserInSystem()
    };
    labelService.update(dispatch, newLabel, label.id, accessToken);
    reset();
    handleBack();
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={label ? handleSaveData : handleCreateData}
      cancelAction={handleBack}
    >
      <div>
        <a
          className="mx-2 mb-2 text-primary text-decoration-none"
          href={content.form.linkChooseIcon}
          target="_blank"
        >
          {content.form.hintChooseIcon}
        </a>
        <TextInput
          label={content.form.icon}
          register={register}
          errors={errors}
          attribute="icon"
          defaultValue={label?.icon}
          placeholder="<i class='bi bi-house'></i>"
          required
          errorMessage={content.error.icon}
        />
      </div>
      <TextInput
        label={content.form.name}
        register={register}
        errors={errors}
        attribute="name"
        defaultValue={label?.name}
        placeholder="Core i3, Core i5, NVIDIA, Led RGB, ..."
        required
        errorMessage={content.error.name}
      />
      <TextInput
        label={content.form.title}
        register={register}
        errors={errors}
        attribute="title"
        defaultValue={label?.title}
        placeholder="Core i3 8560U ..."
        required
        errorMessage={content.error.title}
      />
      <TextInput
        label={content.form.description}
        register={register}
        errors={errors}
        attribute="description"
        defaultValue={label?.description}
        placeholder="New Core i3 8th generation with safe battery mode ..."
        errorMessage={content.error.title}
      />
    </Form>
  );

  return (
    <ModalForm object={label} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default LabelForm;
