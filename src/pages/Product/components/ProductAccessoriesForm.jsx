import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, TransferList } from '../../../components/common';
import { Form } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { productService, productAccessoriesService } from '../../../services';
import { makeToast, toastType, getCurrencyString } from '../../../utils';
import content from '../content';

const renderOption = (brandList, categoryList, accessory) => {
  return (
    <div>
      <div className="fw-bold">
        {content.form_accessory.name + accessory.name}
      </div>
      <div>
        {content.form_accessory.brand +
          brandList.filter(b => b.id === accessory.brandId)[0]?.name ||
          'default'}
      </div>
      <div>
        {content.form_accessory.category +
          categoryList.filter(c => c.id === accessory.categoryId)[0]?.name ||
          'default'}
      </div>
      <div>
        {content.form_accessory.price +
          getCurrencyString(accessory.listedPrice, 'vi-VN', 'VND')}
      </div>
    </div>
  );
};

const ProductAccessoriesForm = ({
  product,
  handleBack,
  brandList,
  categoryList,
  ...rest
}) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    data: productList,
    isFetching,
    error
  } = useSelector(state => state['products']);

  const { data: accessoriesOfProduct } = useFetch(
    `/products/${product.id}/accessories`
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    defaultValues: {
      accessoryList: accessoriesOfProduct || []
    }
  });

  useEffect(() => {
    if (!productList || error) productService.getAll(dispatch);
  }, [productList, error, dispatch]);

  useEffect(() => {
    if (accessoriesOfProduct) {
      reset({
        accessoryList: accessoriesOfProduct.map(product => ({
          id: product.id,
          value: product.name,
          render: renderOption(brandList, categoryList, product)
        }))
      });
    }
  }, [accessoriesOfProduct]);

  const handleSaveData = async data => {
    const oldData = accessoriesOfProduct.map(p => p.id);
    const newData = data.accessoryList.map(p => p.id);
    const removeList = _.differenceWith(oldData, newData, _.isEqual);
    const addList = _.differenceWith(newData, oldData, _.isEqual);

    if (removeList.length === 0 && addList.length === 0) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    await productAccessoriesService.updateMultiple(
      dispatch,
      { addList: addList, removeList: removeList },
      product.id,
      accessToken
    );
    handleBack();
  };

  if (!accessoriesOfProduct || isFetching) return <></>;

  return (
    <ModalForm
      object={product}
      title={content.form_accessory.title}
      disabledFooter
    >
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <h4 className="mb-3">{product.name}</h4>
        <Controller
          control={control}
          name="accessoryList"
          render={({ field: { value, onChange } }) => {
            const optionConfig = productList
              .filter(p => p.brandId === product.brandId)
              .map(p => ({
                id: p.id,
                value: p.name,
                render: renderOption(brandList, categoryList, p)
              }));
            return (
              <TransferList
                options={optionConfig}
                choiceList={value}
                setChoiceList={onChange}
              />
            );
          }}
        />
      </Form>
    </ModalForm>
  );
};

export default ProductAccessoriesForm;
