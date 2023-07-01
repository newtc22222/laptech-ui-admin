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

const LineChart = ({
  labels,
  datasets,
  hasAreaFilter = false,
  interaction = false,
  legendPosition = 'top',
  title,
  ...rest
}) => {
  const listColor = _.shuffle(ListColorRGB);

  const options = {
    responsive: true,
    interaction: interaction && {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: legendPosition
      },
      title: {
        display: true,
        text: title
      }
    }
    // scales: {
    //   y: {
    //     type: "linear",
    //     display: true,
    //     position: "left"
    //   },
    //   y1: {
    //     type: "linear",
    //     display: true,
    //     position: "right",
    //     grid: {
    //       drawOnChartArea: false
    //     }
    //   }
    // }
  };

  const dataConfig = {
    labels: labels,
    datasets: datasets.map(set => {
      const color = listColor.shift();
      return {
        ...set,
        fill: hasAreaFilter,
        backgroundColor: `rgba(${color}, 0.2)`,
        borderColor: `rgba(${color}, 1)`
      };
    })
  };

  return (
    <Line options={options} data={dataConfig} className={rest.className} />
  );
};

export default LineChart;
