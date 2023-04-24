import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { getCurrencyString } from '../../../../utils/formatCurency';

function ItemCard({ data: item, ...props }) {
  const { id, name, price, discountPrice, quantity } = item;

  function displayPrice() {
    return price === discountPrice ? (
      <span className="fw-bold">{getCurrencyString(price)}</span>
    ) : (
      <>
        <del>{getCurrencyString(price)}</del>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right mx-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
        <span className="fw-bold">{getCurrencyString(discountPrice)}</span>
      </>
    );
  }

  return (
    <Card className="h-100">
      <Card.Body>
        <Row>
          <Col xs={3}>
            <img className="img-fluid" src={item.image} alt={name} />
          </Col>
          <Col>
            <Card.Title>Name: {name}</Card.Title>
            <div>Price: {displayPrice()}</div>
            <div>Quantity: {quantity}</div>
            <div className="text-primary fw-bold">
              Total: {getCurrencyString(discountPrice * quantity)}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
