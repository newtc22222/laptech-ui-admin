import React from 'react';
import PageHeader from '../../components/common/PageHeader';

const pageName = 'Thông tin về ứng dụng';

const About = () => {
  return (
    <div>
      <PageHeader pageName={pageName}></PageHeader>
      <div className="d-grid gap-2">
        <h4>Nhiệm vụ chung</h4>
        <ul className="list-group">
          <li className="list-group-item">Database design: Nhật Phi Võ</li>
          <li className="list-group-item">BE - Server API: Nhật Phi Võ</li>
          <li className="list-group-item">FE - UI Admin: Nhật Phi Võ</li>
          <li className="list-group-item">FE - UI Client: Quang Sang Nguyễn</li>
          <li className="list-group-item">FE - UI Mobile: Nhật Phi Võ</li>
        </ul>
        <h4>Tài liệu tham khảo</h4>
      </div>
    </div>
  );
};

export default About;
