import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { authService } from '../../services';
import { makeToast, checkPasswordStrength, toastType } from '../../utils';
import CountdownRefresh from '../../components/common/CountdownRefresh';

const UpdateForm = ({ handleResend }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { token: '', newPassword: '', confirmPassword: '' }
  });

  const onSubmit = async data => {
    if (data.newPassword === data.confirmPassword) {
      try {
        await authService.resetPassword(data.token, data.newPassword);
        makeToast('Mật khẩu đã thay đổi thành công!', toastType.success);
        navigate('/auth/login');
      } catch (error) {
        makeToast('Thay đổi mật khẩu thất bại!', toastType.error);
      }
    } else {
      makeToast('Mật khẩu xác thực không trùng khớp!', toastType.warning);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-3 p-3 border rounded shadow"
    >
      <h1 className="text-center text-primary">
        CẬP NHẬT GIÁ TRỊ MẬT KHẨU MỚI
      </h1>
      <div>
        <CountdownRefresh
          countdownTime={1000 * 60 * 5}
          handleChange={handleResend}
          disabledPause
        />
      </div>
      <div className="form-floating">
        <input
          id="token"
          className={classNames('form-control', {
            'is-invalid': errors['token']
          })}
          {...register('token', {
            required: 'Vui lòng nhập token đã nhận!'
          })}
          placeholder="afoiew-sdaif90uafaw-ef213i-42asd"
        />
        <label className="form-label" htmlFor="token">
          Nhập token đã gửi đến email
        </label>
        {errors['token'] && (
          <span className="text-danger small">{errors['token'].message}</span>
        )}
      </div>
      <div className="form-floating">
        <input
          id="newPassword"
          className={classNames('form-control', {
            'is-invalid': errors['newPassword']
          })}
          type="password"
          {...register('newPassword', {
            required: 'Vui lòng nhập mật khẩu mới!',
            validate: value =>
              checkPasswordStrength(value) > 1 ||
              'Mật khẩu phải có ít nhất 8 ký tự. Bao gồm số, chữ thường và chữ in hoa!'
          })}
          placeholder="13579ASDFGH"
        />
        <label className="form-label" htmlFor="newPassword">
          Nhập mật khẩu mới
        </label>
        {errors['newPassword'] && (
          <span className="text-danger small">
            {errors['newPassword'].message}
          </span>
        )}
      </div>
      <div className="form-floating">
        <input
          id="confirmPassword"
          className={classNames('form-control', {
            'is-invalid': errors['confirmPassword']
          })}
          type="password"
          {...register('confirmPassword', {
            required: 'Vui lòng nhập mật khẩu mới!'
          })}
          placeholder="13579ASDFGH"
        />
        <label className="form-label" htmlFor="confirmPassword">
          Nhập mật khẩu xác nhận
        </label>
        {errors['confirmPassword'] && (
          <span className="text-danger small">
            {errors['confirmPassword'].message}
          </span>
        )}
      </div>
      <div className="row gap-2">
        <div className="col">
          <button type="submit" className="btn btn-lg btn-primary w-100">
            Cập nhật mật khẩu
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-lg btn-secondary w-100"
            onClick={handleResend}
          >
            Gửi lại token
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
