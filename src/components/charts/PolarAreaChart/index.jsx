import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

import { ListColorRGB } from '../colors';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

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

const PolarAreaChart = ({ labels, data, ...rest }) => {
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

  return <PolarArea data={dataConfig} className={rest.className} />;
};

export default PolarAreaChart;
