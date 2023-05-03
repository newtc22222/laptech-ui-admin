import React from 'react';
import _ from 'lodash';

import { LineChart, BarChart } from '../../../components/charts';

import invoice from '../../../samples/invoice';

function StatisticProfits() {
  const labels = ['Jan 2023', 'Feb 2023', 'Mar 2023'];

  const calculateTotal = data => {
    const totalIncome = _.sum(
      data.map(i => {
        const itemList = i.items;
        return _.sum(itemList.map(item => item.discountPrice * item.quantity));
      })
    );
    return totalIncome;
  };

  function getData(filter) {
    const dataSet = [
      { month: 1, year: 2023 },
      { month: 2, year: 2023 },
      { month: 3, year: 2023 }
    ].map(option => {
      const invoiceFilter = invoice
        .filter(i => i.isPaid === true)
        .filter(i => {
          const createdDate = i.createdDate;
          return (
            createdDate.getMonth() === option.month &&
            createdDate.getFullYear() === option.year
          );
        })
        .filter(
          i => i.items.filter(item => item.name.includes(filter)).length > 0
        );
      return invoiceFilter;
    });

    return [
      calculateTotal(dataSet[0]),
      calculateTotal(dataSet[1]),
      calculateTotal(dataSet[2])
    ];
  }

  const data = [
    {
      label: 'Shirt',
      data: getData('Shirt')
    },
    {
      label: 'Jacket',
      data: getData('Jacket')
    },
    {
      label: 'Jean',
      data: getData('Jean')
    },
    {
      label: 'Bag',
      data: getData('Bag')
    }
  ];

  return (
    <>
      <LineChart
        title="Product income"
        legendPosition="bottom"
        labels={labels}
        datasets={data}
        interaction
      />
      <BarChart
        title="Product income"
        legendPosition="bottom"
        labels={labels}
        datasets={data}
        // interaction
        // horizontal
        // stacked
      />
    </>
  );
}

export default StatisticProfits;
