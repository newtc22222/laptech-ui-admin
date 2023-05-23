import apiCall from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';
import { makeToast, toastType } from '../../utils/makeToast';
import { createLocalStorage } from '../../utils/createStorage';
import {
  setCredentials,
  setNewAccessToken
} from '../../store/slice/auth.slice';

const authService = {
  login: async (dispatch, account) => {
    let auth;
    await apiCall.POST(
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
    await apiCall.POST(
      `auth/refreshToken`,
      refreshToken,
      null,
      () => {},
      result => {
        const storage = createLocalStorage('laptech');
        storage.set('accessToken', result.accessToken);
        dispatch(setNewAccessToken(result.accessToken));
      },
      err => {
        makeToast('Hết hạn đăng nhập, vui lòng đăng nhập lại!', toastType.info);
      }
    );
    return auth;
  },
  getCurrentUser: async (dispatch, token) => {
    await apiCall.GET_ALL(
      'getCurrentUser',
      null,
      token,
      () => {},
      result => {
        console.log(result);
      },
      err => {
        makeRefreshToken(err, dispatch);
      }
    );
  },
  updateInformation: async (newInfor, token) => {
    await apiCall.PUT(
      `changeMyInformation`,
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
  updatePassword: async (passwordForm, token) => {
    await apiCall.PATCH(
      `changePasswordp`,
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

export default authService;
