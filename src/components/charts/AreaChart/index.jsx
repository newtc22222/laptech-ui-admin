import React from 'react';
import _ from 'lodash';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { ListColorRGB } from '../colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaChart = ({ labels, datasets, ...props }) => {
  const listColor = _.shuffle(ListColorRGB);

  const options = {
    responsive: true,
    interaction: props.interaction && {
      mode: 'index',
      intersect: false
    },
    // stacked: true,
    plugins: {
      legend: {
        position: props.legendPosition || 'top'
      },
      title: {
        display: true,
        text: props.title
      }
    }
  };

  const dataConfig = {
    labels: labels,
    datasets: datasets.map(set => {
      const color = listColor.shift();
      return {
        ...set,
        fill: true,
        backgroundColor: `rgba(${color}, 0.2)`,
        borderColor: `rgba(${color}, 1)`
      };
    })
  };

  return (
    <Line options={options} data={dataConfig} className={props.className} />
  );
};

export default AreaChart;
