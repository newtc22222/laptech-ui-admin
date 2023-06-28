import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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

const DoughnutChart = ({ labels = [], data = [], ...rest }) => {
  const dataConfig = {
    labels: labels,
    datasets: [
      {
        label: rest.label || 'Value',
        data: data,
        ...getPieCSS(labels.length)
      }
    ]
  };

  return <Doughnut data={dataConfig} className={rest.className} />;
};

export default DoughnutChart;
