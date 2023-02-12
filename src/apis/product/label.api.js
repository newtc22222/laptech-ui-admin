import FetchAPI from '../custom/fetch-api';
import {
  fetchLabelStart,
  fetchLabelFailed,
  getLabelSuccess,
  createLabelSuccess,
  updateLabelSuccess,
  deleteLabelSuccess
} from '../../redux-feature/product_slice/label.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';

const apiLabels = {
  getAllLabels: async dispatch => {
    await FetchAPI.GET_ALL(
      'labels',
      null,
      null,
      () => dispatch(fetchLabelStart()),
      labelList => dispatch(getLabelSuccess(labelList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchLabelFailed());
      }
    );
  },
  createNewLabel: async (dispatch, label, token) => {
    await FetchAPI.POST(
      'labels',
      label,
      token,
      () => dispatch(fetchLabelStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một nhãn mới vừa được thêm vào cơ sở dữ liệu!'
        );
        dispatch(createLabelSuccess(result.data));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchLabelFailed());
      }
    );
  },
  updateLabel: async (dispatch, updateLabel, labelId, token) => {
    await FetchAPI.PUT(
      `labels/${labelId}`,
      updateLabel,
      token,
      () => dispatch(fetchLabelStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Dữ liệu của nhãn vừa được cập nhật vào cơ sở dữ liệu!!'
        );
        console.table(result);
        updateLabel.id = labelId;
        dispatch(updateLabelSuccess(updateLabel));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchLabelFailed());
      }
    );
  },
  deleteLabel: async (dispatch, labelId, token) => {
    await FetchAPI.DELETE(
      `labels/${labelId}`,
      null,
      token,
      () => dispatch(fetchLabelStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        console.table(result);
        dispatch(deleteLabelSuccess(labelId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa nhãn này khỏi hệ thống!'
        );
        dispatch(fetchLabelFailed());
      }
    );
  }
};

export default apiLabels;
