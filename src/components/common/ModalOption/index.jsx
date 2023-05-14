import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

function ModalOption({ children, handleBack, ...rest }) {
  return (
    <Modal
      show
      onHide={handleBack}
      backdrop="static"
      className={classNames('modal-lg', rest.className)}
    >
      <Modal.Header>
        <Modal.Title>{rest?.title || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {rest.renderOption}
        <Button variant="secondary" onClick={handleBack}>
          {rest.titleCancel || 'Huỷ bỏ'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOption;
