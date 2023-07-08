import React from 'react';

import TopProductList from './components/TopProductList';
import ProfitChart from './components/ProfitChart';
import { PageHeader } from '../../../components/common';

function ProfitStatistic() {
  return (
    <div className="d-flex flex-column gap-2">
      <PageHeader pageName={'Thống kê doanh thu'} />
      <TopProductList />
      <ProfitChart />
    </div>
  );
}

export default ProfitStatistic;
