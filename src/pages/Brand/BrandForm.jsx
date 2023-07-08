import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalForm } from '../../components/common';
import { Form, InputImage, TextInput } from '../../components/validation';

import { brandService, uploadService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
import content from './content';

const BrandForm = ({ brand, show, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm();

  useEffect(() => {
    if (show) reset(brand);
    else reset();
  }, [show]);

  const handleCreateData = async data => {
    const newBrand = {
      ...data,
      ...getUpdateByUserInSystem()
    };

    try {
      const result = await uploadService.cloudinarySingle(data.logo, 'brands'); // public_id, url, secure_url, format
      newBrand.logo = result.secure_url;
      await brandService.create(dispatch, newBrand, accessToken);
      handleBack();
    } catch (err) {
      makeToast(content.error.upload, toastType.error);
    }
  };

  const handleSaveData = async data => {
    const newData = { ...brand, ...data };
    if (isEqualObject(brand, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    try {
      if (data.logo !== brand.logo) {
        const result = await uploadService.cloudinarySingle(
          data.logo,
          'brands'
        ); // public_id, url, secure_url, format
        newData.logo = result.secure_url;
      }
      const updateBrand = {
        ...newData,
        ...getUpdateByUserInSystem()
      };
      await brandService.update(dispatch, updateBrand, brand.id, accessToken);
      handleBack();
    } catch (err) {
      makeToast(content.error.upload, toastType.error);
    }
  };

  return (
    <ModalForm show={show} object={brand} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={brand ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
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
          required
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
    </ModalForm>
  );
};

export default BrandForm;
