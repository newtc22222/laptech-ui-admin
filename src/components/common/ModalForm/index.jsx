import React from 'react';
import { Modal } from 'react-bootstrap';
import { getStringBackTime } from '../../../utils/HandleTimer';

const titleEditMode = 'Sửa thông tin';
const titleCreateMode = 'Thêm thông tin mới';
const titleButtonSave = 'Lưu thông tin';
const titleButtonBack = 'Trở lại';
const titleCreatedDate = 'Thời gian tạo: ';
const titleModifiedDate = 'Thời gian chỉnh sửa gần nhất: ';

/**
 * @since 2023-02-10
 * @param {{ object: object, handleBack: function, action: () => {}, FormContent: () => JSX.Element}}
 * @return {JSX.Element}
 */
function ModalForm({ object, handleBack, action, FormContent }) {
  return (
    <Modal show onHide={handleBack} backdrop="static" className="modal-xl">
      <Modal.Header>
        <h2>{object ? titleEditMode : titleCreateMode}</h2>
        {object && (
          <div style={{ fontSize: '0.65rem' }}>
            <p>{titleCreatedDate + getStringBackTime(object?.createdDate)}</p>
            <p className="fw-bold">
              {titleModifiedDate + getStringBackTime(object?.modifiedDate)}
            </p>
          </div>
        )}
      </Modal.Header>
      <Modal.Body>
        <FormContent />
      </Modal.Body>
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
    </Modal>
  );
}

export default ModalForm;
