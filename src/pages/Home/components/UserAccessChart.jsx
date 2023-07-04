import React, { useEffect, useState } from 'react';

import { MultitypeChart } from '../../../components/charts';

const UserAccessChart = ({ userFigures }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Truy cập trong ngày',
        type: 'line',
        data: []
      },
      {
        label: 'Tương tác trong ngày',
        type: 'line',
        data: []
      }
      // {
      //   label: 'Thêm mới',
      //   type: 'bar',
      //   data: []
      // },
      // {
      //   label: 'Cập nhật',
      //   type: 'bar',
      //   data: []
      // },
      // {
      //   label: 'Khác',
      //   type: 'bar',
      //   data: []
      // }
    ]
  });

  const handleUpdateChartData = () => {
    const { accessFigures, interactFigures } = userFigures;
    Object.keys(accessFigures)
      .sort((key1, key2) => new Date(key1).getTime() - new Date(key2).getTime())
      .forEach(key => {
        chartData.labels.push(key);
        chartData.datasets[0].data.push(accessFigures[key]);
        chartData.datasets[1].data.push(interactFigures[key]);
      });
    setChartData(chartData);
  };

  useEffect(() => {
    if (userFigures) handleUpdateChartData();
  }, [userFigures]);

  return (
    <div className="p-3 border rounded">
      <h5 className="text-uppercase text-center">
        Truy cập và tương tác trong 30 ngày
      </h5>
      <MultitypeChart labels={chartData.labels} datasets={chartData.datasets} />
    </div>
  );
};

export default UserAccessChart;
