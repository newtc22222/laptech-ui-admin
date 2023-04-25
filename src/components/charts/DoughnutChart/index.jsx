import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';

import { ListColorRGB } from '../colors';

ChartJS.register(ArcElement, Tooltip, Legend);

function getPieCSS(piece) {
  const backgroundColor = [],
    borderColor = [];
  ListColorRGB.slice(0, piece).forEach(color => {
    backgroundColor.push(`rgba(${color}, 0.2)`);
    borderColor.push(`rgba(${color}, 1)`);
  });

  const pieCSS = {
    backgroundColor,
    borderColor,
    borderWidth: 1
  };
  return pieCSS;
}

const DoughnutChart = ({ labels, data, ...props }) => {
  const dataConfig = {
    labels: labels,
    datasets: [
      {
        label: props.label || 'Value',
        data: data,
        ...getPieCSS(labels.length)
      }
    ]
  };

  return <Doughnut data={dataConfig} className={classNames(props.className)} />;
};

export default DoughnutChart;
