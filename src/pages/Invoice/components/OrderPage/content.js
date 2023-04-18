const content = {
  invoice: "Đơn bán hàng",
  status: {
    PENDING: "Đang xử lý",
    WAIT_CONFIRMED: "Chờ xác nhận",
    PREPARED: "Đang chuẩn bị",
    SHIPPED: "Đang giao",
    RECEIVED: "Đã nhận",
    CANCELED: "Đã hủy",
    FAILED: "Ngừng xử lý",
    IGNORED: "Đã từ chối"
  },
  changeStatus: {
    PENDING: "Xử lý",
    CONFIRMED: "Xác nhận",
    PREPARED: "Chuẩn bị hàng",
    SHIPPED: "Giao hàng",
    RECEIVED: "Đã nhận hàng",
    CANCELED: "Hủy đơn",
    FAILED: "Ngừng xử lý",
    REJECTED: "Từ chối"
  },
  id: "id",
  dateCreated: "ngày tạo",
  itemQuantity: "tổng sp",
  totalCost: "tổng giá trị",
  setting: "thiết lập",
  btnShow: "hiển thị"
};

export default content;
