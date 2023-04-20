import {
  setCredentials,
  setNewAccessToken
} from '../../store/slice/auth.slice';
import FetchAPI from '../custom/fetch-api';
import { makeToast, toastType } from '../../utils/makeToast';
import { createLocalStorage } from '../../utils/createStorage';

const apiAuth = {
  login: async (dispatch, account) => {
    let auth;
    await FetchAPI.POST(
      `auth/login`,
      account,
      null,
      () => {},
      result => {
        if (result) {
          const listRoleNotUser = result.roleList.filter(
            x => x.name !== 'USER'
          );

          const maxAgeToken = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2); // support refresh token in 2 days
          if (listRoleNotUser.length > 0) {
            const storage = createLocalStorage('laptech');
            storage.set('user', result.user);
            storage.set('accessToken', result.accessToken);
            storage.set('refreshToken', result.refreshToken);
            storage.set('maxAgeToken', maxAgeToken.getTime());

            dispatch(setCredentials(result)); //auth
            auth = result;
          } else {
            makeToast(
              'Vui lòng kiểm tra lại quyền truy cập của tài khoản!',
              toastType.info
            );
          }
        }
      },
      () => {
        makeToast(
          'Vui lòng kiểm tra lại thông tin tài khoản!',
          toastType.error
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
      () => {},
      result => {
        const storage = createLocalStorage('laptech');
        storage.set('accessToken', result.accessToken);
        dispatch(setNewAccessToken(result.accessToken));
      },
      () => {
        makeToast('Hết hạn đăng nhập, vui lòng đăng nhập lại!', toastType.info);
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
        makeToast(
          'Vui lòng kiểm tra lại dữ liệu cá nhân của bạn!',
          toastType.error
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
        makeToast('Vui lòng kiểm tra lại mật khẩu của bạn!', toastType.error);
      }
    );
  }
};

export default apiAuth;
