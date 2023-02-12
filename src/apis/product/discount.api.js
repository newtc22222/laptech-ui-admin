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
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchDiscountFailed());
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
        console.table(result);
        updateDiscount.id = discountId;
        dispatch(updateDiscountSuccess(updateDiscount));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchDiscountFailed());
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
        console.table(result);
        dispatch(deleteDiscountSuccess(discountId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa mã giảm giá  này khỏi hệ thống!'
        );
        dispatch(fetchDiscountFailed());
      }
    );
  }
};

export default apiDiscounts;
