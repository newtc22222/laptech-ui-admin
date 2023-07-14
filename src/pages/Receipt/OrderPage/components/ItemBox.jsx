import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { Loading } from '../../../../components/common';
import ItemCard from './ItemCard';

import useFetch from '../../../../hooks/useFetch';
import { getCurrencyString, formatDateTime } from '../../../../utils';
import content from '../content';

function ItemBox({ data: invoice, user, ...rest }) {
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

  if (!invoice || !itemList) return <Loading />;

  function getTotalPrice() {
    const totalPrice = itemList
      .map(i => i.discountPrice * i.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return getCurrencyString(totalPrice, 'vi-VN', 'VND');
  }

  return (
    <div className="p-2">
      <table className="table table-bordered table-hover table-responsive w-75">
        <tbody>
          <tr>
            <td>{content.box.id}</td>
            <td>{invoice.id}</td>
          </tr>
          <tr>
            <td>{content.box.dateCreated}</td>
            <td className="fw-bold">{formatDateTime(invoice.createdDate)}</td>
          </tr>
          <tr>
            <td>{content.box.customer}</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>{content.box.phone}</td>
            <td>{invoice.phone}</td>
          </tr>
          <tr>
            <td>{content.box.address}</td>
            <td>{invoice.address}</td>
          </tr>
          <tr>
            <td>{content.box.paymentType}</td>
            <td className="fw-bold">
              {content.box.paymentTypeSub[invoice.paymentType.toLowerCase()]}
            </td>
          </tr>
          <tr>
            <td>{content.box.itemQuantity}</td>
            <td>{itemList.length}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul className="list-group list-group-sm">
                <li className="list-group-item">
                  {content.box.discountAmount + ': ' + invoice.discountAmount}
                </li>
                <li className="list-group-item">
                  {content.box.shipCost + ': ' + invoice.shipCost}
                </li>
                <li className="list-group-item">
                  {content.box.tax + ': ' + invoice.tax}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>{content.box.totalPrice}</td>
            <td className="fw-bold text-primary">{getTotalPrice()}</td>
          </tr>
          <tr>
            <td>{content.box.paidStatus}</td>
            <td className={'fw-bold ' + (invoice.paid && 'text-success')}>
              {content.box.paidStatusText[invoice.paid]}
            </td>
          </tr>
        </tbody>
      </table>
      <Row xs={1} md={2} className="g-2 mt-3">
        {itemList.map(item => (
          <Col key={item.id}>
            <ItemCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ItemBox;
