import { ico_edit, ico_del } from '../../assets/svg/crud';

const content = {
  user: 'người dùng',
  id: 'id',
  name: 'tên người dùng',
  phone: 'số điện thoại',
  gender: 'giới tính',
  status: 'trạng thái tài khoản',
  active: 'đang hoạt động',
  inactive: 'bị khóa',
  setting: 'thiết lập',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'tên người dùng',
    phone: 'số điện thoại',
    gender: 'giới tính',
    status: 'Kích hoạt tài khoản',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    name: 'Tên phân quyền không được bỏ trống!',
    description: 'Thông tin mô tả không được bỏ trống!'
  }
};

export default content;
