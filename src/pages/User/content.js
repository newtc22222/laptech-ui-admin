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
  rejected: 'Không được xóa tài khoản đang hoạt động trên hệ thống!',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'tên người dùng',
    phone: 'số điện thoại',
    email: 'email cá nhân (hoặc công việc)',
    dob: 'ngày sinh',
    password: 'mật khẩu',
    gender: 'giới tính',
    status: 'Kích hoạt tài khoản',
    roles: 'phân quyền',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    fail: 'Không thể tạo tài khoản người dùng mới',
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    name: 'Tên người dùng không được bỏ trống!',
    dob: 'Ngày sinh của người dùng không hợp lệ!',
    phone: 'Hệ thống yêu cầu cung cấp số điện thoại!',
    password:
      'Mật khẩu phải có it nhất 8 ký tự, bao gồm chữ số, chữ cái thường và chữ cái in hoa!',
    role: 'Người dùng phải có ít nhất một phân quyền trong hệ thống!'
  },
  genderOptions: [
    {
      label: 'Nam',
      value: 'MALE'
    },
    {
      label: 'Nữ',
      value: 'FEMALE'
    },
    {
      label: 'Khác',
      value: 'OTHER'
    }
  ],
  genderVietsub: {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    OTHER: 'Khác'
  }
};

export default content;
