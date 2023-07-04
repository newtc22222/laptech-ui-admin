import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { LineChart } from '../../../../components/charts';
import { statisticService } from '../../../../services';

const ProfitChart = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const [profitFigureChart, setProfitFigureChart] = useState({
    labels: [],
    datasets: [
      {
        label: 'Thu nhập',
        data: []
      },
      {
        label: 'Chi trả',
        data: []
      }
    ]
  });

  useEffect(() => {
    const handleUpdateData = data => {
      const { incomeFigures, payingFigures } = data;
      setProfitFigureChart(prev => {
        const { labels, datasets } = prev;
        Object.keys(incomeFigures)
          .sort((k1, k2) => new Date(k1).getTime() - new Date(k2).getTime())
          .forEach(key => {
            labels.push(key);
            datasets[0].data.push(incomeFigures[key]);
            datasets[1].data.push(payingFigures[key]);
          });
        return { labels, datasets };
      });
    };

    statisticService
      .getProfitFigures(dispatch, accessToken)
      .then(handleUpdateData);
  }, []);

  return (
    <div className="row border rounded p-2 mx-1 mb-1">
      <LineChart
        title="DOANH SỐ MUA BÁN TRONG 30 NGÀY"
        legendPosition="bottom"
        labels={profitFigureChart.labels}
        datasets={profitFigureChart.datasets}
        // interaction
      />
    </div>
  );
};

export default ProfitChart;
