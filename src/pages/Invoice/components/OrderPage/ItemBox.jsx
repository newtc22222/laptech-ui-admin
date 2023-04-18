import React from 'react';

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
      <div>Payment type: {invoice.paymentType}</div>
      <div>Item quantity: {invoice.items.length}</div>
      <div>Total price: {getTotalPrice()}</div>
      {invoice.items.map(item => (
        <ItemCard key={item.id} data={item} />
      ))}
    </div>
  );
}

export default ItemBox;
