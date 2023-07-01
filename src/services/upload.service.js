import apiCall from '../apis';
import MakeRefreshToken from './common/makeRefreshToken';
import { makeToast, toastType } from '../utils/makeToast';

/**
 * **use for upload data**
 * - images
 * - files
 * - etc..
 */

const uploadService = {
  uploadImage: async (dispatch, data, token) => {
    let result;
    await apiCall.POST_FILE(
      'uploads',
      data,
      token,
      () => {},
      response => {
        result = response;
      },
      err => {
        makeToast('Không thể gửi file đến Server!', toastType.error);
        MakeRefreshToken(err, dispatch);
      }
    );
    return result;
  },
  uploadMultipleImage: async (dispatch, data, token) => {
    let result;
    await apiCall.POST_FILE(
      'uploads-multiple',
      data,
      token,
      () => {},
      response => {
        result = response;
      },
      err => {
        makeToast('Không thể gửi file đến Server!', toastType.error);
        MakeRefreshToken(err, dispatch);
      }
    );
    return result;
  }
};

export default uploadService;
