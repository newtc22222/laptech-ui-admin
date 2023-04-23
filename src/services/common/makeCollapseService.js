import apiCall from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';
import { makeToast, toastType } from '../../utils/makeToast';

function makeCollapseService(objectNameMain, objectNameExtra) {
  /**
   * @param {Error} err
   * @param {useDispatch} dispatch
   * @param {string} customMessage
   */
  function handleFetchError(err, dispatch, customMessage = null) {
    const defaultMessage = 'Dữ liệu lỗi, không thể gửi đến server!';
    makeToast(customMessage || defaultMessage, toastType.error);
    makeRefreshToken(err, dispatch);
  }

  return {
    add: async (dispatch, data, objectMainId, token) => {
      await apiCall.POST(
        `${objectNameMain}/${objectMainId}/${objectNameExtra}`,
        data,
        token,
        () => {},
        result => {
          makeToast('Thông tin đã cập nhật thành công!', toastType.success);
        },
        err => handleFetchError(err, dispatch)
      );
    },
    remove: async (dispatch, data, objectMainId, token) => {
      await apiCall.DELETE(
        `${objectNameMain}/${objectMainId}/${objectNameExtra}`,
        data,
        token,
        () => {},
        result => {
          makeToast('Thông tin đã cập nhật thành công!', toastType.success);
        },
        err => handleFetchError(err, dispatch)
      );
    }
  };
}

export default makeCollapseService;
