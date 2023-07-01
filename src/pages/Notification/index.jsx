import React from 'react';
import PageHeader from '../../components/common/PageHeader';

const pageName = 'Thông báo ứng dụng';

const Notification = () => {
  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
      <div className="d-grid gap-2"></div>
    </div>
  );
};

export default Notification;
