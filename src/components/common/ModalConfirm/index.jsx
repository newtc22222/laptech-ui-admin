import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

const titleConfirm = 'Xác nhận';
const titleCancel = 'Huỷ bỏ';

/**
 *
 * @param {{ show: boolean, setShow: function, props: object}}
 * @returns {JSX.Element}
 */
function ModalCustom({ show, setShow, ...props }) {
  const handleClose = () => setShow(false);
  const { title, content, handleDelete } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      className={classNames('modal-lg', props.className)}
    >
      <Modal.Header>
        <Modal.Title>{title || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content || ''}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDelete}>
          {titleConfirm}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          {titleCancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustom;
