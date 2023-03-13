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
import MakeRefreshToken from '../helper/MakeRefreshToken';
import { getUpdateByUserInSystem } from '../../helper/getUser';

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
        dispatch(createLabelSuccess(result));
      },
      err => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchLabelFailed());
        MakeRefreshToken(err, dispatch);
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
        updateLabel.id = labelId;
        dispatch(updateLabelSuccess(updateLabel));
      },
      err => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchLabelFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  },
  deleteLabel: async (dispatch, labelId, token) => {
    await FetchAPI.DELETE(
      `labels/${labelId}`,
      getUpdateByUserInSystem(),
      token,
      () => dispatch(fetchLabelStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        dispatch(deleteLabelSuccess(labelId));
      },
      err => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa nhãn này khỏi hệ thống!'
        );
        dispatch(fetchLabelFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  }
};

export default apiLabels;
