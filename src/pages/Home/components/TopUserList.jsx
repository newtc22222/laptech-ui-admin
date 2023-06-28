import React, { useEffect, useState } from 'react';

import { getCurrencyString } from '../../../utils';

const TopUserList = ({ userFigures }) => {
  const [topUserList, setTopUserList] = useState([]);

  const handleUpdateTopUserList = () => {
    const topUserValue = userFigures.topUserValue;
    topUserValue.sort((u1, u2) => (u1.value - u2.value) * -1);
    setTopUserList(topUserValue);
  };

  useEffect(() => {
    if (userFigures) handleUpdateTopUserList();
  }, [userFigures]);

  return (
    <div className="p-3 border rounded">
      <h6 className="text-uppercase text-center">{'Khách hàng tiềm năng'}</h6>
      <ol className="list-group list-group-numbered">
        {topUserList.map(userData => {
          const { user, value } = userData;
          return (
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
              key={user.id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{user.name}</div>
                Phone: {user.phone}
              </div>
              <span className="badge bg-primary rounded-pill">
                {getCurrencyString(value, 'vi-VN', 'VND')}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TopUserList;
