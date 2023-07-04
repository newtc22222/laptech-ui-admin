import React from 'react';

import TopProductList from './components/TopProductList';
import ProfitChart from './components/ProfitChart';

function ProfitStatistic() {
  return (
    <div className="d-flex flex-column gap-2">
      <TopProductList />
      <ProfitChart />
    </div>
  );
}

export default ProfitStatistic;
