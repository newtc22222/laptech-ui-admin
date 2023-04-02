import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authService from '../../services/auth/auth.service';
import HashString from '../../utils/hashData';
import useAppContext from '../../hooks/useAppContext';
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

  const { activeTab } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login data
  const [phone, setPhone] = useState(rmb_phone);
  const passwordRef = useRef();
  // const captchaRef = useRef(); // features
  const [remember, setRemember] = useState(Boolean(rmb_check));

  const handleChangePhone = e => {
    e.preventDefault();
    const re = /^[0-9/b]{1,14}$/;
    const str = e.target.value;
    if (re.test(str) || str === '') {
      setPhone(str);
    }
  };

  const handleLogin = async () => {
    const account = {
      phone: phone,
      password: passwordRef.current.value
      // captcha: captchaRef.current.value // will update later
    };
    const data = await authService.login(dispatch, account);

    if (data) {
      if (remember) {
        const storeData = `${phone};${HashString.encrypt(
          passwordRef.current.value
        )};${remember}`;

        localStorage.setItem('storeData', HashString.encrypt(storeData));
      }
      navigate('/' + (activeTab.subTab || activeTab.tab));
    }
  };

  const renderForm = (
    <div className="p-5">
      <div className="text-center">
        <h1 className="h4 text-primary mb-4">{content.welcome}</h1>
      </div>
      <div>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label">
            {content.phone}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            aria-describedby="phoneHelp"
            value={phone}
            onChange={handleChangePhone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            {content.password}
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            defaultValue={HashString.decrypt(rmb_password)}
            ref={passwordRef}
          />
        </div>
        {/* <Captcha captchaRef={captchaRef} /> */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            {content.remember}
          </label>
        </div>
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={e => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {content.btnSubmit}
        </button>
      </div>
      <hr />
      <div className="text-center">
        <a className="small" href="forgot-password.html" target="_blank">
          {content.forgotPassword}
        </a>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image">
                  <img
                    src={require('./work.png')}
                    alt="Login image"
                    className="h-100 w-100"
                  />
                </div>
                <div className="col-lg-6">{renderForm}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
