import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { BarChart } from '../../../../components/charts';
import { Loading } from '../../../../components/common';
import RatingMap from './RatingMap';

import { statisticService } from '../../../../services';

const ProductStatisticBox = ({
  handleClosePage,
  product,
  accessToken,
  dispatch
}) => {
  const [ratingPoint, setRatingPoint] = useState([0, 0, 0, 0, 0]);
  const [productChartMap, setProductChartMap] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: []
      },
      {
        label: 'Pay',
        data: []
      }
    ]
  });

  useEffect(() => {
    const handleSetupData = data => {
      setRatingPoint(data.rating);
      const productChartClone = window.structuredClone(productChartMap);
      // { time: value } ~ 29 days ago - now
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
          <div className="w-50">
            <RatingMap ratingArr={ratingPoint} />
          </div>
          <BarChart
            title="Product Figures"
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
