import React from "react";

const titleEditMode = 'Sửa thông tin'
const titleCreateMode = 'Thêm thông tin mới'
const titleButtonSave = 'Lưu thông tin';
const titleButtonBack = 'Trở lại';

/**
 * @since 2023-02-10
 * @param {*} object 
 * @param {() => {}} cb_handleBack 
 * @param {() => {}} cb_action create or update (save) 
 * @param {() => JSX.Element} cb_handleForm 
 */
function useForm(object, cb_handleBack, cb_action, cb_handleForm) {
  return (
    <div className="container mt-3 shadow p-3 mb-5 bg-body rounded">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{object ? titleEditMode : titleCreateMode}</h1>
        <div>
          <button
            className="btn btn-primary fw-bold me-3"
            onClick={cb_action}
          >
            {titleButtonSave}
          </button>
          <button className="btn btn-secondary fw-bold" onClick={cb_handleBack}>
            {titleButtonBack}
          </button>
        </div>
      </div>
      {cb_handleForm()}
    </div>
  )
}

export default useForm;