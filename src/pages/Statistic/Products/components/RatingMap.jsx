import React from 'react';
import classNames from 'classnames';

const RatingMap = ({ ratingArr = [] }) => {
  const totalPoint = ratingArr
    .map((quantity, index) => quantity * (index + 1))
    .reduce((prev, current) => prev + current, 0);
  const totalVote = ratingArr.reduce((prev, current) => prev + current, 0);
  const avgPoint = totalPoint / (totalVote || 1);

  // use this to show
  const ratingArrReverse = window.structuredClone(ratingArr).reverse();

  return (
    <div className="mx-2 border rounded py-1 px-2">
      <h5
        className={classNames({
          'text-danger': avgPoint <= 2,
          'text-success': avgPoint >= 4
        })}
      >{`Average point: ${avgPoint.toFixed(2)}/5`}</h5>
      {ratingArrReverse.map((quantity, idx) => {
        return (
          <div key={idx} className="d-flex align-items-center">
            <div className="me-2">{5 - idx}</div>
            <div className="progress flex-fill">
              <div
                className={'progress-bar'}
                role="progressbar"
                style={{ width: `${(quantity / totalVote) * 100}%` }}
                aria-valuenow={quantity}
                aria-valuemin="0"
                aria-valuemax={totalVote}
              >
                {quantity}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingMap;
