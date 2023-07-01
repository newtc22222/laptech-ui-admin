import apiCall from '../apis';
import makeRefreshToken from './common/makeRefreshToken';
import { makeToast, toastType } from '../utils';

function handleFetchError(err, dispatch, customMessage = null) {
  const defaultMessage =
    'Không thể gửi dữ liệu đến server! Vui lòng thử lại lần nữa';
  makeToast(customMessage || defaultMessage, toastType.error);
  makeRefreshToken(err, dispatch);
}

const bannerService = {
  add: async (dispatch, data, token) => {
    await apiCall.POST(
      `banners`,
      data,
      token,
      () => {},
      result => {
        makeToast('Thông tin đã cập nhật thành công!', toastType.success);
      },
      err => handleFetchError(err, dispatch)
    );
  },
  update: async (dispatch, data, bannerId, token) => {
    await apiCall.PUT(
      `banners/${bannerId}`,
      data,
      token,
      () => {},
      result => {
        makeToast('Thông tin đã cập nhật thành công!', toastType.success);
      },
      err => handleFetchError(err, dispatch)
    );
  },
  remove: async (dispatch, data, bannerId, token) => {
    await apiCall.DELETE(
      `banners/${bannerId}`,
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

export default bannerService;
