import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalForm from '../../components/common/ModalForm';
import { Form, TextInput } from '../../components/validation';

import { labelService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
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
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  const handleCreateData = async data => {
    const newLabel = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    await labelService.create(dispatch, newLabel, accessToken);
    handleBack();
  };

  const handleSaveData = async data => {
    const newData = { ...label, ...data };
    if (isEqualObject(label, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    const newLabel = {
      ...data,
      ...getUpdateByUserInSystem()
    };
    await labelService.update(dispatch, newLabel, label.id, accessToken);
    handleBack();
  };

  return (
    <ModalForm object={label} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={label ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <div>
          <a
            className="mx-2 mb-3 text-primary text-decoration-none"
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
    </ModalForm>
  );
};

export default LabelForm;
