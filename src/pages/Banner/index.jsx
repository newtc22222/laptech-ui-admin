import React, { useState } from 'react';

import useFetch from '../../hooks/useFetch';

import { CalendarPicker, PageHeader, Loading } from '../../components/common';
import ServerNotResponse from '../Error/ServerNotResponse';
import content from './content';

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
      <PageHeader pageName={content.pageName}>
        <button className="btn btn-primary fw-bold">
          {content.titleBtnAdd}
        </button>
      </PageHeader>
      <CalendarPicker selected={filterDate} setSelected={setFilterDate} />
      <div className="d-flex flex-wrap gap-2">
        {bannerList
          ?.filter(banner => {
            const filterDateJSON = new Date(filterDate).toJSON().slice(0, 10);
            return (
              banner.usedDate <= filterDateJSON &&
              filterDateJSON <= banner.endedDate
            );
          })
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
