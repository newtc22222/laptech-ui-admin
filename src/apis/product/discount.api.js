import FetchAPI from '../custom/fetch-api';
import {
  fetchDiscountStart,
  fetchDiscountFailed,
  getDiscountSuccess,
  createDiscountSuccess,
  updateDiscountSuccess,
  deleteDiscountSuccess
} from '../../redux-feature/product_slice/discount.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';
import MakeRefreshToken from '../helper/MakeRefreshToken';

const apiDiscounts = {
  getAllDiscounts: async dispatch => {
    await FetchAPI.GET_ALL(
      'discounts',
      null,
      null,
      () => dispatch(fetchDiscountStart()),
      discountList => dispatch(getDiscountSuccess(discountList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchDiscountFailed());
      }
    );
  },
  createNewDiscount: async (dispatch, discount, token) => {
    await FetchAPI.POST(
      'discounts',
      discount,
      token,
      () => dispatch(fetchDiscountStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một mã giảm giá  vừa được thêm vào cơ sở dữ liệu!'
        );
        dispatch(createDiscountSuccess(result.data));
      },
      (err) => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchDiscountFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  },
  updateDiscount: async (dispatch, updateDiscount, discountId, token) => {
    await FetchAPI.PUT(
      `discounts/${discountId}`,
      updateDiscount,
      token,
      () => dispatch(fetchDiscountStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Dữ liệu của mã giảm giá  vừa được cập nhật vào cơ sở dữ liệu!!'
        );
        updateDiscount.id = discountId;
        dispatch(updateDiscountSuccess(updateDiscount));
      },
      (err) => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchDiscountFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  },
  deleteDiscount: async (dispatch, discountId, token) => {
    await FetchAPI.DELETE(
      `discounts/${discountId}`,
      null,
      token,
      () => dispatch(fetchDiscountStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        dispatch(deleteDiscountSuccess(discountId));
      },
      (err) => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa mã giảm giá  này khỏi hệ thống!'
        );
        dispatch(fetchDiscountFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  }
};

export default apiDiscounts;
