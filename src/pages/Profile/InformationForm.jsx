import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import content from './content';
import classNames from 'classnames';
import { authService } from '../../services';
import { makeToast, toastType, isEqualObject } from '../../utils';

const InformationForm = () => {
  const { accessToken, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    role: [],
    user: user || {}
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    defaultValues: currentUser.user
  });

  useEffect(() => {
    authService
      .getCurrentUser(dispatch, accessToken)
      .then(data => setCurrentUser(data))
      .catch(error => console.log(error));
  }, []);

  const onSubmit = async data => {
    if (isEqualObject(currentUser.data, data)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    await authService
      .updateInformation(dispatch, data, accessToken)
      .catch(err => makeToast(content.error.wrongInformation, toastType.error));
    setEditMode(false);
  };

  return (
    <div className="card w-75">
      <div className="card-header text-uppercase fw-bold">
        {content.changeInformation}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>{content.id + ': ' + currentUser.user.id}</p>
          <p className="fw-bold">
            {content.phone + ': ' + currentUser.user.phone}
          </p>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              {content.name}
            </label>
            <input
              {...register('name', {
                required: true && content.error.missing,
                maxLength: 100
              })}
              id="name"
              className={classNames('form-control', {
                'is-invalid': errors['name']
              })}
              maxLength={100}
              disabled={!editMode}
            />
            {errors['name'] && (
              <div className="invalid-feedback">{errors['name'].message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              {content.gender}
            </label>
            <select
              {...register('gender', { required: true })}
              id="gender"
              className="form-select"
              disabled={!editMode}
            >
              {['MALE', 'FEMALE', 'OTHER'].map(type => (
                <option value={type} key={type}>
                  {content.genderType[type]}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {content.email}
            </label>
            <input
              {...register('email')}
              id="email"
              className="form-control"
              type="email"
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              {content.dateOfBirth}
            </label>
            <input
              {...register('dateOfBirth', {
                required: true && content.error.missing
              })}
              id="dateOfBirth"
              className={classNames('form-control', {
                'is-invalid': errors['dateOfBirth']
              })}
              type="date"
              disabled={!editMode}
            />
            {errors['dateOfBirth'] && (
              <div className="invalid-feedback">
                {errors['dateOfBirth'].message}
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

export default InformationForm;
