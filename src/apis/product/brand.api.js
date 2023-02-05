import FetchAPI from '../custom/fetch-api';
import {
  fetchBrandStart,
  fetchBrandFailed,
  getBrandSuccess,
  createBrandSuccess,
  updateBrandSuccess,
  removeBrandSuccess
} from '../../redux-feature/product_slice/brand.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';

const apiBrands = {
  getAllBrands: async dispatch => {
    await FetchAPI.GET_ALL(
      'brands',
      null,
      null,
      () => dispatch(fetchBrandStart()),
      brandList => dispatch(getBrandSuccess(brandList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchBrandFailed());
      }
    );
  },
  createNewBrand: async (dispatch, brand, token) => {
    await FetchAPI.POST(
      'brands',
      brand,
      token,
      () => dispatch(fetchBrandStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một thương hiệu vừa được thêm vào cơ sở dữ liệu!'
        );
        dispatch(createBrandSuccess(result.data));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchBrandFailed());
      }
    );
  },
  updateBrand: async (dispatch, updateBrand, brandId, token) => {
    await FetchAPI.PUT(
      `brands/${brandId}`,
      updateBrand,
      token,
      () => dispatch(fetchBrandStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Dữ liệu của thương hiệu vừa được cập nhật vào cơ sở dữ liệu!'
        );
        console.table(result);
        updateBrand.id = brandId;
        dispatch(updateBrandSuccess(updateBrand));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchBrandFailed());
      }
    );
  },
  removeBrand: async (dispatch, brandId, token) => {
    await FetchAPI.DELETE(
      `brands/${brandId}`,
      null,
      token,
      () => dispatch(fetchBrandStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        console.table(result);
        dispatch(removeBrandSuccess(brandId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa thương hiệu này khỏi hệ thống!'
        );
        dispatch(fetchBrandFailed());
      }
    );
  }
};

export default apiBrands;
