import { ico_edit, ico_del } from '../../assets/svg/crud';

const content = {
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
  form: {
    basicInformation: 'thông tin cơ bản',
    id: 'mã sản phẩm',
    name: 'tên sản phẩm hiển thị',
    brandChoice: 'thương hiệu',
    categoryChoice: 'phân loại',
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
  form_image: { title: 'Điều chỉnh hình ảnh' },
  form_label: { title: 'Điều chỉnh nhãn sản phẩm' },
  form_discount: { title: 'Điều chỉnh mã chiết khấu' },
  menu: {
    basicInformation: 'Thông tin cơ bản',
    images: 'Hình ảnh sản phẩm',
    labels: 'Nhãn sản phẩm',
    discounts: 'Mã chiết khấu'
  },
  error: {
    name: 'Tên sản phẩm không được để trống!',
    brandChoice: 'Vui lòng cung cấp tên thương hiệu!',
    categoryChoice: 'Vui lòng chọn loại sản phẩm!',
    releasedDate: 'Vui lòng ngày sản xuất!',
    listedPrice: 'Giá niêm yết không được để trống!',
    descriptionDetail: 'Thông tin mô tả chi tiết không được để trống!'
  }
};

export default content;
