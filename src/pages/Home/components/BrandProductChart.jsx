import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PieChart } from '../../../components/charts';

import { brandService } from '../../../services';

const BrandProductChart = ({ productList }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    data: brandList,
    isBrandFetching,
    isBrandError
  } = useSelector(state => state['brands']);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const handleUpdateChart = () => {
    const labels = [];
    const brandData = brandList.map(brand => {
      const productOfBrand = productList.filter(
        product => product.brandId === brand.id
      );
      return {
        label: brand.name,
        productOfBrand: productOfBrand.length
      };
    });
    brandData.sort(
      (brand1, brand2) => (brand1.productOfBrand - brand2.productOfBrand) * -1
    );
    // make chart top 9 and others
    const data = brandData.slice(0, 9).map(brand => {
      labels.push(brand.label);
      return brand.productOfBrand;
    });
    labels.push('others');
    data.push(
      brandData
        .slice(10)
        .map(brand => brand.productOfBrand)
        .reduce((total, current) => total + current, 0)
    );
    setChartData({ labels: labels, datasets: data });
  };

  useEffect(() => {
    if (!brandList) brandService.getAll(dispatch, accessToken);
    if (!!brandList && !!productList) handleUpdateChart();
  }, [brandList, productList, dispatch]);

  return (
    <div className="p-2 border rounded">
      <h6 className="text-uppercase text-center">
        {'Số lượng sản phẩm (thương hiệu)'}
      </h6>
      {isBrandFetching || isBrandError ? (
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

export default React.memo(BrandProductChart);
