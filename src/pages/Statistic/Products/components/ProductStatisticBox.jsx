import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { BarChart } from '../../../../components/charts';
import { Loading } from '../../../../components/common';
import RatingMap from './RatingMap';

import { statisticService } from '../../../../services';
import { getCurrencyString } from '../../../../utils';

const ProductStatisticBox = ({
  handleClosePage,
  product,
  accessToken,
  dispatch
}) => {
  const [ratingPoint, setRatingPoint] = useState([0, 0, 0, 0, 0]);
  const [totalSellInMonth, setTotalSellInMonth] = useState(0);
  const [topUserFollow, setTopUserFollow] = useState([]);
  const [productChartMap, setProductChartMap] = useState({
    labels: [],
    datasets: [
      {
        label: 'Thu nhập',
        data: []
      },
      {
        label: 'Chi trả',
        data: []
      }
    ]
  });

  useEffect(() => {
    const handleSetupData = data => {
      setRatingPoint(data.rating);
      let totalSellingInMonth = 0;
      Object.keys(data.incomeFigures)
        .filter(
          key =>
            new Date(key).getMonth() === new Date().getMonth() &&
            new Date(key).getFullYear() === new Date().getFullYear()
        )
        .forEach(key => (totalSellingInMonth += data.incomeFigures[key]));
      setTotalSellInMonth(totalSellingInMonth);
      setTopUserFollow(data.topUserFollow);
      // { time: value } ~ 29 days ago - now
      const productChartClone = window.structuredClone(productChartMap);
      Object.keys(data.incomeFigures)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .slice(23, 30)
        .forEach(key => {
          productChartClone.labels.push(key);
          productChartClone.datasets[0].data.push(data.incomeFigures[key]);
        });
      Object.keys(data.payingFigures)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .slice(23, 30)
        .forEach(key => {
          productChartClone.datasets[1].data.push(data.payingFigures[key]);
        });
      setProductChartMap(productChartClone);
    };

    statisticService
      .getProductFigures(dispatch, accessToken, product.id)
      .then(handleSetupData);
  }, [accessToken]);

  return (
    <div className="card h-100">
      <div className="card-header d-flex flex-row align-items-center">
        <h5 className="me-auto">{product.name}</h5>
        <button
          className="btn-close"
          type="button"
          aria-label="close"
          onClick={() => handleClosePage(product.id)}
        ></button>
      </div>
      {productChartMap.datasets[0].data.length === 0 ? (
        <Loading />
      ) : (
        <div className="card-body">
          <div className="row me-1">
            <div className="col">
              <RatingMap ratingArr={ratingPoint} />
            </div>
            <div className="col border border-primary rounded d-flex flex-column gap-2 justify-content-center py-1">
              <div>{'Sản phẩm đã bán: ' + 0}</div>
              <div>{'Sản phẩm tồn kho: ' + product.quantityInStock}</div>
              <div>
                {'Doanh thu trong tháng: ' +
                  getCurrencyString(totalSellInMonth, 'vi-VN', 'VND')}
              </div>
              {topUserFollow.length > 0 && (
                <div className="d-flex flex-column gap-1">
                  <span className="fw-bold">
                    Khách hàng theo dõi thường xuyên:
                  </span>
                  {topUserFollow
                    .sort((u1, u2) => u1.followerPoint - u2.followerPoint)
                    .slice(0, 3)
                    .map((u, index) => (
                      <span key={index} className="border rounded px-1 py-1">
                        <small>{u.user.name + ' - ' + u.user.phone}</small>
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
          <BarChart
            title="DOANH SỐ MUA BÁN TRONG 7 NGÀY"
            legendPosition="bottom"
            labels={productChartMap.labels}
            datasets={productChartMap.datasets}
            // interaction
            // horizontal
            // stacked
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductStatisticBox);
