import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { statisticService } from '../../../../services';
import { useNavigate } from 'react-router-dom';

const ProductShow = ({ topProduct = [], variant = 'primary' }) => {
  return (
    <ol className="list-group list-group-numbered">
      {topProduct.map((item, idx) => (
        <li
          key={idx}
          className={classNames(
            'list-group-item d-flex justify-content-between align-items-start',
            idx === 0 && `bg-${variant} text-white`,
            idx < 3 && `list-group-item-${variant}`
          )}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.product.name || ''}</div>
            {item.description || ''}
          </div>
          <span
            className={`badge bg-${
              variant === 'primary' ? 'warning' : 'primary'
            } text-${variant === 'primary' ? 'dark' : 'light'}`}
          >
            {item.quantity}
          </span>
        </li>
      ))}
    </ol>
  );
};

const TopProductList = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [topProductSeller, setTopProductSeller] = useState([]);
  const [topProductImport, setTopProductImport] = useState([]);
  const [productListOutOfStock, setProductListOutOfStock] = useState([]);

  useEffect(() => {
    statisticService.getAllProductsFigures(dispatch, accessToken).then(data => {
      setTopProductSeller(data.topProductSeller);
      setTopProductImport(data.topProductImport);
      setProductListOutOfStock(data.productListOutOfStock);
    });
  }, []);

  return (
    <div className="row mx-1 gap-1">
      <div className="col border rounded p-1">
        <h5
          className="text-center"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/invoice/import')}
        >
          TOP SẢN PHẨM NHẬP HÀNG
        </h5>
        <ProductShow topProduct={topProductImport} />
      </div>
      <div className="col border rounded p-1">
        <h5
          className="text-center"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/invoice/order')}
        >
          TOP SẢN PHẨM BÁN HÀNG
        </h5>
        <ProductShow topProduct={topProductSeller} variant="success" />
      </div>
      <div
        className="col border rounded p-1"
        style={{ maxHeight: '693px', overflowY: 'auto' }}
      >
        <h5
          className="text-center"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/product/all-products')}
        >
          SẢN PHẨM ĐANG HẾT HÀNG
        </h5>
        <div className="d-flex flex-column gap-1">
          {productListOutOfStock.map(product => (
            <div className="fw-bold border px-1">{product.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProductList;
