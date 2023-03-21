import FetchAPI from '../custom/fetch-api';
import makeRefreshToken from './MakeRefreshToken';
import { makeToast, toastType } from '../../helper/makeToast';
import subText from '../../helper/getVietnameseIntonation';

export default function makeCallAPI(objectName, action) {
  const objectNameVI = subText[objectName];

  function handleFetchStart(dispatch) {
    dispatch(action.fetchStart());
  }

  /**
   * @param {Error} err
   * @param {useDispatch} dispatch
   * @param {string} customMessage
   */
  function handleFetchError(err, dispatch, customMessage = null) {
    const defaultMessage = 'Dữ liệu lỗi, không thể gửi đến server!';
    makeToast(customMessage || defaultMessage, toastType.error);
    dispatch(action.fetchFailed());
    makeRefreshToken(err, dispatch);
  }

  return {
    getAll: async dispatch => {
      await FetchAPI.GET_ALL(
        objectName,
        null,
        null,
        () => handleFetchStart(dispatch),
        data => {
          dispatch(action.getSuccess(data));
        },
        err => handleFetchError(err, dispatch, 'Không thể kết nối đến Server!')
      );
    },
    create: async (dispatch, object, token) => {
      console.table(object);
      await FetchAPI.POST(
        objectName,
        object,
        token,
        () => handleFetchStart(dispatch),
        result => {
          makeToast(
            `Một ${objectNameVI} vừa được thêm vào cơ sở dữ liệu!`,
            toastType.success
          );
          dispatch(action.createSuccess(result.data)); // new object
        },
        err => handleFetchError(err, dispatch)
      );
    },
    update: async (dispatch, updateObject, objectId, token) => {
      await FetchAPI.PUT(
        `${objectName}/${objectId}`,
        updateObject,
        token,
        () => handleFetchStart(dispatch),
        result => {
          makeToast(
            `Dữ liệu của ${objectNameVI} vừa được cập nhật vào cơ sở dữ liệu!`,
            toastType.success
          );
          updateObject.id = objectId;
          dispatch(action.updateSuccess(updateObject));
        },
        err => handleFetchError(err, dispatch)
      );
    },
    delete: async (dispatch, objectId, token) => {
      await FetchAPI.DELETE(
        `${objectName}/${objectId}`,
        null,
        token,
        () => handleFetchStart(dispatch),
        result => {
          makeToast('Dữ liệu đã được xóa khỏi hệ thống!', toastType.success);
          dispatch(action.deleteSuccess(objectId));
        },
        err => handleFetchError(err, dispatch)
      );
    }
  };
}
