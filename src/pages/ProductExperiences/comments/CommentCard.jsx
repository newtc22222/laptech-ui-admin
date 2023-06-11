import React from 'react';
import { Card } from 'react-bootstrap';

import { getStringBackTime } from '../../../utils';
import content from '../content';

const CommentCard = ({
  data,
  handleShowCommentReplyForm,
  handleDisableComment,
  handleChangeViewProduct,
  ...rest
}) => {
  const {
    id,
    product,
    username,
    phone,
    content: commentContent,
    createdDate
  } = data;

  return (
    <Card border="dark">
      <Card.Header>{product.name || 'Unknown'}</Card.Header>
      <Card.Body>
        <Card.Title>
          {username + ' | ' + phone + ' -'}
          <small className="text-muted ms-2">
            {getStringBackTime(createdDate)}
          </small>
        </Card.Title>
        <Card.Text>{commentContent}</Card.Text>
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleChangeViewProduct(true, product)}
          >
            {content.card.viewProduct}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleShowCommentReplyForm(data)}
          >
            {content.card.replyComment}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleDisableComment(id)}
          >
            {content.card.disableComment}
          </button>
        </div>
        {data.childrens &&
          data.childrens.map(children => {
            return (
              <div className="container-fluid ms-2 mt-2" key={children.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {children.username + ' | ' + children.phone + ' -'}
                      <small className="text-muted ms-2">
                        {getStringBackTime(createdDate)}
                      </small>
                    </Card.Title>
                    <Card.Text>{children.content}</Card.Text>
                    <div className="btn-group btn-group-sm" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleShowCommentReplyForm(data)}
                      >
                        {content.card.replyComment}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDisableComment(children.id)}
                      >
                        {content.card.disableComment}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
