const content = {
  pageName: 'Quản lý thông tin cá nhân',
  id: 'Mã người dùng',
  name: 'Tên người dùng',
  phone: 'Số điện thoại',
  gender: 'Giới tính',
  genderType: {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    OTHER: 'Khác'
  },
  email: 'Email',
  dateOfBirth: 'Ngày sinh',
  changeInformation: 'Thông tin cá nhân',
  changePassword: 'Đổi mật khẩu',
  role: 'Quyền sử dụng hệ thống',
  form: {
    oldPassword: 'Nhập mật khẩu cũ',
    newPassword: 'Nhập mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu',
    edit: 'Điều chỉnh',
    save: 'Lưu thông tin',
    isSubmitting: 'Đang xác thực',
    cancel: 'Hủy thao tác',
    nothingChange: 'Không có thay đổi thông tin!'
  },
  validate: {
    passwordStrength:
      'Mật khẩu cần có ít nhất 8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt!',
    passwordNewInvalid: 'Mật khẩu mới không được trùng mật khẩu cũ!',
    passwordConfirmNotCorrect: 'Mật khẩu xác thực không chính xác!'
  },
  error: {
    minLength: 'Độ dài tối thiểu là x!',
    passwordStrength: 'Mật khẩu chưa đủ an toàn để sử dụng!',
    wrongInformation: 'Thông tin không hợp lệ!',
    missing: 'Vui lòng cung cấp thông tin này!'
  }
};

export default content;
