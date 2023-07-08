import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm } from '../../../components/common';
import { Form, TextInput } from '../../../components/validation';

import { bannerService } from '../../../services';
import {
  isEqualObject,
  makeToast,
  toastType,
  getUpdateByUserInSystem
} from '../../../utils';
import content from '../content';

const BannerForm = ({ banner, show, handleBack }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (show) reset(banner);
    else reset();
  }, [show]);

  const handleCreateData = async data => {
    await bannerService.add(
      dispatch,
      { ...data, ...getUpdateByUserInSystem() },
      accessToken
    );
    handleBack();
  };

  const handleSaveData = async data => {
    const newBannerData = { ...banner, ...data };
    if (isEqualObject(banner, newBannerData)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }
    await bannerService.update(
      dispatch,
      { ...newBannerData, ...getUpdateByUserInSystem() },
      banner.id,
      accessToken
    );
    handleBack();
  };

  return (
    <ModalForm show={show} object={banner} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={banner ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <TextInput
          attribute="path"
          label={content.form.path}
          register={register}
          errors={errors}
          placeholder="https://examples.com/images/123"
          defaultValue={banner?.path}
          readOnly={banner?.path}
          required
        />
        <img
          className="img-fluid img-thumbnail mb-3"
          src={
            watch('path') ||
            banner?.path ||
            'https://placeholder.pics/svg/400x200/1B82FF-95EDFF/000000-FFFFFF/choose%20image'
          }
          alt="examples"
        />
        <TextInput
          attribute="type"
          label={content.form.type}
          register={register}
          errors={errors}
          placeholder="advertise, intro-new-gen, intro-back-to-school, ..."
          defaultValue={banner?.type}
          required
        />
        <TextInput
          attribute="title"
          label={content.form.title}
          register={register}
          errors={errors}
          placeholder="Big deal for May"
          defaultValue={banner?.title}
          required
        />
        <TextInput
          attribute="linkProduct"
          label={content.form.linkProduct}
          register={register}
          errors={errors}
          placeholder="https://laptech.com.vn/brand/asus"
          defaultValue={banner?.linkProduct}
        />
        <fieldset>
          <legend className="text-uppercase">{content.form.time}</legend>
          <div className="row">
            <div className="col mb-3">
              <TextInput
                label={content.form.usedDate}
                register={register}
                errors={errors}
                attribute="usedDate"
                defaultValue={
                  banner?.usedDate || new Date().toJSON().slice(0, 10)
                }
                type="date"
                min={new Date().toJSON().slice(0, 10)}
                required
                errorMessage={content.error.usedDate}
              />
            </div>
            <div className="col mb-3">
              <TextInput
                label={content.form.endedDate}
                register={register}
                errors={errors}
                attribute="endedDate"
                defaultValue={
                  banner?.endedDate ||
                  new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
                    .toJSON()
                    .slice(0, 10)
                }
                type="date"
                min={new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
                  .toJSON()
                  .slice(0, 10)}
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

export default BannerForm;
