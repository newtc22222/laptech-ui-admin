import React, { useState, useEffect } from 'react';

const mainCaptchaUrl = 'http://localhost:8088/api/v1/auth/captcha';

const Captcha = ({ captchaRef }) => {
  const [captchaUrl, setCaptchaUrl] = useState(mainCaptchaUrl);

  useEffect(() => {
    setCaptchaUrl(
      mainCaptchaUrl + '?rand=' + crypto.randomUUID().replace(/-/g, '')
    );
  }, []);

  return (
    <div className="input-group mb-3">
      <img
        src={captchaUrl}
        alt="captcha"
        onClick={() => setCaptchaUrl(mainCaptchaUrl + `?rand=${Math.random()}`)}
      />
      <input
        type="text"
        className="form-control ms-2"
        id="inputCaptcha"
        ref={captchaRef}
      />
    </div>
  );
};

export default Captcha;
