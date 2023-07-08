import { ico_edit, ico_del } from '../../assets/svg/crud';

const content = {
  pageName: 'Sản phẩm',
  titleBtnReload: 'Tải lại dữ liệu',
  titleBtnExport: 'Tải thông tin',
  titleBtnAdd: 'Thêm thông tin',
  id: 'mã sản phẩm',
  name: 'tên sản phẩm',
  brand: 'thương hiệu',
  category: 'phân loại',
  releasedDate: 'ngày ra mắt',
  quantityInStock: 'số lượng kho',
  listedPrice: 'giá niêm yết',
  setting: 'thiết lập',
  btnEdit: ico_edit,
  btnDel: ico_del,
  nothingChange: 'Không có thay đổi thông tin',
  form: {
    basicInformation: 'thông tin cơ bản',
    id: 'mã sản phẩm',
    name: 'tên sản phẩm hiển thị',
    brandChoice: 'Chọn thương hiệu',
    categoryChoice: 'Chọn phân loại',
    releasedDate: 'ngày ra mắt',
    listedPrice: 'giá niêm yết',
    specifications: 'thông số kỹ thuật',
    descriptionDetail: 'mô tả chi tiết',
    labelList: 'Danh sách nhãn thông tin',
    discountList: 'Danh sách mã chiết khấu',
    attribute: 'Thuộc tính',
    information: 'Thông tin',
    setting: 'Thiết lập',
    tabTitle: 'Tiêu đề Tab'
  },
  form_image: {
    title: 'Điều chỉnh hình ảnh',
    label: 'Danh sách hình ảnh',
    advertise: 'Quảng cáo',
    detail: 'Ảnh chi tiết',
    extra: 'Ảnh bổ sung',
    feedback: 'Ảnh phản hồi'
  },
  form_label: { title: 'Điều chỉnh nhãn sản phẩm' },
  form_discount: { title: 'Điều chỉnh mã chiết khấu' },
  form_accessory: {
    title: 'Điều chỉnh phụ kiện sản phẩm',
    name: 'Tên phụ kiện: ',
    brand: 'Thương hiệu: ',
    category: 'Loại: ',
    price: 'Giá thành: '
  },
  menu: {
    basicInformation: 'Thông tin cơ bản',
    images: 'Hình ảnh sản phẩm',
    labels: 'Nhãn sản phẩm',
    accessories: 'Phụ kiện theo kèm',
    discounts: 'Mã chiết khấu'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    name: 'Tên sản phẩm không được để trống!',
    brandChoice: 'Vui lòng cung cấp tên thương hiệu!',
    categoryChoice: 'Vui lòng chọn loại sản phẩm!',
    releasedDate: 'Vui lòng ngày sản xuất!',
    listedPrice: 'Giá niêm yết không được để trống!',
    descriptionDetail: 'Thông tin mô tả chi tiết không được để trống!',
    upload: 'Không thể cập nhật hình ảnh'
  }
};

export default content;
