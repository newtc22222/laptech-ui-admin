import { setCredentials } from '../../redux-feature/auth.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';
import FetchAPI from '../custom/fetch-api';

const apiAuth = {
  login: async (dispatch, account) => {
    let auth;
    await FetchAPI.POST(
      `auth/login`,
      account,
      null,
      () => {},
      result => {
        if (result.user.role !== 'USER') {
          localStorage.setItem('jwtToken', result.jwtToken);
          dispatch(setCredentials(result)); //auth
        } else {
          handleShowToast(
            dispatch,
            NotificationType.INFO,
            'Tài khoản không hợp lệ',
            'Vui lòng kiểm tra lại thông tin tài khoản!'
          );
        }
        auth = result;
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Thông tin không chính xác',
          'Vui lòng kiểm tra lại tài khoản của bạn!'
        );
      }
    );
    return auth;
  },
  updateUser: async (newInfor, userId, token) => {
    await FetchAPI.PUT(
      `users/${userId}`,
      newInfor,
      token,
      () => {},
      result => {},
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Thông tin không chính xác',
          'Vui lòng kiểm tra lại dữ liệu cá nhân của bạn!'
        );
      }
    );
  },

  // { oldPassword, newPassword }
  updatePassword: async (passwordForm, userId, token) => {
    await FetchAPI.PATCH(
      `users/${userId}`,
      passwordForm,
      token,
      () => {},
      result => {},
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Thông tin không chính xác',
          'Vui lòng kiểm tra lại mật khẩu của bạn!'
        );
      }
    );
  }
};

export default apiAuth;
