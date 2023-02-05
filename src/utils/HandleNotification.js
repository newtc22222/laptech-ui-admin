import { addToast } from "../redux-features/toast_notify";

const NotificationType = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
}

/**
 * @param {*} dispatch 
 * @param {NotificationType} type 
 * @param {String} title 
 * @param {String} content 
 */
function handleShowToast(dispatch, type, title, content) {
  dispatch(addToast({ type, title, content }));
}

export {
  NotificationType,
  handleShowToast
};