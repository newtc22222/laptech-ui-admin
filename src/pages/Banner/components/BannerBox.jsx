import React from 'react';
import useFetch from '../../../hooks/useFetch';

import BannerCard from './BannerCard';

const BannerBox = ({
  refreshKey,
  filterDate,
  handleShowUpdateModal,
  handleShowDeleteModal
}) => {
  const { data: bannerList } = useFetch(`/banners?key=${refreshKey}`);
  const filterDatePrecision = Date.parse(filterDate).toPrecision();

  if (!bannerList) return <></>;

  return (
    <>
      {bannerList
        .filter(banner => {
          const usedDatePrecision = Date.parse(banner.usedDate).toPrecision();
          const endedDatePrecision = Date.parse(banner.endedDate).toPrecision();

          return (
            usedDatePrecision <= filterDatePrecision &&
            filterDatePrecision <= endedDatePrecision
          );
        })
        .map(banner => {
          return (
            <BannerCard
              key={banner.id}
              banner={banner}
              handleShowDeleteModal={handleShowDeleteModal}
              handleShowUpdateModal={handleShowUpdateModal}
            />
          );
        })}
    </>
  );
};

export default BannerBox;
