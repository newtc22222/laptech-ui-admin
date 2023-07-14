import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ForgetForm from './ForgetForm';

import { authService } from '../../services';
import { makeToast, toastType } from '../../utils';
import UpdateForm from './UpdateForm';

const ResetPassword = () => {
  const [resetInfo, setResetInfo] = useState();

  const handleResend = () => {
    authService.forgotPassword(resetInfo.phone, resetInfo.email).then(res => {
      makeToast('Token đã được gửi đến email!', toastType.info);
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container h-100 mt-3">
        <div className="row justify-content-center">
          <div className="col-10 my-5">
            {!resetInfo ? (
              <ForgetForm setResetInfo={setResetInfo} />
            ) : (
              <UpdateForm handleResend={handleResend} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
