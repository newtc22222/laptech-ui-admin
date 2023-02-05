import { addToast } from "../redux-features/toast_notify";
import { BASE_URL, handleResponse } from "./api.config";
import {
  fetchUserStart,
  fetchUserFailed,
  getUsersSuccess,
  blockUserSuccess
} from "../redux-features/users.slice"

const apiUsers = {
  getAllUser: async (dispatch, token) => {
    try {
      dispatch(fetchUserStart());
      const response = await fetch(
        `${BASE_URL}/users`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );
      const data = await handleResponse(response);
      dispatch(getUsersSuccess(data));
    }
    catch (err) {
      dispatch(addToast({
        type: "error",
        title: "Lỗi hệ thống",
        content: "Không thể kết nối với server!"
      }));
      dispatch(fetchUserFailed());
    }
  },
  blockUser: async (userId, token) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );
      await handleResponse(response);
      dispatch(blockUserSuccess(userId));
      dispatch(addToast({
        type: "success",
        title: "Thay đổi trạng thái tài khoản thành công",
        content: "Trạng thái tài khoản của người dùng đã được cập nhật vào cơ sở dữ liệu!"
      }));
    }
    catch (err) {
      dispatch(addToast({
        type: "error",
        title: "Lỗi hệ thống",
        content: "Không thể kết nối với server!"
      }));
    }
  },
}

export default apiUsers;