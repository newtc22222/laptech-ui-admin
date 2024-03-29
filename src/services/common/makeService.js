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
 *  update: (dispatch, object: object, objectId: number | string, token: string) => {},
 *  updatePartial: (dispatch, object: object, objectId: number | string, token: string) => {},
 *  delete: (dispatch, objectId: string | number, token: string) => {}
 * }}
 */
function makeService(objectName, action) {
  const objectNameVI = subText[objectName];

  /**
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
  function handleFetchError(err, dispatch, customMessage = null, reCall) {
    const defaultMessage =
      'Hệ thống gặp vấn đề khi xử lý, vui lòng thử lại sau ít phút nữa!';
    makeToast(customMessage || defaultMessage, toastType.error);
    dispatch(action.fetchFailed());
    makeRefreshToken(err, dispatch, reCall);
  }

  const handleGetAll = async (dispatch, token = null) => {
    await apiCall.GET_ALL(
      objectName,
      null,
      token,
      () => handleFetchStart(dispatch),
      data => {
        dispatch(action.getSuccess(data));
      },
      err =>
        handleFetchError(
          err,
          dispatch,
          'Không thể kết nối đến Server!',
          newToken => handleGetAll(dispatch, newToken) // callback to re-fetch
        )
    );
  };

  const handleCreate = async (dispatch, object, token) => {
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
      err =>
        handleFetchError(
          err,
          dispatch,
          'Lỗi kết nối, hệ thống đang thử lại!',
          newToken => handleCreate(dispatch, object, newToken)
        )
    );
  };

  const handleUpdate = async (dispatch, updateObject, objectId, token) => {
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
      err =>
        handleFetchError(err, dispatch, null, newToken =>
          handleUpdate(dispatch, updateObject, objectId, newToken)
        )
    );
  };

  const handleUpdatePartial = async (
    dispatch,
    updateProperties,
    objectId,
    token
  ) => {
    await apiCall.PATCH(
      `${objectName}/${objectId}`,
      updateProperties,
      token,
      () => handleFetchStart(dispatch),
      result => {
        makeToast(
          `Dữ liệu của ${objectNameVI} vừa được cập nhật vào cơ sở dữ liệu!`,
          toastType.success
        );
        updateProperties.id = objectId;
        dispatch(action.updateSuccess(updateProperties));
      },
      err =>
        handleFetchError(err, dispatch, null, newToken =>
          handleUpdatePartial(dispatch, updateProperties, objectId, newToken)
        )
    );
  };

  const handleDelete = async (dispatch, objectId, token) => {
    await apiCall.DELETE(
      `${objectName}/${objectId}`,
      null,
      token,
      () => handleFetchStart(dispatch),
      result => {
        makeToast('Dữ liệu đã được xóa khỏi hệ thống!', toastType.success);
        dispatch(action.deleteSuccess(objectId));
      },
      err =>
        handleFetchError(err, dispatch, null, newToken =>
          handleDelete(dispatch, objectId, newToken)
        )
    );
  };

  return {
    getAll: handleGetAll,
    create: handleCreate,
    update: handleUpdate,
    updatePartial: handleUpdatePartial,
    delete: handleDelete
  };
}

export default makeService;
