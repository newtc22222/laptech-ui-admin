import { ico_edit, ico_del } from '../../common/svg/crud';

const content = {
  brand: 'thương hiệu',
  id: 'id',
  name: 'tên',
  country: 'quốc gia',
  establishDate: 'ngày thành lập',
  logo: 'logo',
  setting: 'thiết lập',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'tên thương hiệu',
    country: 'tên quốc gia',
    establishDate: 'ngày thành lập',
    logo: 'logo đại diện',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    name: 'Tên thương hiệu không được bỏ trống!',
    country: 'Quốc gia của thương hiệu không được bỏ trống!',
    upload: 'Không thể cập nhật hình ảnh!'
  }
};

export default content;
