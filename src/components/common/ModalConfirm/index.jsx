import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const titleConfirm = 'Xác nhận';
const titleCancel = 'Huỷ bỏ';

function ModalCustom({ show, setShow, props }) {
  const handleClose = () => setShow(false);
  const { title, content, handleDelete } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      className="modal-lg"
    >
      <Modal.Header>
        <Modal.Title>{title || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content || ''}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {titleCancel}
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          {titleConfirm}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustom;
