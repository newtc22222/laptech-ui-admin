import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiProducts from '../../apis/product/product.api';

import { getCurrencyString } from '../../utils/HandleCurency';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productList, isFetching, error } = useSelector(
    state => state.products
  );

  useEffect(() => {
    apiProducts.getAllProducts(dispatch);
  }, []);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {productList?.map(product => (
        <li>
          <p>{product.id}</p>
          <p>{product.name}</p>
          {/* <p>{ product.quantity }</p> */}
          <p>{getCurrencyString(product.price) + ' vnđ'}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductPage;
