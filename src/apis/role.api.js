import FetchAPI from './custom/fetch-api';
import {
  fetchRoleStart,
  fetchRoleFailed,
  getRoleSuccess,
  createRoleSuccess,
  updateRoleSuccess,
  deleteRoleSuccess
} from '../redux-feature/role.slice';
import {
  handleShowToast,
  NotificationType
} from '../utils/HandleNotification';
import MakeRefreshToken from './helper/MakeRefreshToken';

const apiRoles = {
  getAllRoles: async (dispatch, token) => {
    await FetchAPI.GET_ALL(
      'roles',
      null,
      token,
      () => dispatch(fetchRoleStart()),
      roleList => dispatch(getRoleSuccess(roleList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchRoleFailed());
      }
    );
  },
  createNewRole: async (dispatch, role, token) => {
    await FetchAPI.POST(
      'roles',
      role,
      token,
      () => dispatch(fetchRoleStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một phân quyền vừa được thêm vào cơ sở dữ liệu!'
        );
        dispatch(createRoleSuccess(result.data));
      },
      (err) => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchRoleFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  },
  updateRole: async (dispatch, updateRole, roleId, token) => {
    await FetchAPI.PUT(
      `roles/${roleId}`,
      updateRole,
      token,
      () => dispatch(fetchRoleStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Dữ liệu của phân quyền vừa được cập nhật vào cơ sở dữ liệu!'
        );
        updateRole.id = roleId;
        dispatch(updateRoleSuccess(updateRole));
      },
      (err) => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchRoleFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  },
  deleteRole: async (dispatch, roleId, token) => {
    await FetchAPI.DELETE(
      `roles/${roleId}`,
      null,
      token,
      () => dispatch(fetchRoleStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        dispatch(deleteRoleSuccess(roleId));
      },
      (err) => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa phân quyền này khỏi hệ thống!'
        );
        dispatch(fetchRoleFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  }
};

export default apiRoles;
