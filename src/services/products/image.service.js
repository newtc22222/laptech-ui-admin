import apiCall from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';
import { makeToast, toastType } from '../../utils/makeToast';

function handleFetchError(err, dispatch, customMessage = null) {
  const defaultMessage = 'Dữ liệu lỗi, không thể gửi đến server!';
  makeToast(customMessage || defaultMessage, toastType.error);
  makeRefreshToken(err, dispatch);
}

const productImageService = {
  add: async (dispatch, data, token) => {
    await apiCall.POST(
      `images`,
      data,
      token,
      () => {},
      result => {
        makeToast('Thông tin đã cập nhật thành công!', toastType.success);
      },
      err => handleFetchError(err, dispatch)
    );
  },
  remove: async (dispatch, data, imageId, token) => {
    await apiCall.DELETE(
      `images/${imageId}`,
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

export default productImageService;
