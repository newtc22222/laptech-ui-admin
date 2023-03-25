import React, { useState } from 'react';

import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';
import useFetch from '../../hooks/useFetch';

const pageName = 'Hình ảnh quảng cáo';
const titleBtnAdd = 'Thêm hình ảnh';

const Banner = () => {
  const [filterDate, setFilterDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const { data: bannerList, isFetching, error } = useFetch('/banners');

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      <PageHeader pageName={pageName}>
        <button className="btn btn-primary fw-bold">{titleBtnAdd}</button>
      </PageHeader>
      <div className="input-group mb-2 mt-2">
        <label className="input-group-text" htmlFor="filterBanner">
          Lọc theo ngày
        </label>
        <input
          id="filterBanner"
          className="form-control"
          type="date"
          value={filterDate}
          onChange={e => {
            setFilterDate(e.target.value);
          }}
          onKeyDown={e => e.preventDefault()}
        />
      </div>
      <div className="d-flex flex-wrap gap-2">
        {bannerList
          ?.filter(
            banner =>
              banner.usedDate <= filterDate && filterDate <= banner.endedDate
          )
          .map(banner => {
            return (
              <img
                key={banner.id}
                src={banner.path}
                alt={banner.title}
                title="Click vào hình ảnh để thay đổi thông tin!"
              />
            );
          })}
      </div>
    </div>
  );
};

export default Banner;
