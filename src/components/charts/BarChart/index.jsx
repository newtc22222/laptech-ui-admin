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

const BarChart = ({ labels, datasets, ...props }) => {
  const listColor = _.shuffle(ListColorRGB);

  const options = {
    indexAxis: props.horizontal && 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    interaction: props.interaction && {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    plugins: {
      legend: {
        position: props.legendPosition || 'top'
      },
      title: {
        display: true,
        text: props.title || ''
      }
    },
    scales: {
      x: {
        stacked: props.stacked || false
      },
      y: {
        stacked: props.stacked || false
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

  return <Bar options={options} data={dataConfig} />;
};

export default BarChart;
