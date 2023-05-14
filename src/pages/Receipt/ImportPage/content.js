import { ico_edit, ico_del } from '../../../assets/svg/crud';

const content = {
  pageName: 'Thông tin đơn nhập hàng',
  ticket: 'phiếu nhập hàng',
  ticketId: 'mã phiếu',
  productId: 'mã sản phẩm',
  productName: 'tên sản phẩm',
  quantity: 'số lượng',
  price: 'giá nhập',
  date: 'ngày nhập',
  total: 'tổng giá trị',
  titleBtnAdd: 'Tạo phiếu nhập hàng',
  setting: 'thiết lập',
  recommendPrice: 'Giá bán hiện tại của sản phẩm: ',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    ticketId: 'mã phiếu',
    productId: 'mã sản phẩm',
    productName: 'tên sản phẩm',
    quantity: 'số lượng sản phẩm',
    price: 'giá nhập hàng',
    date: 'ngày nhập hàng',
    total: 'tổng giá trị',
    nothingChange: 'Dữ liệu không có thay đổi!',
    expired:
      'Quá thời hạn thay đổi thông tin! Thông tin chỉ được chỉnh sửa trong vòng 7 ngày!'
  },
  error: {
    missing: 'Vui lòng cung cấp đầy đủ thông tin'
  }
};

export default content;
