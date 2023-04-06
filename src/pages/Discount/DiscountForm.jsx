import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalForm from '../../components/common/ModalForm';
import { Form, TextInput, RadioBox } from '../../components/validation';

import { discountService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
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
      makeToast(content.error.missing, toastType.error);
    }
  }, [errors]);

  const handleCreateData = data => {
    if (data.appliedDate >= data.endedDate) {
      makeToast(content.error.dateConflict, toastType.error);
      return;
    }

    data.rate /= 100;
    data.maxAmount = +data.maxAmount;
    const newDiscount = {
      ...data,
      ...getUpdateByUserInSystem()
    };
    discountService.create(dispatch, newDiscount, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    if (data.appliedDate >= data.endedDate) {
      makeToast(content.error.dateConflict, toastType.error);
      return;
    }

    // special data
    data.rate /= 100;
    data.maxAmount = +data.maxAmount;

    const newData = { ...discount, ...data };
    if (isEqualObject(discount, newData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    const newDiscount = {
      ...data,
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
            <TextInput
              label={content.form.rate}
              register={register}
              errors={errors}
              attribute="rate"
              defaultValue={discount?.rate * 100 || 5}
              type="number"
              min="0"
              max="80"
              required
              errorMessage={content.error.rate}
              errorMessageForMin={content.error.minRate}
              errorMessageForMax={content.error.maxRate}
            />
          </div>
          <div className="col-8 mb-3">
            <TextInput
              label={content.form.maxAmount}
              register={register}
              errors={errors}
              attribute="maxAmount"
              defaultValue={discount?.maxAmount || 50_000}
              type="number"
              min="0"
              max={100_000_000}
              required
              errorMessage={content.error.maxAmount}
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-uppercase">{content.form.time}</legend>
        <div className="row">
          <div className="col mb-3">
            <TextInput
              label={content.form.appliedDate}
              register={register}
              errors={errors}
              attribute="appliedDate"
              defaultValue={
                discount?.appliedDate ||
                new Date().toJSON().slice(0, 11) + '00:00'
              }
              type="datetime-local"
              min={new Date().toJSON().slice(0, 11) + '00:00'}
              required
              errorMessage={content.error.appliedDate}
            />
          </div>
          <div className="col mb-3">
            <TextInput
              label={content.form.endedDate}
              register={register}
              errors={errors}
              attribute="endedDate"
              defaultValue={
                discount?.endedDate ||
                new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
                  .toJSON()
                  .slice(0, 11) + '00:00'
              }
              type="datetime-local"
              min={
                new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
                  .toJSON()
                  .slice(0, 11) + '00:00'
              }
              required
              errorMessage={content.error.endedDate}
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
