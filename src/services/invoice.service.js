import apiCall from '../apis';
import makeService from './common/makeService';
import makeRefreshToken from './common/makeRefreshToken';
import { makeToast, toastType } from '../utils';
import { action } from '../store/slice/invoice.slice';

const invoiceService = {
  ...makeService('invoices', action),
  updateStatus: async (dispatch, updateObject, invoiceId, token) => {
    await apiCall.PUT(
      `invoices/${invoiceId}/status`,
      {
        status: updateObject.orderStatus,
        updateBy: updateObject.updateBy
      },
      token,
      () => {},
      result => {
        makeToast(
          `Trạng thái của hóa đơn vừa được cập nhật vào cơ sở dữ liệu!`,
          toastType.success
        );
        updateObject.id = invoiceId;
        dispatch(action.updateSuccess(updateObject));
      },
      err => {
        const defaultMessage = 'Dữ liệu lỗi, không thể gửi đến server!';
        makeToast(defaultMessage, toastType.error);
        dispatch(action.fetchFailed());
        makeRefreshToken(err, dispatch);
      }
    );
  }
};

export default invoiceService;
