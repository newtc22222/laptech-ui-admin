import React from 'react';
import PageHeader from '../../components/common/PageHeader';

const pageName = 'Tính năng của sản phẩm';

const Feature = () => {
  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
      <div className="d-grid gap-2"></div>
    </div>
  );
};

export default Feature;
