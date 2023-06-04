import apiCall from '../../apis';
import makeService from '../common/makeService';
import makeCollapseService from '../common/makeCollapseService';
import { action } from '../../store/slice/product.slice';

const productService = {
  ...makeService('products', action),
  getComments: async (productId = '') => {
    const response = [];
    if (!productId) {
      await apiCall.GET_ALL(
        'comments',
        null,
        null,
        () => {},
        res => {
          console.log(res);
          response.push(...res.data);
        },
        err => {}
      );
    } else {
      await apiCall.GET_ALL(
        `products/${productId}/comments`,
        null,
        null,
        () => {},
        res => {
          console.log(res);
          response.push(...res.data);
        },
        err => {}
      );
    }
    return response;
  },
  getFeedbacks: (productId = '') => {
    const response = [];
    if (!productId) {
      apiCall.GET_ALL(
        'feedbacks',
        null,
        null,
        () => {},
        res => {
          response.push(...res.data);
        },
        err => {}
      );
    } else {
      apiCall.GET_ALL(
        `products/${productId}/feedbacks`,
        null,
        null,
        () => {},
        res => {
          response.push(...res.data);
        },
        err => {}
      );
    }
    return response;
  }
};
const productAccessoriesService = makeCollapseService(
  'products',
  'accessories'
);

export { productService, productAccessoriesService };
