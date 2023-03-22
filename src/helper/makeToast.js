import { toast } from 'react-toastify';

const toastType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error'
};

/**
 * @param {string} message
 * @param {"info"|"success"|"warning"|"error"} type
 */
function makeToast(message, type = undefined) {
  const toastShow = type ? toast[type] : toast;

  toastShow(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light'
  });
}

export { makeToast, toastType };
