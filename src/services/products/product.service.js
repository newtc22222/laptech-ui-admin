import apiCall from '../../apis';
import makeService from '../common/makeService';
import makeCollapseService from '../common/makeCollapseService';
import { action } from '../../store/slice/product.slice';
import { makeToast, toastType } from '../../utils';
import makeRefreshToken from '../common/makeRefreshToken';

const handleDisableFeedback = async (
  dispatch,
  feedbackId,
  updateByObject,
  token
) => {
  await apiCall.DELETE(
    'feedbacks/' + feedbackId,
    updateByObject,
    token,
    () => {},
    result => {
      makeToast('Đã ẩn thông tin đánh giá sản phẩm!', toastType.success);
    },
    err => {
      makeToast('Lỗi hệ thống, vui lòng thử lại sau ít phút!', toastType.error),
        makeRefreshToken(err, dispatch, newToken =>
          handleDisableFeedback(dispatch, feedbackId, updateByObject, newToken)
        );
    }
  );
};

const handleReplyComment = async (dispatch, newComment, token) => {
  await apiCall.POST(
    'comments',
    newComment,
    token,
    () => {},
    result => {
      makeToast('Bình luận đã được thêm vào hệ thống!', toastType.success);
    },
    err => {
      makeToast('Lỗi hệ thống, vui lòng thử lại sau ít phút!', toastType.error),
        makeRefreshToken(err, dispatch, newToken =>
          handleReplyComment(dispatch, newComment, newToken)
        );
    }
  );
};

const handleDisableComment = async (
  dispatch,
  commentId,
  updateByObject,
  token
) => {
  await apiCall.DELETE(
    'comments/' + commentId,
    updateByObject,
    token,
    () => {},
    result => {
      makeToast('Đã ẩn bình luận về sản phẩm!', toastType.success);
    },
    err => {
      makeToast('Lỗi hệ thống, vui lòng thử lại sau ít phút!', toastType.error),
        makeRefreshToken(err, dispatch, newToken =>
          handleDisableComment(dispatch, commentId, updateByObject, newToken)
        );
    }
  );
};

const productService = {
  ...makeService('products', action),
  getProductDetail: async productId => {
    let data = null;
    await apiCall.GET_ALL(
      `products/${productId}/detail`,
      null,
      null,
      () => {},
      res => {
        data = res;
      },
      () => {}
    );
    return data;
  },
  getComments: async (productId = null) => {
    const response = [];
    await apiCall.GET_ALL(
      productId ? `products/${productId}/comments` : 'comments',
      null,
      null,
      () => {},
      res => {
        response.push(...res);
      },
      err => {}
    );
    return response;
  },
  getFeedbacks: async (productId = null) => {
    const response = [];
    await apiCall.GET_ALL(
      productId ? `products/${productId}/feedbacks` : 'feedbacks',
      null,
      null,
      () => {},
      res => {
        response.push(...res);
      },
      err => {}
    );
    return response;
  },
  disableComment: handleDisableComment,
  replyComment: handleReplyComment,
  disableFeedback: handleDisableFeedback
};
const productAccessoriesService = makeCollapseService(
  'products',
  'accessories'
);

export { productService, productAccessoriesService };
