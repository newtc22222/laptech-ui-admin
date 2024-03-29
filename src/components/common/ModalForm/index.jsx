import React from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';

import { getStringBackTime } from '../../../utils/formatTime';

const titleEditMode = 'Sửa thông tin';
const titleCreateMode = 'Thêm thông tin mới';
const titleButtonSave = 'Lưu thông tin';
const titleButtonBack = 'Trở lại';
const titleCreatedDate = 'Thời gian tạo: ';
const titleModifiedDate = 'Thời gian chỉnh sửa gần nhất: ';

/**
 * @since 2023-02-10
 */
function ModalForm({
  children,
  object,
  action,
  show = true,
  handleBack,
  disabledFooter,
  ...props
}) {
  const renderFooter = disabledFooter ? (
    <></>
  ) : (
    <Modal.Footer>
      <div>
        <button className="btn btn-primary fw-bold me-3" onClick={action}>
          {titleButtonSave}
        </button>
        <button className="btn btn-secondary fw-bold" onClick={handleBack}>
          {titleButtonBack}
        </button>
      </div>
    </Modal.Footer>
  );

  return (
    <Modal
      show={show}
      centered={props.centered}
      onHide={handleBack}
      backdrop={props.backdrop || 'static'}
      className={classNames('modal-xl', props.className)}
    >
      <Modal.Header>
        <h2>{props.title || (object ? titleEditMode : titleCreateMode)}</h2>
        {object && (
          <div className="d-flex flex-column">
            <small>
              {titleCreatedDate + getStringBackTime(object.createdDate)}
            </small>
            <small className="fw-bold">
              {titleModifiedDate + getStringBackTime(object.modifiedDate)}
            </small>
          </div>
        )}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {renderFooter}
    </Modal>
  );
}

export default ModalForm;
