import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PieChart } from '../../../components/charts';

import { categoryService } from '../../../services';

const CategoryProductChart = ({ productList }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    data: categoryList,
    isCategoryFetching,
    isCategoryError
  } = useSelector(state => state['categories']);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const handleUpdateChart = () => {
    const labels = [];
    const categoryData = categoryList.map(category => {
      const productOfCategory = productList.filter(
        product => product.categoryId === category.id
      );
      return {
        label: category.name,
        productOfCategory: productOfCategory.length
      };
    });
    categoryData.sort(
      (category1, category2) =>
        (category1.productOfCategory - category2.productOfCategory) * -1
    );
    // make chart top 9 and others
    const data = categoryData.slice(0, 9).map(category => {
      labels.push(category.label);
      return category.productOfCategory;
    });
    labels.push('others');
    data.push(
      categoryData
        .slice(10)
        .map(category => category.productOfCategory)
        .reduce((total, current) => total + current, 0)
    );
    setChartData({ labels: labels, datasets: data });
  };

  useEffect(() => {
    if (!categoryList) categoryService.getAll(dispatch, accessToken);
    if (!!categoryList && !!productList) handleUpdateChart();
  }, [categoryList, productList, dispatch]);

  return (
    <div className="p-2 border rounded">
      <h6 className="text-uppercase text-center">
        {'Số lượng sản phẩm (danh mục)'}
      </h6>
      {isCategoryFetching || isCategoryError ? (
        <div className="spinner-border text-primary"></div>
      ) : (
        <PieChart
          labels={chartData.labels}
          data={chartData.datasets}
          label="Số lượng"
        />
      )}
    </div>
  );
};

export default React.memo(CategoryProductChart);
