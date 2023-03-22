import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth.slice';
import {
  // brandReducer,
  categoryReducer,
  commentReducer,
  discountReducer,
  feedbackReducer,
  labelReducer,
  productReducer
} from '../product_slice';
import roleReducer from '../role.slice';
import userReducer from '../user.slice';
import toastReducer from '../toast_notify';
import brandReducer from '../../store/slice/brand.slice';

export const store = configureStore({
  reducer: {
    /* AUTHENTICATION */
    auth: authReducer,
    roles: roleReducer,
    /* PRODUCT */
    brands: brandReducer,
    categories: categoryReducer,
    discounts: discountReducer,
    labels: labelReducer,
    products: productReducer,
    comments: commentReducer,
    feedbacks: feedbackReducer,
    /* USER */
    users: userReducer,
    /* CHAT BOX */
    // rooms: roomReducer,
    // messages: messageReducer,
    /* NOTIFICATION */
    toastList: toastReducer
  }
});
