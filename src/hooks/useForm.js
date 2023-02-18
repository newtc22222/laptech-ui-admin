import React from 'react';
import { Modal } from 'react-bootstrap';
import { getStringBackTime } from '../utils/HandleTimer';

const titleEditMode = 'Sửa thông tin';
const titleCreateMode = 'Thêm thông tin mới';
const titleButtonSave = 'Lưu thông tin';
const titleButtonBack = 'Trở lại';
const titleCreatedDate = 'Thời gian tạo: ';
const titleModifiedDate = 'Thời gian chỉnh sửa gần nhất: ';

/**
 * @since 2023-02-10
 * @param {*} object
 * @param {() => {}} cb_handleBack
 * @param {() => {}} cb_action create or update (save)
 * @param {() => JSX.Element} cb_handleForm
 */
function useForm(object, cb_handleBack, cb_action, cb_handleForm) {
  return (
    <Modal show onHide={cb_handleBack} backdrop="static" className="modal-xl">
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
            <button
              className="btn btn-primary fw-bold me-3"
              onClick={cb_action}
            >
              {titleButtonSave}
            </button>
            <button
              className="btn btn-secondary fw-bold"
              onClick={cb_handleBack}
            >
              {titleButtonBack}
            </button>
          </div>
        </div>
        {cb_handleForm()}
      </Modal.Body>
    </Modal>
  );
}

export default useForm;
