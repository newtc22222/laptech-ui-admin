import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Accordion, ModalForm, Loading } from '../../components/common';
import {
  Form,
  SeletedInputBox,
  TextInput,
  DescriptionBox,
  SpecificationTable
} from '../../components/validation';

import { productService } from '../../services';
import {
  chooseFieldsOfObject,
  createSlug,
  getUpdateByUserInSystem,
  isEqualObject
} from '../../utils';
import content from './content';

// 1: brand, category
// n: image, label, discount
const ProductForm = ({ product, handleBack, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const { brandList, categoryList } = props;
  const brandOptions = chooseFieldsOfObject(brandList, ['id', 'name']).map(
    i => {
      return { id: i.id, label: i.name };
    }
  );
  const categoryOptions = chooseFieldsOfObject(categoryList, [
    'id',
    'name'
  ]).map(i => {
    return { id: i.id, label: i.name };
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  const handleCreateData = data => {
    data.id = createSlug(data.name.slice(0, data.name.indexOf('/')));
    data.brandId = data.brand[0].id;
    data.categoryId = data.category[0].id;
    console.log(data);
  };

  const handleSaveData = data => {
    data.brandId = data.brand[0].id;
    data.categoryId = data.category[0].id;
    console.log(data);
  };

  const configContent = [
    {
      header: content.form.basicInformation,
      body: (
        <>
          <TextInput
            attribute="id"
            label={content.form.id}
            register={register}
            errors={errors}
            defaultValue={product?.id}
            placeholder="laptop-abc-core-i3-8560U-..."
            readOnly={product}
          />
          <TextInput
            attribute="name"
            label={content.form.name}
            register={register}
            errors={errors}
            defaultValue={product?.name}
            placeholder="Laptop ABC Core i3-8560U/..."
            required
            errorMessage={content.error.name}
          />
          <SeletedInputBox
            name="brand"
            control={control}
            errors={errors}
            label={content.form.brandChoice}
            placeholder="Choose brand..."
            required
            getValues={getValues}
            errorMessage=""
            defaultValue={
              product?.brandId &&
              brandOptions.filter(b => b.id === product.brandId)[0]
            }
            options={brandOptions}
          />
          <SeletedInputBox
            name="category"
            control={control}
            errors={errors}
            label={content.form.categoryChoice}
            className="mt-3"
            placeholder="Choose category..."
            required
            getValues={getValues}
            errorMessage=""
            defaultValue={
              product?.categoryId &&
              categoryOptions.filter(b => b.id === product.categoryId)[0]
            }
            options={categoryOptions}
          />
        </>
      ),
      isActive: true
    },
    {
      header: content.form.specifications,
      body: (
        <SpecificationTable
          control={control}
          errors={errors}
          getValues={getValues}
          name="specifications"
          defaultValue={product?.specifications}
        />
      ),
      isActive: false
    },
    {
      header: content.form.descriptionDetail,
      body: (
        <DescriptionBox
          control={control}
          errors={errors}
          getValues={getValues}
          name="descriptionDetail"
          defaultValue={product?.descriptionDetail}
        />
      ),
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
