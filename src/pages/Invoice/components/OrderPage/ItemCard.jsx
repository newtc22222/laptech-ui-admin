import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { getCurrencyString } from '../../../../utils/formatCurency';

function ItemCard({ data: item, ...props }) {
  const { id, name, price, discountPrice, quantity } = item;
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <img
              className="img-fluid"
              src="https://placehold.co/200x200"
              alt={name}
            />
          </Col>
          <Col>
            <Card.Title>Name: {name}</Card.Title>
            <Card.Text>
              <div>Price: {price}</div>
              {price !== discountPrice && (
                <div>Discount price: {discountPrice}</div>
              )}
              <div>Quantity: {quantity}</div>
              <div className="text-primary fw-bold">
                Total: {getCurrencyString(discountPrice * quantity)}
              </div>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
