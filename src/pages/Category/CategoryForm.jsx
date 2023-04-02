import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { categoryService, uploadService } from '../../services';

import ModalForm from '../../components/common/ModalForm';
// TODO: Build validate form
import { Form, InputImage, TextInput } from '../../components/validation';

import { makeToast, toastType } from '../../utils/makeToast';
import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';
import content from './content';

const CategoryForm = ({ category, handleBack }) => {
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
      makeToast('Vui lòng cập nhật đầy đủ thông tin!', toastType.error);
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
      .then(result => {
        newCategory.image = result;
        categoryService.create(dispatch, newCategory, accessToken);
        reset();
        handleBack();
      })
      .catch(err => makeToast(content.error.upload, toastType.error));
  };

  const handleSaveData = data => {
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
        .then(result => {
          updateCategory.image = result;
          categoryService.update(
            dispatch,
            updateCategory,
            category.id,
            accessToken
          );
          handleBack();
        })
        .catch(err => makeToast(content.error.upload, toastType.error));
    } else {
      categoryService.update(
        dispatch,
        updateCategory,
        category.id,
        accessToken
      );
      handleBack();
    }
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={category ? handleSaveData : handleCreateData}
      cancelAction={handleBack}
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
  );

  return (
    <ModalForm object={category} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default CategoryForm;
