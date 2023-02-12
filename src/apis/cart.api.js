// import FetchAPI from '../custom/fetch-api';
// import {
//   fetchCartStart,
//   fetchCartFailed,
//   getCartSuccess,
//   createCartSuccess,
//   updateCartSuccess,
//   deleteCartSuccess
// } from '../redux-feature';
// import {
//   handleShowToast,
//   NotificationType
// } from '../../utils/HandleNotification';

// const apiCarts = {
//   getAllCarts: async dispatch => {
//     await FetchAPI.GET_ALL(
//       'carts',
//       null,
//       null,
//       () => dispatch(fetchCartStart()),
//       cartList => dispatch(getCartSuccess(cartList)),
//       () => {
//         handleShowToast(
//           dispatch,
//           NotificationType.ERROR,
//           'Lỗi hệ thống',
//           'Không thể kết nối với Server!'
//         );
//         dispatch(fetchCartFailed());
//       }
//     );
//   },
//   createNewCart: async (dispatch, cart, token) => {
//     await FetchAPI.POST(
//       'carts',
//       cart,
//       token,
//       () => dispatch(fetchCartStart()),
//       result => {
//         handleShowToast(
//           dispatch,
//           NotificationType.SUCCESS,
//           'Thêm thông tin thành công',
//           'Một sản phẩm vừa được thêm vào cơ sở dữ liệu!'
//         );
//         dispatch(createCartSuccess(result.data));
//       },
//       () => {
//         handleShowToast(
//           dispatch,
//           NotificationType.ERROR,
//           'Lỗi hệ thống',
//           'Dữ liệu lỗi, không thể gửi đến server!'
//         );
//         dispatch(fetchCartFailed());
//       }
//     );
//   },
//   updateCart: async (dispatch, updateCart, cartId, token) => {
//     await FetchAPI.PUT(
//       `carts/${cartId}`,
//       updateCart,
//       token,
//       () => dispatch(fetchCartStart()),
//       result => {
//         handleShowToast(
//           dispatch,
//           NotificationType.SUCCESS,
//           'Thay đổi thông tin thành công',
//           'Dữ liệu của sản phẩm vừa được cập nhật vào cơ sở dữ liệu!!'
//         );
//         console.table(result);
//         updateCart.id = cartId;
//         dispatch(updateCartSuccess(updateCart));
//       },
//       () => {
//         handleShowToast(
//           dispatch,
//           NotificationType.ERROR,
//           'Lỗi hệ thống',
//           'Dữ liệu lỗi, không thể gửi đến server!'
//         );
//         dispatch(fetchCartFailed());
//       }
//     );
//   },
//   deleteCart: async (dispatch, cartId, token) => {
//     await FetchAPI.DELETE(
//       `carts/${cartId}`,
//       null,
//       token,
//       () => dispatch(fetchCartStart()),
//       result => {
//         handleShowToast(
//           dispatch,
//           NotificationType.SUCCESS,
//           'Xóa thông tin thành công',
//           'Dữ liệu đã được xóa khỏi hệ thống!'
//         );
//         console.table(result);
//         dispatch(deleteCartSuccess(cartId));
//       },
//       () => {
//         handleShowToast(
//           dispatch,
//           NotificationType.ERROR,
//           'Lỗi hệ thống',
//           'Không thể xóa sản phẩm này khỏi hệ thống!'
//         );
//         dispatch(fetchCartFailed());
//       }
//     );
//   }
// };

// export default apiCarts;
