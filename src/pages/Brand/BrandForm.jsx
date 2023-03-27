import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import content from './content';
import apiBrand from '../../apis/product/brand.api';
import apiUpload from '../../apis/upload.api';

import ModalForm from '../../components/common/ModalForm';
import Form from '../../components/validation/Form';
import InputImage from '../../components/validation/InputImage';
import TextInput from '../../components/validation/TextInput';

import { makeToast, toastType } from '../../utils/makeToast';
import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';

const BrandForm = ({ brand, handleBack }) => {
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
    formData.append('file', data.logo, data.logo.name);
    const promise = new Promise((resolve, reject) => {
      const result = apiUpload.uploadImage(dispatch, formData, accessToken);
      if (result) resolve(result);
      reject(new Error('Cannot upload images!'));
    });

    const newBrand = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    promise
      .then(result => {
        newBrand.logo = result;
        apiBrand.create(dispatch, newBrand, accessToken);
        reset();
        handleBack();
      })
      .catch(err => makeToast(content.error.upload, toastType.error));
  };

  const handleSaveData = data => {
    let promise;
    if (data.logo !== brand.logo) {
      const formData = new FormData();
      formData.append('file', data.logo, data.logo.name);
      // upload new image
      promise = new Promise((resolve, reject) => {
        const result = apiUpload.uploadImage(dispatch, formData, accessToken);
        if (result) resolve(result);
        reject(new Error('Cannot upload images!'));
      });
    }

    const updateBrand = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    if (promise) {
      promise
        .then(result => {
          updateBrand.logo = result;
          apiBrand.update(dispatch, updateBrand, brand.id, accessToken);
          handleBack();
        })
        .catch(err => makeToast(content.error.upload, toastType.error));
    } else {
      apiBrand.update(dispatch, updateBrand, brand.id, accessToken);
      handleBack();
    }
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={brand ? handleSaveData : handleCreateData}
      cancelAction={handleBack}
    >
      <TextInput
        label={content.form.name}
        register={register}
        errors={errors}
        attribute="name"
        defaultValue={brand?.name}
        placeholder="ASUS, ACER, DELL, ..."
        required
        errorMessage={content.error.name}
      />
      <TextInput
        label={content.form.country}
        register={register}
        errors={errors}
        attribute="country"
        defaultValue={brand?.country}
        placeholder="China, USA, ..."
        required
        errorMessage={content.error.country}
      />
      <TextInput
        label={content.form.establishDate}
        register={register}
        errors={errors}
        type="date"
        attribute="establishDate"
        defaultValue={new Date(brand?.establishDate || '2000-01-01')
          .toISOString()
          .slice(0, 10)}
      />
      <InputImage
        label={content.form.logo}
        control={control}
        errors={errors}
        name="logo"
        defaultValue={brand?.logo}
        required
      />
    </Form>
  );

  return (
    <ModalForm object={brand} disabledFotter>
      {renderForm}
    </ModalForm>
  );
};

export default BrandForm;
