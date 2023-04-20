import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

const titleCancel = 'Huỷ bỏ';

/**
 *
 * @param {{ show: boolean, setShow: function, props: object}}
 * @returns {JSX.Element}
 */
function ModalOption({ children, show, setShow, ...props }) {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      className={classNames('modal-lg', props.className)}
    >
      <Modal.Header>
        <Modal.Title>{props?.title || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {props.renderOption}
        <Button variant="secondary" onClick={handleClose}>
          {props.titleCancel || titleCancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOption;
