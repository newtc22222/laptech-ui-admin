import { ico_edit, ico_del } from '../../assets/svg/crud';

const content = {
  pageName: 'Nhãn thuộc tính sản phẩm',
  id: 'id',
  name: 'tiêu đề',
  icon: 'biểu tượng',
  title: 'nội dung hiển thị',
  description: 'mô tả chi tiết',
  sample: 'mẫu hiển thị',
  setting: 'thiết lập',
  titleBtnAdd: 'Thêm thông tin',
  titleBtnExport: 'Tải thông tin',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'Tiêu đề (hiển thị trực tiếp)',
    icon: 'Biểu tượng đại diện',
    title: 'Thông tin mô tả khi người dùng trỏ chuột vào',
    description: 'Thông tin chi tiết về nhãn sản phẩm',
    linkChooseIcon: 'https://icons.getbootstrap.com/',
    hintChooseIcon:
      'Truy cập vào link https://icons.getbootstrap.com/ sau đó chọn 1 icon và copy thẻ icon được để sẵn.',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    icon: 'Vui lòng điền mã icon!',
    name: 'Tiêu đề không được để trống!',
    title: 'Nội dung hiển thị không được để trống!'
  }
};

export default content;
