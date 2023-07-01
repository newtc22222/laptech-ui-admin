import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

import { ListColorRGB } from '../colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  labels,
  datasets,
  horizontal = false,
  interaction = false,
  legendPosition = 'top',
  title,
  stacked = false,
  ...rest
}) => {
  const listColor = _.shuffle(ListColorRGB);

  const options = {
    indexAxis: horizontal && 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    interaction: interaction && {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition
      },
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      x: {
        stacked: stacked
      },
      y: {
        stacked: stacked
      }
    }
  };

  const dataConfig = {
    labels: labels,
    datasets: datasets.map(set => {
      const color = listColor.shift();
      return {
        ...set,
        backgroundColor: `rgba(${color}, 0.7)`,
        borderColor: `rgba(${color}, 1)`
      };
    })
  };

  return <Bar options={options} data={dataConfig} className={rest.className} />;
};

export default BarChart;
