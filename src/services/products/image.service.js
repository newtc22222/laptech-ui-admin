import apiCall from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';
import { makeToast, toastType } from '../../utils/makeToast';

const handleAddImage = async (dispatch, data, token) => {
  await apiCall.POST(
    `images`,
    data,
    token,
    () => {},
    result => makeToast('Thông tin đã cập nhật thành công!', toastType.success),
    err => makeRefreshToken(err, dispatch, handleAddImage)
  );
};

const handleUpdateMultipleImages = async (dispatch, data, productId, token) => {
  await apiCall.PUT(
    `products/${productId}/images`,
    data,
    token,
    () => {},
    result => makeToast('Thông tin đã cập nhật thành công!', toastType.success),
    err => makeRefreshToken(err, dispatch, handleUpdateMultipleImages)
  );
};

const handleRemoveImage = async (dispatch, data, imageId, token) => {
  await apiCall.DELETE(
    `images/${imageId}`,
    data,
    token,
    () => {},
    result => makeToast('Thông tin đã cập nhật thành công!', toastType.success),
    err => makeRefreshToken(err, dispatch, handleRemoveImage)
  );
};

const productImageService = {
  add: handleAddImage,
  updateMultiple: handleUpdateMultipleImages,
  remove: handleRemoveImage
};

export default productImageService;
