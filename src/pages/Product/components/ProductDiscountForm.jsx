import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, TransferList } from '../../../components/common';
import { Form } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { discountService, productDiscountService } from '../../../services';
import {
  getCurrencyString,
  formatDateTime,
  makeToast,
  toastType
} from '../../../utils';
import content from '../content';

const renderOption = discount => {
  return (
    <div className="mb-2">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-1">
          <li className="breadcrumb-item">{discount.code}</li>
          <li className="breadcrumb-item">
            <span className="fw-bold text-success">
              {discount.rate * 100 + '%'}
            </span>
            {' - '}
            <span className="text-danger">
              {getCurrencyString(discount.maxAmount, 'vi-VN', 'VND')}
            </span>
          </li>
        </ol>
      </nav>
      <div className="fw-bold">
        {formatDateTime(discount.appliedDate) +
          ' - ' +
          formatDateTime(discount.endedDate)}
      </div>
    </div>
  );
};

const ProductDiscountForm = ({ product, handleBack, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    data: discountList,
    isFetching,
    error
  } = useSelector(state => state['discounts']);

  const { data: discountListOfProduct } = useFetch(
    `/products/${product.id}/discounts`
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting }
  } = useForm({
    defaultValues: {
      discountList: discountListOfProduct || []
    }
  });

  useEffect(() => {
    if (!discountList || error) discountService.getAll(dispatch);
  }, []);

  useEffect(() => {
    if (discountListOfProduct) {
      reset({
        discountList: discountListOfProduct.map(discount => ({
          id: discount.id,
          value: discount.code,
          render: renderOption(discount)
        }))
      });
    }
  }, [discountListOfProduct]);

  const handleSaveData = data => {
    const oldData = discountListOfProduct.map(d => d.id);
    const newData = data.discountList.map(d => d.id);
    const removeDiscount = _.differenceWith(oldData, newData, _.isEqual);
    const addDiscount = _.differenceWith(newData, oldData, _.isEqual);

    if (removeDiscount.length === 0 && addDiscount.length === 0) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    productDiscountService.updateMultiple(
      dispatch,
      { addList: addDiscount, removeList: removeDiscount },
      product.id,
      accessToken
    );
    handleBack();
  };

  if (!discountListOfProduct || isFetching) return <></>;

  return (
    <ModalForm
      object={product}
      title={content.form_discount.title}
      disabledFooter
    >
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
        isDirty={isDirty}
        isSubmitting={isSubmitting}
      >
        <Controller
          control={control}
          name="discountList"
          render={({ field: { value, onChange } }) => {
            const optionConfig = discountList
              .filter(d => new Date(d.endedDate).getTime() > Date.now())
              .map(d => ({
                id: d.id,
                value: d.code,
                render: renderOption(d)
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

export default ProductDiscountForm;
