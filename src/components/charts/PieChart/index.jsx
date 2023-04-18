import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, Tooltip, Legend);

function getRandomLabel(seeds) {
  const random = [];
  for (var i = 0; i < seeds; i++) {
    random.push(faker.name.firstName());
  }
  return random;
}

const labels = getRandomLabel(6);

const data = {
  labels,
  datasets: [
    {
      label: 'Vote',
      data: labels.map(i => Math.floor(Math.random() * 100)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
};

const PieChart = ({ labels, datasets }) => {
  const dataConfig = { labels, datasets };

  return <Pie data={data} />;
};

export default PieChart;
