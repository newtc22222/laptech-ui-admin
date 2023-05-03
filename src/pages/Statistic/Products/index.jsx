import React from 'react';
import _ from 'lodash';

import {
  DoughnutChart,
  PieChart,
  PolarAreaChart
} from '../../../components/charts';

import product from '../../../samples/product';

function StatisticProduct() {
  // 9 top and others
  const labels = [];

  const productSort = product.sort(
    (a, b) => (a.maxQuantity - b.maxQuantity) * -1
  );

  const totalQuantity = product
    .map(p => p.maxQuantity)
    .reduce((acc, current) => acc + current, 0);

  const data = productSort.slice(0, 9).map(p => {
    labels.push(p.name);
    return p.maxQuantity;
  });

  labels.push('others');
  data.push(
    productSort
      .slice(10)
      .map(p => p.maxQuantity)
      .reduce((acc, current) => acc + current, 0)
  );

  const dataPolar = data.map(value => (value / totalQuantity) * 100);

  return (
    <div className="w-50">
      <PieChart labels={labels} data={data} />
      <DoughnutChart labels={labels} data={data} />
      <PolarAreaChart labels={labels} data={dataPolar} />
    </div>
  );
}

export default StatisticProduct;
