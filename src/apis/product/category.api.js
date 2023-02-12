import FetchAPI from '../custom/fetch-api';
import {
  fetchCategoryStart,
  fetchCategoryFailed,
  getCategorySuccess,
  createCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess
} from '../../redux-feature/product_slice/category.slide';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';

const apiCategories = {
  getAllCategories: async dispatch => {
    await FetchAPI.GET_ALL(
      'categories',
      null,
      null,
      () => dispatch(fetchCategoryStart()),
      categoryList => dispatch(getCategorySuccess(categoryList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchCategoryFailed());
      }
    );
  },
  createNewCategory: async (dispatch, category, token) => {
    await FetchAPI.POST(
      'categories',
      category,
      token,
      () => dispatch(fetchCategoryStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một danh mục mới vừa được thêm vào cơ sở dữ liệu!'
        );
        dispatch(createCategorySuccess(result.data));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchCategoryFailed());
      }
    );
  },
  updateCategory: async (dispatch, updateCategory, categoryId, token) => {
    await FetchAPI.PUT(
      `categories/${categoryId}`,
      updateCategory,
      token,
      () => dispatch(fetchCategoryStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Dữ liệu của danh mục vừa được cập nhật vào cơ sở dữ liệu!'
        );
        console.table(result);
        updateCategory.id = categoryId;
        dispatch(updateCategorySuccess(updateCategory));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchCategoryFailed());
      }
    );
  },
  deleteCategory: async (dispatch, categoryId, token) => {
    await FetchAPI.DELETE(
      `categories/${categoryId}`,
      null,
      token,
      () => dispatch(fetchCategoryStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        dispatch(deleteCategorySuccess(categoryId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa thương hiệu này khỏi hệ thống!'
        );
        dispatch(fetchCategoryFailed());
      }
    );
  }
};

export default apiCategories;
