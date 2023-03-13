import FetchAPI from '../custom/fetch-api';
import {
  fetchFeedbackStart,
  fetchFeedbackFailed,
  getFeedbacksSuccess,
  createFeedbackSuccess,
  updateFeedbackSuccess,
  deleteFeedbackSuccess
} from '../../redux-features/product/feedback.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';
import { getUpdateByUserInSystem } from '../../helper/getUser';

const apiFeedbacks = {
  getAllFeedbacks: async (dispatch, productId) => {
    await FetchAPI.GET_ALL(
      productId ? `products/${productId}/feedbacks` : 'feedbacks',
      null,
      null,
      () => dispatch(fetchFeedbackStart()),
      feedbackList => dispatch(getFeedbacksSuccess(feedbackList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchFeedbackFailed());
      }
    );
  },
  createNewFeedback: async (dispatch, feedback, token) => {
    await FetchAPI.POST(
      'feedbacks',
      feedback,
      token,
      () => dispatch(fetchFeedbackStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một đánh giá vừa được thêm vào!'
        );
        dispatch(createFeedbackSuccess(result));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchFeedbackFailed());
      }
    );
  },
  updateFeedback: async (dispatch, updateFeedback, feedbackId, token) => {
    await FetchAPI.PUT(
      `feedbacks/${feedbackId}`,
      updateFeedback,
      token,
      () => dispatch(fetchFeedbackStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Thông tin của đánh giá vừa được cập nhật!'
        );
        console.table(result);
        updateFeedback.id = feedbackId;
        dispatch(updateFeedbackSuccess(updateFeedback));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchFeedbackFailed());
      }
    );
  },
  deleteFeedback: async (dispatch, feedbackId, token) => {
    await FetchAPI.DELETE(
      `feedbacks/${feedbackId}`,
      getUpdateByUserInSystem(),
      token,
      () => dispatch(fetchFeedbackStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        console.table(result);
        dispatch(deleteFeedbackSuccess(feedbackId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa đánh giá này khỏi hệ thống!'
        );
        dispatch(fetchFeedbackFailed());
      }
    );
  }
};

export default apiFeedbacks;
