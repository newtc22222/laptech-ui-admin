import {
  fetchUserStart,
  fetchUserFailed,
  getUserSuccess,
  createUserSuccess,
  updateUserSuccess,
  deleteUserSuccess
} from '../redux-feature/user.slice';

const apiUsers = {
  getAllUser: async (dispatch, token) => {
    try {
      dispatch(fetchUserStart());
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await handleResponse(response);
      dispatch(getUserSuccess(data));
    } catch (err) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Không thể kết nối với server!'
        })
      );
      dispatch(fetchUserFailed());
    }
  },
  activeUser: async (userId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/active`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await handleResponse(response);
      dispatch(blockUserSuccess(userId));
      dispatch(
        addToast({
          type: 'success',
          title: 'Thay đổi trạng thái tài khoản thành công',
          content:
            'Trạng thái tài khoản của người dùng đã được cập nhật vào cơ sở dữ liệu!'
        })
      );
    } catch (err) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Không thể kết nối với server!'
        })
      );
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
      await handleResponse(response);
      dispatch(blockUserSuccess(userId));
      dispatch(
        addToast({
          type: 'success',
          title: 'Thay đổi trạng thái tài khoản thành công',
          content:
            'Trạng thái tài khoản của người dùng đã được cập nhật vào cơ sở dữ liệu!'
        })
      );
    } catch (err) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Không thể kết nối với server!'
        })
      );
    }
  }
};

export default apiUsers;
