import React from 'react';
import { useForm } from 'react-hook-form';

import { ModalForm, Loading } from '../../../components/common';

import { productService } from '../../../services';
import { Form, InputMultipleImage } from '../../../components/validation';
import content from '../content';

const ProductImageForm = ({ product, handleBack, ...props }) => {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  const handleSaveData = data => {
    console.log(data);
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={handleSaveData}
      cancelAction={handleBack}
    >
      <InputMultipleImage
        className="mb-3"
        label={'Chọn hình ảnh'}
        control={control}
        errors={errors}
        name="image"
        required
        getValues={getValues}
      />
    </Form>
  );

  return (
    <ModalForm object={product} title={content.form_image.title} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default ProductImageForm;
