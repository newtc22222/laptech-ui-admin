import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, Loading } from '../../../components/common';

import { discountService, productService } from '../../../services';
import { Form, CheckBoxGroup } from '../../../components/validation';
import content from '../content';

const ProductDiscountForm = ({ product, handleBack, ...props }) => {
  const {
    data: discountList,
    isFetching,
    error
  } = useSelector(state => state['discounts']);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!discountList || error) discountService.getAll(dispatch);
  }, []);

  const handleSaveData = data => {
    console.log(data);
  };

  const renderForm = () => {
    if (isFetching) return <Loading />;

    const configOption = discountList
      ? discountList
          .filter(d => d.appliedType === 'PRODUCT')
          .map(d => {
            return {
              id: d.id,
              label: d.code,
              render: <span className="fw-bold">{d.code}</span>
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
          name="discountList"
          options={configOption}
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
