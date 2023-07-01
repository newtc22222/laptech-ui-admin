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

const CategoryForm = ({ category, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast(content.error.missing, toastType.error);
    }
  }, [errors]);

  const handleCreateData = data => {
    const formData = new FormData();
    formData.append('file', data.image, data.image.name);
    const promise = new Promise((resolve, reject) => {
      const result = uploadService.uploadImage(dispatch, formData, accessToken);
      if (result) resolve(result);
      reject(new Error('Cannot upload images!'));
    });

    const newCategory = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    promise
      .then(async result => {
        newCategory.image = result;
        await categoryService.create(dispatch, newCategory, accessToken);
        handleBack();
      })
      .catch(err => makeToast(content.error.upload, toastType.error));
  };

  const handleSaveData = async data => {
    const newData = { ...category, ...data };
    if (isEqualObject(category, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    let promise;
    if (data.image !== category.image) {
      const formData = new FormData();
      formData.append('file', data.image, data.image.name);
      promise = new Promise((resolve, reject) => {
        const result = uploadService.uploadImage(
          dispatch,
          formData,
          accessToken
        );
        if (result) resolve(result);
        reject(new Error('Cannot upload images!'));
      });
    }

    const updateCategory = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    if (promise) {
      promise
        .then(async result => {
          updateCategory.image = result;
          await categoryService.update(
            dispatch,
            updateCategory,
            category.id,
            accessToken
          );
          handleBack();
        })
        .catch(err => makeToast(content.error.upload, toastType.error));
    } else {
      await categoryService.update(
        dispatch,
        updateCategory,
        category.id,
        accessToken
      );
      handleBack();
    }
  };

  return (
    <ModalForm object={category} disabledFooter>
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
