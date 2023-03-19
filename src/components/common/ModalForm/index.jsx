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
      <Modal.Body>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{object ? titleEditMode : titleCreateMode}</h1>
          {object && (
            <div className="d-flex" style={{ fontSize: '0.65rem' }}>
              <p>{titleCreatedDate + getStringBackTime(object?.createdDate)}</p>
              <p className="ms-3 fw-bold">
                {titleModifiedDate + getStringBackTime(object?.modifiedDate)}
              </p>
            </div>
          )}
          <div>
            <button className="btn btn-primary fw-bold me-3" onClick={action}>
              {titleButtonSave}
            </button>
            <button className="btn btn-secondary fw-bold" onClick={handleBack}>
              {titleButtonBack}
            </button>
          </div>
        </div>
        <FormContent />
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
