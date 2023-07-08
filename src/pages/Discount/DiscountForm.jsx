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

const DiscountForm = ({ discount, show, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (show) {
      const discountClone = window.structuredClone(discount);
      if (!!discount) {
        discountClone.rate = discount.rate * 100;
      }
      reset(discountClone);
    } else reset();
  }, [show]);

  const handleCreateData = async data => {
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
    await discountService.create(dispatch, newDiscount, accessToken);
    handleBack();
  };

  const handleSaveData = async data => {
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
    await discountService.update(
      dispatch,
      newDiscount,
      discount.id,
      accessToken
    );
    handleBack();
  };

  return (
    <ModalForm show={show} object={discount} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={discount ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
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
          options={content.appliedTypes}
        />
        <fieldset>
          <legend className="text-uppercase">
            {content.form.discountRange}
          </legend>
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
    </ModalForm>
  );
};

export default DiscountForm;
