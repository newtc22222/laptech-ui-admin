import React from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../../context/AppContext';

const Unauthorization = () => {
  const { handleSetActiveTab } = useAppContext();
  return (
    <div className="container-fluid position-relative h-100">
      <Link to={'/home'} onClick={() => handleSetActiveTab('home')}>
        <img
          className="img-fluid position-absolute top-50 start-50 translate-middle"
          style={{ width: '80%' }}
          alt="Page not found"
          src={require('../../../../assets/images/403_forbidden.jpg')}
        />
      </Link>
      <h4 className="text-center text-danger mt-2">
        BẠN CHƯA ĐƯỢC CẤP QUYỀN ĐỂ TRUY CẬP VÀO THÔNG TIN NÀY
      </h4>
      <h6 className="text-center text-warning">
        VUI LÒNG LIÊN HỆ VỚI ADMIN NẾU CẦN QUYỀN TRUY CẬP!
      </h6>
    </div>
  );
};

export default Unauthorization;
