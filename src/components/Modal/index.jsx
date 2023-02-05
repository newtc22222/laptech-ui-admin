import React from 'react';
import { Button, Modal } from 'react-bootstrap';
// import text from '../../lang/vietnamese';

function ModalCustom({ show, setShow, props }) {
  const handleClose = () => setShow(false);
  const { title, content, handleDelete } = props;

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>{title || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content || ''}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Huỷ bỏ
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustom;
