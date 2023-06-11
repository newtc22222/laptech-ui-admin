import classNames from 'classnames';
import React from 'react';
import { Modal } from 'react-bootstrap';

import content from '../content';

const ViewUser = ({ user, handleChangeViewMode, ...rest }) => {
  const { id, phone, email, gender, dateOfBirth, accountStatus, genderSub } =
    content.view.user;

  return (
    <Modal show={rest.show} onHide={handleChangeViewMode}>
      {user && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{user.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column gap-1">
            <div>{id + user.id}</div>
            <div>
              {phone} <span className="fw-bold text-primary">{user.phone}</span>
            </div>
            <div>
              {email} <em>{user.email ? user.email : ''}</em>
            </div>
            <div>{gender + genderSub[user.gender]}</div>
            <div>{dateOfBirth + user.dateOfBirth}</div>
            <div>
              {accountStatus}
              <span
                className={classNames(
                  'ms-2 fw-bold',
                  user.active ? 'text-success' : 'text-secondary'
                )}
              >
                {user.active ? 'Đang hoạt động' : 'Bị khóa'}
              </span>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ViewUser;
