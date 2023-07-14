import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

import { useAppContext } from '../../components/context/AppContext';
import { authService } from '../../services';
import { HashString } from '../../utils';
import content from './content';
// import Captcha from './Captcha';

/**
 * @link: https://startbootstrap.com/previews/sb-admin-2
 * @since 2022-12-31
 */
const Login = () => {
  const storeDataHash = localStorage.getItem('storeData');
  let rmb_phone = '',
    rmb_password = '',
    rmb_check = false;

  if (storeDataHash) {
    const storeData = HashString.decrypt(storeDataHash);
    [rmb_phone, rmb_password, rmb_check] = storeData.split(';');
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      phone: rmb_phone,
      password: HashString.decrypt(rmb_password),
      remember: rmb_check
    }
  });
  const { activeTab, handleSetActiveTab } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePhone = e => {
    e.preventDefault();
    const value = e.target.value.trim();
    const valueSet = value.replace(/\D/g, '');
    setValue('phone', valueSet);
  };

  const onSubmit = async data => {
    const account = {
      phone: data.phone,
      password: data.password
      // captcha: captchaRef.current.value // will update later
    };
    const res = await authService.login(dispatch, account);
    if (res) {
      if (data.remember) {
        const storeData = `${data.phone};${HashString.encrypt(data.password)};${
          data.remember
        }`;

        localStorage.setItem('storeData', HashString.encrypt(storeData));
      }

      if (activeTab.subTab === 'login') handleSetActiveTab('home');

      const urlActive =
        activeTab.subTab === 'login'
          ? '/'
          : '/'
              .concat(activeTab.tab)
              .concat(activeTab.subTab ? '/' + activeTab.subTab : '');
      navigate(urlActive);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image">
                    <img
                      src={require('../../assets/images/login_work.png')}
                      alt="Login image"
                      className="h-100 w-100"
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center">
                          <h3 className="text-primary mb-3">
                            {content.welcome}
                          </h3>
                        </div>
                        <div>
                          <div className="form-floating mb-3">
                            <input
                              {...register('phone', {
                                onChange: handleChangePhone,
                                required: true && content.error.phone
                              })}
                              className={classNames('form-control', {
                                'is-invalid': errors['phone']
                              })}
                              maxLength={15}
                              id="inputPhone"
                              placeholder="0123 456 xxx"
                            />
                            <label htmlFor="inputPhone">{content.phone}</label>
                            {errors['phone'] && (
                              <span className="text-danger small">
                                {errors['phone'].message}
                              </span>
                            )}
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              {...register('password', {
                                required: true && content.error.password
                              })}
                              type="password"
                              className={classNames('form-control', {
                                'is-invalid': errors['password']
                              })}
                              id="inputPassword"
                              placeholder="13579ASDFGH"
                            />
                            <label htmlFor="inputPassword">
                              {content.password}
                            </label>
                            {errors['password'] && (
                              <span className="text-danger small">
                                {errors['password'].message}
                              </span>
                            )}
                          </div>
                          {/* <Captcha captchaRef={captchaRef} /> */}
                          <div className="mb-3 form-check">
                            <input
                              {...register('remember')}
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              {content.remember}
                            </label>
                          </div>
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? content.btnSubmitLoading
                              : content.btnSubmit}
                          </button>
                        </div>
                        <hr />
                      </form>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => navigate('/auth/reset-password')}
                        >
                          {content.forgotPassword}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
