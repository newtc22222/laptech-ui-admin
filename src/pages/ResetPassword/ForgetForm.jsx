import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { authService } from '../../services';
import { makeToast, toastType, validateEmail } from '../../utils';

const ForgetForm = ({ setResetInfo }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { phone: '', email: '' }
  });

  const onSubmit = async data => {
    try {
      const res = await authService.forgotPassword(data.phone, data.email);
      console.log(res.data);
      setResetInfo(data);
      makeToast('Token đã được gửi đến email!', toastType.info);
    } catch (error) {
      makeToast(error.response.data.detail[0], toastType.warning);
    }
  };

  const handleChangePhone = e => {
    e.preventDefault();
    const value = e.target.value.trim();
    const valueSet = value.replace(/\D/g, '');
    setValue('phone', valueSet);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-3 p-3 border rounded shadow"
    >
      <h1 className="text-center text-primary">NHẬP THÔNG TIN</h1>
      <div className="form-floating">
        <input
          id="phone"
          className={classNames('form-control', {
            'is-invalid': errors['phone']
          })}
          {...register('phone', {
            required: 'Vui lòng nhập số điện thoại!',
            onChange: handleChangePhone
          })}
          placeholder="0123 456 xxx"
        />
        <label className="form-label" htmlFor="phone">
          Số điện thoại xác thực
        </label>
        {errors['phone'] && (
          <span className="text-danger small">{errors['phone'].message}</span>
        )}
      </div>
      <div className="form-floating">
        <input
          id="email"
          className={classNames('form-control', {
            'is-invalid': errors['email']
          })}
          {...register('email', {
            required: 'Vui lòng nhập địa chỉ email đã đăng ký!',
            validate: value => {
              if (value && !validateEmail(value))
                return 'Địa chỉ email chưa chính xác!';
            }
          })}
          placeholder="some.email@test123.321"
        />
        <label className="form-label" htmlFor="email">
          Email nhận token
        </label>
        {errors['email'] && (
          <span className="text-danger small">{errors['email'].message}</span>
        )}
      </div>
      <div className="row gap-2">
        <div className="col">
          <button type="submit" className="btn btn-lg btn-primary w-100">
            Xác nhận
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-lg btn-secondary w-100"
            onClick={() => navigate('/auth/login')}
          >
            Trở lại
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgetForm;
