import { setCredentials, setNewAccessToken } from '../../redux-feature/auth.slice';
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
      () => { },
      result => {
        if (result) {
          const listRoleNotUser = result.roleList.filter(x => x.name !== 'USER');
          if (listRoleNotUser.length > 0) {
            localStorage.setItem('laptechUser', JSON.stringify(result.user));
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);

            dispatch(setCredentials(result)); //auth
            auth = result;
          } else {
            handleShowToast(
              dispatch,
              NotificationType.INFO,
              'Tài khoản không hợp lệ',
              'Vui lòng kiểm tra lại thông tin tài khoản!'
            );
          }
        }
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
  refreshToken: async (dispatch, refreshToken) => {
    let auth;
    await FetchAPI.POST(
      `auth/refreshToken`,
      refreshToken,
      null,
      () => { },
      result => {
        localStorage.setItem('accessToken', result.accessToken);
        dispatch(setNewAccessToken(result.accessToken));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.INFO,
          'Hết thời hạn đăng nhập',
          'Vui lòng đăng nhập lại vào hệ thống!'
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
      () => { },
      result => { },
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
      () => { },
      result => { },
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
