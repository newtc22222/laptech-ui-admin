import apiCall from '../../apis';
import makeRefreshToken from '../common/makeRefreshToken';
import { makeToast, toastType } from '../../utils/makeToast';
import { createLocalStorage } from '../../utils/createStorage';
import {
  logout,
  setCredentials,
  setNewAccessToken,
  setNewUserData
} from '../../store/slice/auth.slice';

const handleGetCurrentUser = async (dispatch, token) => {
  let currentUser = {};
  await apiCall.GET_ALL(
    'getCurrentUser',
    null,
    token,
    () => {},
    result => {
      currentUser = result;
    },
    err => {
      makeRefreshToken(err, dispatch, newToken =>
        handleGetCurrentUser(dispatch, newToken)
      );
    }
  );
  return currentUser;
};

const handleUpdateInformation = async (dispatch, newInfor, token) => {
  await apiCall.PATCH(
    `changeMyInformation`,
    newInfor,
    token,
    () => {},
    result => {
      const storage = createLocalStorage('laptech');
      storage.set('user', newInfor);
      dispatch(setNewUserData(newInfor));
      makeToast('Cập nhật thông tin thành công!', toastType.success);
    },
    err => {
      makeRefreshToken(err, dispatch, newToken =>
        handleUpdateInformation(dispatch, newInfor, newToken)
      );
    }
  );
};

const handleUpdatePassword = async (dispatch, object, token) => {
  await apiCall.POST(
    `auth/changePassword`,
    object,
    token,
    () => {},
    result => {
      makeToast(
        'Cập nhật mật khẩu thành công! Ứng dụng sẽ đóng sau vài giây!',
        toastType.success
      );
      const storage = createLocalStorage('laptech');
      storage.remove('user');
      storage.remove('accessToken');
      storage.remove('refreshToken');
      storage.remove('maxAgeToken');
      dispatch(logout());
    },
    error => {
      // 401 but wrong password, not token!
      const storage = createLocalStorage('laptech');
      if (storage.get('maxAgeToken') > Date.now()) {
        makeToast('Thông tin chưa chính xác!', toastType.error);
        return;
      }

      makeRefreshToken(error, dispatch, newToken =>
        handleUpdatePassword(dispatch, newPassword, newToken)
      );
    }
  );
};

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

          if (listRoleNotUser.length > 0) {
            const storage = createLocalStorage('laptech');
            storage.set('user', result.user);
            storage.set('roleList', result.roleList);
            storage.set('accessToken', result.accessToken);
            storage.set('refreshToken', result.refreshToken);
            storage.set('maxAgeToken', result.maxAgeToken);

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
  refreshToken: async (dispatch, refreshToken, recall = null) => {
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
        if (!recall && typeof recall === 'function') recall(result.accessToken);
      },
      err => {
        if (err.message === 'Failed to fetch') {
          makeToast(
            'Không thể kết nối với Server, vui lòng kiểm tra lại hệ thống!',
            toastType.info
          );
        } else {
          makeToast(
            'Hết hạn đăng nhập, vui lòng đăng nhập lại!',
            toastType.info
          );
        }
      }
    );
    return auth;
  },
  getCurrentUser: handleGetCurrentUser,
  updateInformation: handleUpdateInformation,
  updatePassword: handleUpdatePassword,
  forgotPassword: async (phone, email, username, accountCreatedDate) => {
    let response;
    await apiCall.POST(
      'auth/forgotPassword',
      { phone, email, username, accountCreatedDate },
      () => {},
      res => (response = res),
      err => {
        makeToast('Thông tin chưa chính xác!', toastType.error);
        console.log(err);
      }
    );
    return response;
  },
  resetPassword: async (token, newPassword) => {
    let response;
    await apiCall.POST(
      'auth/updatePassword?token=' + token,
      { newPassword },
      () => {},
      res => (response = res),
      err => {
        makeToast('Thông tin chưa chính xác!', toastType.error);
        console.log(err);
      }
    );
    return response;
  }
};

export default authService;
