import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { delay } from 'lodash';
import classNames from 'classnames';

import { checkPasswordStrength, makeToast, toastType } from '../../utils';
import content from './content';
import { authService } from '../../services';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.auth.accessToken);
  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const validationRule = useMemo(() => {
    return {
      required: content.error.missing,
      minLength: {
        value: 8,
        message: content.error.minLength.replace('x', 8)
      },
      validate: value =>
        checkPasswordStrength(value) >= 2 || content.error.passwordStrength
    };
  }, []);

  const onSubmit = async data => {
    if (data.newPassword === data.oldPassword) {
      makeToast(content.validate.passwordConfirmNotCorrect, toastType.info);
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      makeToast(content.validate.passwordConfirmNotCorrect, toastType.info);
      return;
    }
    await authService.updatePassword(dispatch, data, accessToken);
    reset();
    delay(() => navigate('/auth/login'), 4000);
  };

  return (
    <div className="card">
      <div className="card-header text-uppercase fw-bold">
        {content.changePassword}
      </div>
      <div className="card-body">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              {content.form.oldPassword}
            </label>
            <input
              {...register('oldPassword', {
                required: true && content.error.missing
              })}
              id="oldPassword"
              type="password"
              className={classNames('form-control', {
                'is-invalid': errors['oldPassword']
              })}
              disabled={!editMode}
            />
            {errors['oldPassword'] && (
              <div className="invalid-feedback">
                {errors['oldPassword'].message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              {content.form.newPassword}
            </label>
            <input
              {...register('newPassword', validationRule)}
              id="newPassword"
              type="password"
              className={classNames('form-control', {
                'is-invalid': errors['newPassword']
              })}
              disabled={!editMode}
            />
            {errors['newPassword'] && (
              <div className="invalid-feedback">
                {errors['newPassword'].message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              {content.form.confirmPassword}
            </label>
            <input
              {...register('confirmPassword', validationRule)}
              id="confirmPassword"
              type="password"
              className={classNames('form-control', {
                'is-invalid': errors['confirmPassword']
              })}
              disabled={!editMode}
            />
            {errors['confirmPassword'] && (
              <div className="invalid-feedback">
                {errors['confirmPassword'].message}
              </div>
            )}
          </div>
          {editMode ? (
            <>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? content.form.isSubmitting : content.form.save}
              </button>
              <button
                className="btn btn-secondary ms-2"
                type="button"
                disabled={!editMode}
                onClick={() => {
                  setEditMode(false);
                  reset();
                }}
              >
                {content.form.cancel}
              </button>
            </>
          ) : (
            <>
              <button type="submit" hidden></button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setEditMode(true)}
              >
                {content.form.edit}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
