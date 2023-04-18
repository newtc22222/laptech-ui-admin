import { ico_edit, ico_del } from '../../assets/svg/crud';

const content = {
  role: 'phân quyền',
  id: 'id',
  name: 'tên phân quyền',
  description: 'thông tin chung',
  setting: 'thiết lập',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'tên phân quyền',
    description: 'mô tả quyền truy cập',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    name: 'Tên phân quyền không được bỏ trống!',
    description: 'Thông tin mô tả không được bỏ trống!'
  }
};

export default content;
