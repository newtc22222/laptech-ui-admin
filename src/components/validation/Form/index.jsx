import React from 'react';

const titleBtnConfỉmIsSubmitting = 'Đang thực thi ...';
const titleBtnConfirm = 'Lưu thông tin';
const titleBtnCancel = 'Trở lại';
/**
 * @param {{children: JSX.Element, handleSubmit: Function, submitAction: Function, cancelAction: Function}}
 */
const Form = ({
  children,
  handleSubmit,
  submitAction,
  cancelAction,
  ...rest
}) => {
  return (
    <div className="container p-3">
      <form noValidate onSubmit={handleSubmit(submitAction)}>
        <div>{children}</div>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={rest.isSubmitting || !rest.isDirty}
          >
            {rest.isSubmitting ? titleBtnConfỉmIsSubmitting : titleBtnConfirm}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={cancelAction}
            disabled={rest.isSubmitting}
          >
            {titleBtnCancel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
