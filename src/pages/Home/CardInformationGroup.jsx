import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import CardInformation from './CardInformation';
import { dashboardStatisticService } from '../../services';
import { getCurrencyString } from '../../utils';

const CardInformationGroup = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);

  const cardList = [
    {
      title: 'Hoá đơn trong ngày',
      key: 'billInDay'
    },
    {
      title: 'Thu nhập trong ngày',
      key: 'incomeInDay',
      format: value => getCurrencyString(value, 'vi-VN', 'VND')
    },
    {
      title: 'Truy cập trong ngày',
      key: 'accessInDay'
    },
    {
      title: 'Số sản phẩm đang hết hàng',
      key: 'productOutOfStock',
      format: data => data.length
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    dashboardStatisticService
      .getBoxData(dispatch, accessToken)
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  const color = _.shuffle(['primary', 'success', 'warning', 'info']);

  if (!data) return <></>;

  return (
    <div className="row">
      {cardList
        .map(item => {
          let value = data[item.key] || '0';
          if (typeof item.format === 'function') {
            value = item.format(value);
          }
          return { ...item, value: value };
        })
        .map((card, index) => {
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
