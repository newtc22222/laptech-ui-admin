import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { formatDateTime } from '../../../utils';
import content from '../content';

const BannerCard = ({
  banner,
  handleShowUpdateModal,
  handleShowDeleteModal
}) => {
  function displayDate() {
    return (
      <>
        <span className="fw-bold">
          {formatDateTime(banner.usedDate).slice(9)}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right mx-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
        <span className="fw-bold">
          {formatDateTime(banner.endedDate).slice(9)}
        </span>
      </>
    );
  }

  return (
    <Card className="mb-2">
      <Card.Img variant="top" src={banner.path} alt={banner.title} />
      <Card.Body>
        <Row>
          <Col xl={10}>
            <div>
              {content.card.type}
              <span className="text-uppercase fw-bold">{banner.type}</span>
            </div>
            <div className="my-2">
              {content.card.linkProduct}
              <span className="text-primary">{banner.linkProduct}</span>
            </div>
            <div>
              {content.card.usingDate}
              {displayDate()}
            </div>
          </Col>
          <Col className="d-grid gap-1">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleShowUpdateModal(banner)}
            >
              {content.card.edit}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleShowDeleteModal(banner.id)}
            >
              {content.card.delete}
            </button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BannerCard;
