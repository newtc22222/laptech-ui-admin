import React from 'react';
import _ from 'lodash';

import { LineChart, BarChart } from '../../../components/charts';
import TopProductList from './components/TopProductList';

function ProfitStatistic() {
  const profitFigure = {
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: []
      },
      {
        label: 'Paying',
        data: []
      }
    ]
  }; // Chart

  return (
    <>
      <LineChart
        title="Product income"
        legendPosition="bottom"
        labels={profitFigure.labels}
        datasets={profitFigure.datasets}
        interaction
      />
      <BarChart
        title="Product income"
        legendPosition="bottom"
        labels={profitFigure.labels}
        datasets={profitFigure.datasets}
        // interaction
        // horizontal
        // stacked
      />
    </>
  );
}

export default ProfitStatistic;
