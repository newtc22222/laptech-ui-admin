import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiAuth from '../../apis/auth';
import HashString from '../../utils/HandleStoreLocal';

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(rmb_phone);
  const passwordRef = useRef();
  const [remember, setRemember] = useState(rmb_check);

  const handleChangePhone = e => {
    const re = /^[0-9/b]+$/;
    if (re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handleLogin = async () => {
    const account = {
      phone: phone,
      password: passwordRef.current.value
    };
    const data = await apiAuth.login(dispatch, account);
    if (data && data.user.role !== 'USER') {
      if (remember) {
        const storeData = `${phone};${HashString.encrypt(
          passwordRef.current.value
        )};${remember}`;
        localStorage.setItem('storeData', HashString.encrypt(storeData));
      }
      navigate('/');
    }
  };

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
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-primary mb-4">Welcome back!</h1>
                    </div>
                    <div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPhone"
                          className="form-label"
                        >
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPhone"
                          aria-describedby="phoneHelp"
                          value={phone}
                          onChange={handleChangePhone}
                        />
                        <div id="phoneHelp" className="form-text">
                          Chúng tôi sẽ đảm bảo an toàn cho tài khoản của bạn
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          defaultValue={HashString.decrypt(rmb_password)}
                          ref={passwordRef}
                        />
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={remember}
                          onChange={() => setRemember(!remember)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Ghi nhớ đăng nhập
                        </label>
                      </div>
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleLogin}
                      >
                        Xác nhận
                      </button>
                    </div>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
