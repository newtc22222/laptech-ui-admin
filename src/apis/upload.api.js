import FetchAPI from './custom/fetch-api';
import MakeRefreshToken from './helper/MakeRefreshToken';
import { makeToast, toastType } from '../helper/makeToast';

/**
 * **use for upload data**
 * - images
 * - files
 * - etc..
 */

const apiUpload = {
  uploadImage: async (dispatch, data, token) => {
    let result;
    await FetchAPI.POST_FILE(
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
  uploadMultipleImage: (imageList, token) => {}
};

export default apiUpload;
