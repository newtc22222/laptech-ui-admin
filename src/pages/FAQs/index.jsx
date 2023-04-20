import React from 'react';
import PageHeader from '../../components/common/PageHeader';

const pageName = 'Tổng hợp các câu hỏi thường gặp';

const FAQ = () => {
  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
      <div className="d-grid gap-2"></div>
    </div>
  );
};

export default FAQ;
