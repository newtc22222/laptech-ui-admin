import FetchAPI from '../custom/fetch-api';
import {
  fetchCommentStart,
  fetchCommentFailed,
  getCommentsSuccess,
  createCommentSuccess,
  updateCommentSuccess,
  deleteCommentSuccess
} from '../../redux-features/product/comment.slice';
import {
  handleShowToast,
  NotificationType
} from '../../utils/HandleNotification';
import { getUpdateByUserInSystem } from '../../helper/getUser';

const apiComments = {
  getAllComments: async (dispatch, productId) => {
    await FetchAPI.GET_ALL(
      productId ? `products/${productId}/comments` : 'comments',
      null,
      null,
      () => dispatch(fetchCommentStart()),
      commentList => dispatch(getCommentsSuccess(commentList)),
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể kết nối với Server!'
        );
        dispatch(fetchCommentFailed());
      }
    );
  },
  createNewComment: async (dispatch, comment, token) => {
    await FetchAPI.POST(
      'comments',
      comment,
      token,
      () => dispatch(fetchCommentStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thêm thông tin thành công',
          'Một bình luận vừa được thêm vào!'
        );
        dispatch(createCommentSuccess(result));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchCommentFailed());
      }
    );
  },
  updateComment: async (dispatch, updateComment, commentId, token) => {
    await FetchAPI.PUT(
      `comments/${commentId}`,
      updateComment,
      token,
      () => dispatch(fetchCommentStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Thay đổi thông tin thành công',
          'Thông tin của bình luận vừa được cập nhật!'
        );
        console.table(result);
        updateComment.id = commentId;
        dispatch(updateCommentSuccess(updateComment));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Dữ liệu lỗi, không thể gửi đến server!'
        );
        dispatch(fetchCommentFailed());
      }
    );
  },
  deleteComment: async (dispatch, commentId, token) => {
    await FetchAPI.DELETE(
      `comments/${commentId}`,
      getUpdateByUserInSystem(),
      token,
      () => dispatch(fetchCommentStart()),
      result => {
        handleShowToast(
          dispatch,
          NotificationType.SUCCESS,
          'Xóa thông tin thành công',
          'Dữ liệu đã được xóa khỏi hệ thống!'
        );
        console.table(result);
        dispatch(deleteCommentSuccess(commentId));
      },
      () => {
        handleShowToast(
          dispatch,
          NotificationType.ERROR,
          'Lỗi hệ thống',
          'Không thể xóa bình luận này khỏi hệ thống!'
        );
        dispatch(fetchCommentFailed());
      }
    );
  }
};

export default apiComments;
