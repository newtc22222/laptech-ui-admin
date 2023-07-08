import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Accordion, ModalForm } from '../../components/common';
import {
  Form,
  SeletedInputBox,
  TextInput,
  DescriptionBox,
  SpecificationTable
} from '../../components/validation';

import { productService } from '../../services';
import { createSlug, getUpdateByUserInSystem } from '../../utils';
import content from './content';

// 1: brand, category
// n: image, label, discount
const ProductForm = ({
  product,
  show,
  handleBack,
  brandList,
  categoryList,
  ...props
}) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (show) reset(product);
    else reset();
  }, [show]);

  const handleCreateData = async data => {
    const newProduct = {
      id: createSlug(data.name.slice(0, data.name.indexOf('/'))),
      brandId: data.brandId.value,
      categoryId: data.categoryId.value,
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
    await productService.create(dispatch, newProduct, accessToken);
    handleBack();
  };

  const handleSaveData = async data => {
    const newData = {
      id: data.id,
      brandId: data.brandId.value || data.brandId,
      categoryId: data.categoryId.value || data.categoryId,
      name: data.name,
      releasedDate: data.releasedDate,
      quantityInStock: product.quantityInStock, // fixed
      listedPrice: data.listedPrice,
      specifications: data.specifications,
      descriptionDetail: data.descriptionDetail,
      ...getUpdateByUserInSystem()
    };

    if (!!data.specifications && typeof data.specifications !== 'string') {
      newData.specifications =
        data.specifications.length > 0
          ? JSON.stringify(data.specifications)
          : undefined;
    }
    if (
      !!data.descriptionDetail &&
      typeof data.descriptionDetail !== 'string'
    ) {
      newData.descriptionDetail = JSON.stringify(data.descriptionDetail);
    }
    await productService.update(dispatch, newData, product.id, accessToken);
    handleBack();
  };

  const configContent = [
    {
      header: content.form.basicInformation,
      body: (
        <>
          <div className="row border rounded-2 mx-1 mb-3">
            <div className="col-6">
              <Controller
                control={control}
                name="brandId"
                rules={{ required: 'Vui lòng cung cấp thương hiệu!' }}
                render={({ field: { value, onChange } }) => {
                  const brandOptions = brandList.map(b => ({
                    value: b.id,
                    label: b.name
                  }));
                  if (value !== undefined)
                    value = brandOptions.find(b => b.value === value);
                  return (
                    <div className="d-flex flex-column gap-1 p-2">
                      <div className="text-uppercase">{content.brand}</div>
                      <Select
                        className={
                          errors['brandId'] && 'border border-danger rounded'
                        }
                        placeholder={content.form.brandChoice}
                        options={brandOptions}
                        onChange={onChange}
                        value={value}
                      />
                      {errors['brandId'] && (
                        <span className="text-danger">
                          {errors['brandId'].message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="col-6">
              <Controller
                control={control}
                name="categoryId"
                rules={{ required: 'Vui lòng cung cấp phân loại!' }}
                render={({ field: { value, onChange } }) => {
                  const categoryOptions = categoryList.map(c => ({
                    value: c.id,
                    label: c.name
                  }));
                  if (value !== undefined)
                    value = categoryOptions.find(c => c.value === value);
                  return (
                    <div className="d-flex flex-column gap-1 p-2">
                      <div className="text-uppercase">{content.category}</div>
                      <Select
                        className={
                          errors['categoryId'] && 'border border-danger rounded'
                        }
                        placeholder={content.form.categoryChoice}
                        options={categoryOptions}
                        onChange={onChange}
                        value={value}
                      />
                      {errors['categoryId'] && (
                        <span className="text-danger">
                          {errors['categoryId'].message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </div>
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
          name="descriptionDetail"
          defaultValue={product?.descriptionDetail}
        />
      ),
      isActive: true
    }
  ];

  return (
    <ModalForm show={show} object={product} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={product ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <Accordion configContent={configContent} />
      </Form>
    </ModalForm>
  );
};

export default ProductForm;
