import FetchAPI from '../custom/fetch-api';
import {
  fetchInvoiceStart,
  fetchInvoiceFailed,
  getInvoiceSuccess,
  createInvoiceSuccess,
  updateInvoiceSuccess,
  deleteInvoiceSuccess
} from '../redux-feature/invoice.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';

const apiInvoices = {
  getAllInvoices: async dispatch => {
    await FetchAPI.GET_ALL(
      'invoices',
      null,
      null,
      () => dispatch(fetchInvoiceStart()),
      invoiceList => dispatch(getInvoiceSuccess(invoiceList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchInvoiceFailed());
      }
    );
  },
  createNewInvoice: async (dispatch, invoice, token) => {
    await FetchAPI.POST(
      'invoices',
      invoice,
      token,
      () => dispatch(fetchInvoiceStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một hóa đơn vừa được thêm vào cơ sở dữ liệu!'
        );
        dispatch(createInvoiceSuccess(result.data));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchInvoiceFailed());
      }
    );
  },
  updateInvoice: async (dispatch, updateInvoice, invoiceId, token) => {
    await FetchAPI.PUT(
      `invoices/${invoiceId}`,
      updateInvoice,
      token,
      () => dispatch(fetchInvoiceStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Dữ liệu của hóa đơn vừa được cập nhật vào cơ sở dữ liệu!!'
        );
        console.table(result);
        updateInvoice.id = invoiceId;
        dispatch(updateInvoiceSuccess(updateInvoice));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchInvoiceFailed());
      }
    );
  },
  deleteInvoice: async (dispatch, invoiceId, token) => {
    await FetchAPI.DELETE(
      `invoices/${invoiceId}`,
      null,
      token,
      () => dispatch(fetchInvoiceStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        console.table(result);
        dispatch(deleteInvoiceSuccess(invoiceId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa hóa đơn này khỏi hệ thống!'
        );
        dispatch(fetchInvoiceFailed());
      }
    );
  }
};

export default apiInvoices;
