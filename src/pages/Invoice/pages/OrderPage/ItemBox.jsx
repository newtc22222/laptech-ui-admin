import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { getCurrencyString } from '../../../../utils/formatCurency';
import ItemCard from './ItemCard';

function ItemBox({ data: invoice, ...props }) {
  if (!invoice) return <div>Loading...</div>;

  function getTotalPrice() {
    const totalPrice = invoice.items
      .map(i => i.discountPrice * i.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return getCurrencyString(totalPrice);
  }

  return (
    <div className="d-grid gap-2">
      <div>ID: {invoice.id}</div>
      <div>Customer: {invoice.id}</div>
      <div>
        Payment type: <span className="fw-bold">{invoice.paymentType}</span>
      </div>
      <div>Item quantity: {invoice.items.length}</div>
      <div>
        Total price: <span className="fw-bold">{getTotalPrice()}</span>
      </div>
      <Row xs={1} md={2} className="g-2">
        {invoice.items.map(item => (
          <Col key={item.id}>
            <ItemCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ItemBox;
