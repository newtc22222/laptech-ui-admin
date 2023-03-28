import makeService from './common/makeService';
import { action } from '../store/slice/user.slice';
import { makeToast, toastType } from '../utils/makeToast';

const extraAction = {
  activeUser: async (userId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/active`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // await handleResponse(response);
      // dispatch(blockUserSuccess(userId));
      makeToast(
        'Trạng thái tài khoản của người dùng đã được cập nhật vào cơ sở dữ liệu!',
        toastType.success
      );
    } catch (err) {
      makeToast('Không thể kết nối với server!', toastType.error);
    }
  },
  blockUser: async (userId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/block`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // await handleResponse(response);
      // dispatch(blockUserSuccess(userId));
      makeToast(
        'Trạng thái tài khoản của người dùng đã được cập nhật vào cơ sở dữ liệu!',
        toastType.success
      );
    } catch (err) {
      makeToast('Không thể kết nối với server!', toastType.error);
    }
  }
};

const userService = makeService('users', action, extraAction);

export default userService;
