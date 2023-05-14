import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Loading } from '../../../../components/common';
import ItemCard from './ItemCard';

import useFetch from '../../../../hooks/useFetch';
import { getCurrencyString } from '../../../../utils';
import { useSelector } from 'react-redux';

function ItemBox({ data: invoice, ...rest }) {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { data: itemList } = useFetch(
    `/invoices/${invoice.id}/units?isCard=true`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!invoice || !itemList) return <div>Loading...</div>;

  function getTotalPrice() {
    const totalPrice = itemList
      .map(i => i.discountPrice * i.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return getCurrencyString(totalPrice, 'vi-VN', 'VND');
  }

  return (
    <div className="d-grid gap-2">
      <div>ID: {invoice.id}</div>
      <div>Customer: {invoice.userId}</div>
      <div>
        Payment type: <span className="fw-bold">{invoice.paymentType}</span>
      </div>
      <div>Item quantity: {itemList.length}</div>
      <div>
        Total price: <span className="fw-bold">{getTotalPrice()}</span>
      </div>
      {!itemList ? (
        <Loading />
      ) : (
        <Row xs={1} md={2} className="g-2">
          {itemList.map(item => (
            <Col key={item.id}>
              <ItemCard data={item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ItemBox;
