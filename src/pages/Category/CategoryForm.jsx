import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalForm from '../../components/common/ModalForm';
import { Form, InputImage, TextInput } from '../../components/validation';

import { categoryService, uploadService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
import content from './content';

const CategoryForm = ({ category, show, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (show) reset(category);
    else reset();
  }, [show]);

  const handleCreateData = async data => {
    const newCategory = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    try {
      const result = await uploadService.cloudinarySingle(
        data.image,
        'categories'
      ); // public_id, url, secure_url, format
      newCategory.image = result.secure_url;
      await categoryService.create(dispatch, newCategory, accessToken);
      handleBack();
    } catch (err) {
      makeToast(content.error.upload, toastType.error);
    }
  };

  const handleSaveData = async data => {
    const newData = { ...category, ...data };
    if (isEqualObject(category, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    try {
      if (data.image !== category.image) {
        const result = await uploadService.cloudinarySingle(
          data.image,
          'categories'
        );
        newData.image = result.secure_url;
      }
      const updateCategory = {
        ...newData,
        ...getUpdateByUserInSystem()
      };
      await categoryService.update(
        dispatch,
        updateCategory,
        category.id,
        accessToken
      );
      handleBack();
    } catch (err) {
      makeToast(content.error.upload, toastType.error);
    }
  };

  return (
    <ModalForm show={show} object={category} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={category ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <TextInput
          label={content.form.name}
          register={register}
          errors={errors}
          attribute="name"
          defaultValue={category?.name}
          placeholder="Laptop, Screen, Speaker, Keyboard, ..."
          required
          errorMessage={content.error.name}
        />
        <TextInput
          label={content.form.description}
          register={register}
          errors={errors}
          attribute="description"
          defaultValue={category?.description}
          placeholder="Properties, Status, Base model ?"
        />
        <InputImage
          label={content.form.image}
          control={control}
          errors={errors}
          name="image"
          defaultValue={category?.image}
          required
        />
      </Form>
    </ModalForm>
  );
};

export default CategoryForm;
