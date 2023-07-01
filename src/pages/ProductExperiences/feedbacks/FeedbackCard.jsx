import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';

import { ico_star } from '../../../assets/svg/ecom';
import { getStringBackTime } from '../../../utils';
import content from '../content';

const FeedbackCard = ({
  data,
  handleDisableFeedback,
  handleChangeViewMode,
  ...rest
}) => {
  const {
    id,
    product,
    user,
    content: feedbackContent,
    ratingPoint,
    createdDate
  } = data;

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starList = [];
    for (let i = 1; i <= ratingPoint; i++) {
      starList.push(ico_star.fill);
    }
    for (let i = ratingPoint + 1; i <= 5; i++) {
      starList.push(ico_star.none);
    }
    setStars(starList);
  }, []);

  return (
    <Card
      border={classNames({
        success: ratingPoint === 5,
        info: ratingPoint === 4,
        warning: ratingPoint === 2,
        danger: ratingPoint === 1
      })}
    >
      <Card.Header>{product.name || 'Unknown'}</Card.Header>
      <Card.Body>
        <Card.Title>{user?.name + ' | ' + user?.phone}</Card.Title>
        <Card.Text>{feedbackContent}</Card.Text>
        <div className="d-flex flex-row gap-2">
          {stars.map((star, idx) => (
            <React.Fragment key={idx}>{star}</React.Fragment>
          ))}
        </div>
        <div className="btn-group btn-group-sm mt-3" role="group">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleChangeViewMode('product', product)}
          >
            {content.card.viewProduct}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleChangeViewMode('user', user)}
          >
            {content.card.viewUser}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleDisableFeedback(id)}
          >
            {content.card.disableFeedback}
          </button>
        </div>
      </Card.Body>
      <Card.Footer>{getStringBackTime(createdDate)}</Card.Footer>
    </Card>
  );
};

export default FeedbackCard;
