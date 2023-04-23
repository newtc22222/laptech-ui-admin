import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, Loading } from '../../../components/common';
import { Form, CheckBoxGroup } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { discountService, productDiscountService } from '../../../services';
import {
  getCurrencyString,
  formatDateTime,
  makeToast,
  toastType
} from '../../../utils';
import content from '../content';

const ProductDiscountForm = ({ product, handleBack, ...props }) => {
  const {
    data: discountList,
    isFetching,
    error
  } = useSelector(state => state['discounts']);
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const { data: discountListOfProduct } = useFetch(
    `/products/${product.id}/discounts`
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!discountList || error) discountService.getAll(dispatch);
  }, []);

  if (!discountListOfProduct) return <></>;

  const handleSaveData = data => {
    const oldData = discountListOfProduct.map(d => d.id);
    const newData = data.discountList.map(d => d.id);
    const removeDiscount = _.differenceWith(oldData, newData, _.isEqual);
    const addDiscount = _.differenceWith(newData, oldData, _.isEqual);

    console.log(removeDiscount);
    console.log(addDiscount);

    if (removeDiscount.length === 0 && addDiscount.length === 0) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    // handle change
    removeDiscount.forEach(discountId => {
      productDiscountService.remove(
        dispatch,
        { discountId: discountId },
        product.id,
        accessToken
      );
    });

    addDiscount.forEach(discountId => {
      productDiscountService.add(
        dispatch,
        { discountId: discountId },
        product.id,
        accessToken
      );
    });
  };

  const renderOption = d => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb ps-2">
          <li className="breadcrumb-item">{d.code}</li>
          <li className="breadcrumb-item">
            <span className="fw-bold text-success">{d.rate * 100 + '%'}</span>
            {' - '}
            <span className="text-danger">
              {getCurrencyString(d.maxAmount, 'vi-VN', 'VND')}
            </span>
          </li>
          <li className="breadcrumb-item fw-bold">
            {formatDateTime(d.appliedDate) +
              ' - ' +
              formatDateTime(d.endedDate)}
          </li>
        </ol>
      </nav>
    );
  };

  const renderForm = () => {
    if (isFetching) return <Loading />;

    const configOption = discountList
      ? discountList
          .filter(d => d.appliedType === 'PRODUCT')
          .filter(d => new Date(d.endedDate) > Date.now())
          .map(d => {
            return {
              id: d.id,
              label: d.code,
              className: 'my-1',
              render: renderOption(d)
            };
          })
      : [];

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
          name="discountList"
          options={configOption}
          defaultValue={discountListOfProduct.map(d => {
            return {
              id: d.id,
              label: d.code,
              className: 'my-1',
              render: renderOption(d)
            };
          })}
          searchBar
          useSwitch
        />
      </Form>
    );
  };

  return (
    <ModalForm
      object={product}
      title={content.form_discount.title}
      disabledFooter
    >
      {renderForm()}
    </ModalForm>
  );
};

export default ProductDiscountForm;
