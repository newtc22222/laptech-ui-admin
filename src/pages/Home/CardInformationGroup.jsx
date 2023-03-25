import React from 'react';
import _ from 'lodash';

import CardInformation from './CardInformation';

const CardInformationGroup = () => {
  const cardList = [
    {
      title: 'Hoá đơn trong ngày',
      value: '120'
    },
    {
      title: 'Thu nhập trong ngày',
      value: '2720.00$'
    },
    {
      title: 'Truy cập trong ngày',
      value: '29'
    },
    {
      title: 'Số sản phẩm đang hết hàng',
      value: '11'
    }
  ];

  const color = _.shuffle(['primary', 'success', 'warning', 'info']);

  return (
    <div className="row">
      {cardList.map((card, index) => {
        return (
          <CardInformation
            key={index}
            title={card.title}
            value={card.value}
            className={'text-' + color.pop()}
          />
        );
      })}
    </div>
  );
};

export default CardInformationGroup;
