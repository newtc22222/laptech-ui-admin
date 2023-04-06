import apiCall from '../../apis';
import makeRefreshToken from './makeRefreshToken';
import { makeToast, toastType } from '../../utils/makeToast';
import subText from '../../utils/getVietnameseIntonation';

/**
 * @param {string} objectName
 * @param {object} action
 * @param {object} extraAction
 * @returns {{
 *  getAll: (dispatch, token?: string) => {},
 *  create: (dispatch, object: object, token: string) => {},
 *  update: (dispatch, object: object, token: string) => {},
 *  delete: (dispatch, objectId: string | number, token: string) => {},
 *  extraAction: object
 * }}
 */
function makeService(objectName, action, extraAction) {
  const objectNameVI = subText[objectName];

  /**
   *
   * @param {useDispatch} dispatch
   */
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
    getAll: async (dispatch, token = null) => {
      await apiCall.GET_ALL(
        objectName,
        null,
        token,
        () => handleFetchStart(dispatch),
        data => {
          dispatch(action.getSuccess(data));
        },
        err => handleFetchError(err, dispatch, 'Không thể kết nối đến Server!')
      );
    },
    create: async (dispatch, object, token) => {
      // console.table('call api', object);
      await apiCall.POST(
        objectName,
        object,
        token,
        () => handleFetchStart(dispatch),
        result => {
          makeToast(
            `Một ${objectNameVI} vừa được thêm vào cơ sở dữ liệu!`,
            toastType.success
          );
          dispatch(action.createSuccess(result)); // new object
        },
        err => handleFetchError(err, dispatch)
      );
    },
    update: async (dispatch, updateObject, objectId, token) => {
      await apiCall.PUT(
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
      await apiCall.DELETE(
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
    },
    ...extraAction
  };
}

export default makeService;