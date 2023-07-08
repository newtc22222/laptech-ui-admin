import apiCall from '../apis';
import makeService from './common/makeService';
import { action } from '../store/slice/user.slice';
import { makeToast, toastType } from '../utils/makeToast';

const defaultSuccessMessage =
  'Trạng thái tài khoản của người dùng đã được cập nhật vào cơ sở dữ liệu!';

const extraAction = {
  activeUser: async (userId, object, token) => {
    await apiCall.POST(
      `users/${userId}/activate`,
      object,
      token,
      () => {},
      result => {
        makeToast(defaultSuccessMessage, toastType.success);
      },
      err => {
        const defaultMessage = 'Dữ liệu lỗi, không thể gửi đến server!';
        makeToast(defaultMessage, toastType.error);
      }
    );
  },
  blockUser: async (userId, object, token) => {
    await apiCall.POST(
      `users/${userId}/block`,
      object,
      token,
      () => {},
      result => {
        makeToast(defaultSuccessMessage, toastType.success);
      },
      err => {
        const defaultMessage = 'Dữ liệu lỗi, không thể gửi đến server!';
        makeToast(defaultMessage, toastType.error);
      }
    );
  }
};

const userService = { ...makeService('users', action), ...extraAction };

export default userService;
