import FetchAPI from './custom/fetch-api';
import MakeRefreshToken from './helper/MakeRefreshToken';
import { handleShowToast, NotificationType } from '../utils/HandleNotification';

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
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể gửi file đến Server!'
        );
        MakeRefreshToken(err, dispatch);
      }
    );
    return result;
  },
  uploadMultipleImage: (imageList, token) => {}
};

export default apiUpload;
