import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { discountService } from '../../services';

import ModalForm from '../../components/common/ModalForm';
// TODO: Build validate form
import { Form, TextInput, RadioBox } from '../../components/validation';

import { makeToast, toastType } from '../../utils/makeToast';
import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';
import content from './content';

const appliedTypes = ['PRODUCT', 'PURCHASE'];

const DiscountForm = ({ discount, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast('Vui lòng cập nhật đầy đủ thông tin!', toastType.error);
    }
  }, [errors]);

  const handleCreateData = data => {
    const newDiscount = {
      ...data,
      rate: data.rate / 100,
      ...getUpdateByUserInSystem()
    };
    discountService.create(dispatch, newDiscount, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    const newDiscount = {
      ...data,
      rate: data.rate / 100,
      ...getUpdateByUserInSystem()
    };
    discountService.update(dispatch, newDiscount, discount.id, accessToken);
    reset();
    handleBack();
  };

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={discount ? handleSaveData : handleCreateData}
      cancelAction={handleBack}
    >
      <TextInput
        label={content.form.code}
        register={register}
        errors={errors}
        attribute="code"
        defaultValue={discount?.code}
        placeholder="BANOIDUNGNGAI, LUONGDAVE, ..."
        required
        errorMessage={content.error.code}
      />
      <RadioBox
        className="border rounded-2 mb-2"
        title={content.form.appliedTypeTitle}
        control={control}
        name="appliedType"
        defaultValue={discount?.appliedType}
        options={appliedTypes}
      />
      <fieldset>
        <legend className="text-uppercase">{content.form.discountRange}</legend>
        <div className="row">
          <div className="col-4 mb-3">
            <label htmlFor="discount-rate" className="form-discount">
              {content.form.rate}
            </label>
            <input
              id="discount-rate"
              type="number"
              min="0"
              max="80"
              className="form-control"
              onChange={e => {
                if (e.target.value < 0) e.target.value = 0;
                if (e.target.value > 80) e.target.value = 80;
              }}
              defaultValue={discount?.rate * 100 || 5}
            />
          </div>
          <div className="col-8 mb-3">
            <label htmlFor="discount-max-amount" className="form-discount">
              {content.form.maxAmount}
            </label>
            <input
              id="discount-max-amount"
              type="number"
              min="0"
              className="form-control"
              onChange={e => {
                if (e.target.value < 0) e.target.value = 0;
              }}
              defaultValue={discount?.maxAmount || 50000}
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-uppercase">{content.form.time}</legend>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="discount-applied-date" className="form-discount">
              {content.form.appliedDate}
            </label>
            <input
              id="discount-applied-date"
              type="datetime-local"
              className="form-control"
              defaultValue={
                discount?.appliedDate || new Date().toJSON().slice(0, 19)
              }
            />
          </div>
          <div className="col mb-3">
            <label htmlFor="discount-ended-date" className="form-discount">
              {content.form.endedDate}
            </label>
            <input
              id="discount-ended-date"
              type="datetime-local"
              className="form-control"
              defaultValue={
                discount?.endedDate ||
                new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
                  .toJSON()
                  .slice(0, 19)
              }
            />
          </div>
        </div>
      </fieldset>
    </Form>
  );

  return (
    <ModalForm object={discount} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default DiscountForm;
