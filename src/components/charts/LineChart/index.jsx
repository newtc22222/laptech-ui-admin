import React from "react";
import _ from "lodash";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { ListColorRGB } from "../colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ labels, data, ...props }) => {
  const listColor = _.shuffle(ListColorRGB);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const dataConfig = {
    labels: labels,
    datasets: data.map((i) => {
      const color = listColor.shift();
      return {
        ...i,
        backgroundColor: `rgba(${color}, 0.2)`,
        borderColor: `rgba(${color}, 1)`,
      };
    }),
  };

  return (
    <Line options={options} data={dataConfig} className={props.className} />
  );
};

export default LineChart;
