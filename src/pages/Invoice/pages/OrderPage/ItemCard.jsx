import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { getCurrencyString } from '../../../../utils/formatCurency';

function ItemCard({ data: item, ...props }) {
  const { id, name, price, discountPrice, quantity } = item;

  function displayPrice() {
    return price === discountPrice ? (
      <span className="fw-bold">{formatCurrency(price)}</span>
    ) : (
      <>
        <del>{formatCurrency(price)}</del>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
          className="mx-2"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
        <span className="fw-bold">
          {formatCurrency(discountPrice, 'vi-VN', 'VND')}
        </span>
      </>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <img className="img-fluid" src={item.image} alt={name} />
          </Col>
          <Col>
            <Card.Title>Name: {name}</Card.Title>
            <div>Price: {price}</div>
            {price !== discountPrice && (
              <div>Discount price: {discountPrice}</div>
            )}
            <div>Quantity: {quantity}</div>
            <div className="text-primary fw-bold">
              Total:{' '}
              {getCurrencyString(discountPrice * quantity, 'vi-VN', 'VND')}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
