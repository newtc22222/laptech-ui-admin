import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  brandReducer,
  categoryReducer,
  discountReducer,
  labelReducer,
  importReducer,
  invoiceReducer,
  productReducer,
  roleReducer,
  userReducer
} from './slice';

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
    imports: importReducer,
    products: productReducer,
    /* USER */
    invoices: invoiceReducer,
    users: userReducer
  }
});
