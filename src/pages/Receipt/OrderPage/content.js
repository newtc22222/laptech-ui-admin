const content = {
  pageName: 'Thông tin đơn đặt hàng',
  titleBtnReload: 'Tải lại thủ công',
  titleBtnExport: 'Tải thông tin',
  invoice: 'Đơn bán hàng',
  box: {
    id: 'Mã đơn hàng',
    dateCreated: 'Ngày tạo hóa đơn',
    customer: 'Khách hàng',
    phone: 'Số điện thoại',
    address: 'Địa chỉ nhận hàng',
    paymentType: 'Kiểu thanh toán',
    paymentTypeSub: {
      cash: 'Tiền mặt',
      banking: 'Chuyển khoản',
      eWallet: 'Ví điện tử'
    },
    itemQuantity: 'Số lượng hàng hóa',
    discountAmount: 'Giá giảm',
    shipCost: 'Chi phí vận chuyển',
    tax: 'Phụ thu',
    totalPrice: 'Tổng giá trị đơn hàng',
    paidStatus: 'Trạng thái thanh toán',
    paidStatusText: {
      true: 'Đã thanh toán',
      false: 'Chưa thanh toán'
    },
    note: 'Ghi chú của khách hàng'
  },
  status: {
    PENDING: 'Đang xử lý',
    WAIT_CONFIRMED: 'Chờ xác nhận',
    PREPARED: 'Đang chuẩn bị',
    SHIPPED: 'Đang giao',
    RECEIVED: 'Đã nhận',
    CANCELED: 'Đã hủy',
    FAILED: 'Ngừng xử lý',
    IGNORED: 'Đã từ chối'
  },
  changeStatus: {
    nothing: 'Không có thay đổi thông tin!',
    PENDING: 'Xử lý',
    CONFIRMED: 'Xác nhận',
    PREPARED: 'Chuẩn bị hàng',
    SHIPPED: 'Giao hàng',
    RECEIVED: 'Đã nhận hàng',
    CANCELED: 'Hủy đơn',
    FAILED: 'Ngừng xử lý',
    REJECTED: 'Từ chối'
  },
  id: 'id',
  userName: 'Tên khách hàng',
  address: 'Địa chỉ giao hàng',
  dateCreated: 'ngày tạo',
  itemQuantity: 'tổng sp',
  totalCost: 'tổng giá trị',
  setting: 'thiết lập',
  btnShow: 'hiển thị'
};

export default content;
