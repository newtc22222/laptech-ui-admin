import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { Accordion } from 'react-bootstrap';

import { Accordion, ModalForm, Loading } from '../../components/common';
// TODO: Build validate form
import { Form, InputImage, TextInput } from '../../components/validation';
import { DescriptionBox, SpecificationTable } from './ProductEditBox';

import { productService } from '../../services';
import { getUpdateByUserInSystem, isEqualObject } from '../../utils';
import content from './content';

// 1: brand, category
// n: image, label, discount
const ProductForm = ({ product, handleBack, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const { brandList, categoryList } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleCreateData = async () => {};

  const handleSaveData = async () => {};

  const configContent = [
    {
      header: content.form.basicInformation,
      body: <></>,
      isActive: true
    },
    {
      header: content.form.specifications,
      body: <SpecificationTable />,
      isActive: false
    },
    {
      header: content.form.descriptionDetail,
      body: <DescriptionBox />,
      isActive: true
    }
  ];

  const renderForm = () => {
    if (!brandList || !categoryList) return <Loading />;
    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={product ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
      >
        <Accordion configContent={configContent} />
      </Form>
    );
  };

  return (
    <ModalForm object={product} disabledFooter>
      {renderForm()}
    </ModalForm>
  );
};

export default ProductForm;
