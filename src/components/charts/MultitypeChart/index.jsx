import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  BarController,
  LineController
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import _ from 'lodash';

import { ListColorRGB } from '../colors';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  BarController,
  LineController
);

/**
 * Actually, this chart just contains line (area) and bar type
 * @param {*} param0
 */
const MultitypeChart = ({
  labels = [],
  datasets = [],
  title = '',
  ...rest
}) => {
  const listColor = _.shuffle(ListColorRGB);

  const dataConfig = {
    labels,
    datasets: datasets.map(set => {
      const color = listColor.shift();
      return {
        ...set,
        backgroundColor: `rgba(${color}, 0.8)`,
        borderColor: `rgba(${color}, 1)`,
        borderWidth: 2
      };
    })
  };

  return <Chart type="bar" data={dataConfig} className={rest.className} />;
};

export default MultitypeChart;
