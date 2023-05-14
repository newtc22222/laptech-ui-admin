import React, { useEffect } from 'react';
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
  makeToast,
  toastType
} from '../../utils';
import content from './content';

// 1: brand, category
// n: image, label, discount
const ProductForm = ({ product, handleBack, brandList, categoryList, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  
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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast(content.error.missing, toastType.error);
    }
  }, [errors]);

  const handleCreateData = data => {
    const newProduct = {
      id: createSlug(data.name.slice(0, data.name.indexOf('/'))),
      brandId: data.brand[0].id,
      categoryId: data.category[0].id,
      name: data.name,
      releasedDate: data.releasedDate,
      quantityInStock: 0,
      listedPrice: data.listedPrice,
      specifications:
        data.specifications.length > 1
          ? JSON.stringify(data.specifications)
          : undefined,
      descriptionDetail: JSON.stringify(data.descriptionDetail),
      ...getUpdateByUserInSystem()
    };
    productService.create(dispatch, newProduct, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    const newProduct = {
      id: data.id,
      brandId: data.brand[0].id,
      categoryId: data.category[0].id,
      name: data.name,
      releasedDate: data.releasedDate,
      quantityInStock: 0, // fixed
      listedPrice: data.listedPrice,
      specifications:
        data.specifications.length > 1
          ? JSON.stringify(data.specifications)
          : undefined,
      descriptionDetail: JSON.stringify(data.descriptionDetail),
      ...getUpdateByUserInSystem()
    };
    productService.update(dispatch, newProduct, product.id, accessToken);
    reset();
    handleBack();
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
          <TextInput
            attribute="releasedDate"
            label={content.form.releasedDate}
            register={register}
            errors={errors}
            getValues={getValues}
            type="date"
            className="mt-3"
            defaultValue={product?.releasedDate}
            required
            errorMessage={content.error.releasedDate}
          />
          <TextInput
            attribute="listedPrice"
            label={content.form.listedPrice}
            register={register}
            errors={errors}
            getValues={getValues}
            type="number"
            className="mt-3"
            defaultValue={product?.listedPrice}
            min={'0'}
            required
            errorMessage={content.error.listedPrice}
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
      isActive: !!product?.specifications
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

  const MainForm = () => {
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
      <MainForm />
    </ModalForm>
  );
};

export default ProductForm;
