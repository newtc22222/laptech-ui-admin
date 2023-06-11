import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, Loading } from '../../../components/common';
import { Form, CheckBoxGroup } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { productService, productAccessoriesService } from '../../../services';
import { makeToast, toastType } from '../../../utils';
import content from '../content';

const ProductAccessoriesForm = ({
  product,
  handleBack,
  brandList,
  categoryList,
  ...rest
}) => {
  const {
    data: productList,
    isFetching,
    error
  } = useSelector(state => state['products']);
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const { data: accessoriesOfProduct } = useFetch(
    `/products/${product.id}/accessories`
  );

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!productList || error) productService.getAll(dispatch);
  }, [productList, error, dispatch]);

  if (!accessoriesOfProduct || !brandList || !categoryList) return <></>;

  const handleSaveData = data => {
    const oldData = accessoriesOfProduct.map(p => p.id);
    const newData = data.accessoryList.map(p => p.id);
    const removeList = _.differenceWith(oldData, newData, _.isEqual);
    const addList = _.differenceWith(newData, oldData, _.isEqual);

    if (removeList.length === 0 && addList.length === 0) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    productAccessoriesService.updateMultiple(
      dispatch,
      { addList: addList, removeList: removeList },
      product.id,
      accessToken
    );
    handleBack();
  };

  const renderOption = accessory => {
    return (
      <div>
        <div>{content.form_accessory.name + accessory.name}</div>
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
        <div>{content.form_accessory.price + accessory.listedPrice}</div>
      </div>
    );
  };

  const MainForm = () => {
    if (isFetching) return <Loading />;

    const mainProductList = productList || [];

    const configOption = mainProductList
      .filter(p => p.id !== product.id) // except this
      // .filter(p => p.categoryId !== product.categoryId) // except this type
      .filter(p => p.brandId === product.brandId) // same brand?
      .map(p => {
        return {
          id: p.id,
          name: p.name,
          className: 'my-1',
          render: renderOption(p)
        };
      });

    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
      >
        <CheckBoxGroup
          control={control}
          errors={errors}
          className="d-flex flex-column gap-1"
          name="accessoryList"
          options={configOption}
          defaultValue={accessoriesOfProduct.map(p => {
            return {
              id: p.id,
              name: p.name,
              className: 'my-1',
              render: renderOption(p)
            };
          })}
          searchBar
        />
      </Form>
    );
  };

  return (
    <ModalForm
      object={product}
      title={content.form_accessory.title}
      disabledFooter
    >
      <MainForm />
    </ModalForm>
  );
};

export default ProductAccessoriesForm;
