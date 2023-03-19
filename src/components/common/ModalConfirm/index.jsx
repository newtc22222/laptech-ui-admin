import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const titleConfirm = 'Xác nhận';
const titleCancel = 'Huỷ bỏ';

/**
 *
 * @param {{ show: boolean, setShow: function, props: object}}
 * @returns {JSX.Element}
 */
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

ModalCustom.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired
};

export default ModalCustom;
