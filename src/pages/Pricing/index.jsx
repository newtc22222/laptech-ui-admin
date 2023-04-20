import React from 'react';
import PageHeader from '../../components/common/PageHeader';

const pageName = 'Chi phí và các công cụ tính toán';

const Pricing = () => {
  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
      <div className="d-grid gap-2"></div>
    </div>
  );
};

export default Pricing;
