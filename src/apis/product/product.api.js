import FetchAPI from "../custom/fetch-api";
import {
  fetchProductStart,
  fetchProductFailed,
  getAllProductsSucccess,
  createNewProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
} from '../../redux-features/product/product.slice';
import { handleShowToast, NotificationType } from "../../utils/HandleNotification";

const apiProducts = {
  getAllProducts: async (dispatch) => {
    await FetchAPI.GET_ALL(
      'products',
      null,
      null,
      () => dispatch(fetchProductStart()),
      (productList) => dispatch(getAllProductsSucccess(productList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          "Lỗi hệ thống",
          "Không thể kết nối với Server!"
        );
        dispatch(fetchProductFailed());
      }
    );
  },
  createNewProduct: async (dispatch, product, token) => {
    await FetchAPI.POST(
      'products',
      product,
      token,
      () => dispatch(fetchProductStart()),
      (result) => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          "Thêm thông tin thành công",
          "Một sản phẩm vừa được thêm vào cơ sở dữ liệu!"
        );
        dispatch(createNewProductSuccess(result.data));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          "Lỗi hệ thống",
          "Dữ liệu lỗi, không thể gửi đến server!"
        );
        dispatch(fetchProductFailed());
      });
  },
  updateProduct: async (dispatch, updateProduct, productId, token) => {
    await FetchAPI.PUT(
      `products/${productId}`,
      updateProduct,
      token,
      () => dispatch(fetchProductStart()),
      (result) => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          "Thay đổi thông tin thành công",
          "Dữ liệu của sản phẩm vừa được cập nhật vào cơ sở dữ liệu!!"
        );
        console.table(result)
        updateProduct.id = productId;
        dispatch(updateProductSuccess(updateProduct));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          "Lỗi hệ thống",
          "Dữ liệu lỗi, không thể gửi đến server!"
        );
        dispatch(fetchProductFailed());
      });
  },
  removeProduct: async (dispatch, productId, token) => {
    await FetchAPI.DELETE(
      `products/${productId}`,
      null,
      token,
      () => dispatch(fetchProductStart()),
      (result) => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          "Xóa thông tin thành công",
          "Dữ liệu đã được xóa khỏi hệ thống!"
        );
        console.table(result);
        dispatch(deleteProductSuccess(productId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          "Lỗi hệ thống",
          "Không thể xóa sản phẩm này khỏi hệ thống!"
        );
        dispatch(fetchProductFailed());
      });
  }
}

export default apiProducts;