import classNames from 'classnames';
import React from 'react';

const TopProductList = ({ topProduct = [], variant = 'primary' }) => {
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
            {item.description || 'Some content here!'}
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

export default TopProductList;
