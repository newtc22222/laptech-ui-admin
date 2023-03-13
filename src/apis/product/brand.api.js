import FetchAPI from '../custom/fetch-api';
import {
  fetchBrandStart,
  fetchBrandFailed,
  getBrandSuccess,
  createBrandSuccess,
  updateBrandSuccess,
  deleteBrandSuccess
} from '../../redux-feature/product_slice/brand.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';
import MakeRefreshToken from '../helper/MakeRefreshToken';
import { getUpdateByUserInSystem } from '../../helper/getUser';

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
        dispatch(createBrandSuccess(result));
      },
      err => {
        console.log(err.toString());
        const isResourceAlreadyExist = err
          .toString()
          .toLowerCase()
          .includes('already existed');
        const title = isResourceAlreadyExist ? 'Lỗi dữ liệu' : 'Lỗi hệ thống';
        const content = isResourceAlreadyExist
          ? 'Thông tin đã có sẵn trong hệ thống!'
          : 'Dữ liệu lỗi, không thể gửi đến server!';
        handleShowToast(dispatch, NotificationType.ERROR, title, content);
        dispatch(fetchBrandFailed());
        MakeRefreshToken(err, dispatch);
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
        updateBrand.id = brandId;
        dispatch(updateBrandSuccess(updateBrand));
      },
      err => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchBrandFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  },
  deleteBrand: async (dispatch, brandId, token) => {
    await FetchAPI.DELETE(
      `brands/${brandId}`,
      getUpdateByUserInSystem(),
      token,
      () => dispatch(fetchBrandStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        dispatch(deleteBrandSuccess(brandId));
      },
      err => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa thương hiệu này khỏi hệ thống!'
        );
        dispatch(fetchBrandFailed());
        MakeRefreshToken(err, dispatch);
      }
    );
  }
};

export default apiBrands;
