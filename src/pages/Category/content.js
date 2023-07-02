import { ico_edit, ico_del } from '../../assets/svg/crud';

const content = {
  pageName: 'Phân loại sản phẩm',
  id: 'id',
  name: 'tên',
  description: 'mô tả',
  image: 'ảnh minh họa',
  setting: 'thiết lập',
  titleBtnExport: 'Tải thông tin',
  titleBtnAdd: 'Thêm thông tin',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'tên phân loại',
    description: 'mô tả chung',
    image: 'ảnh minh họa',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    name: 'Tên phân loại không được bỏ trống!',
    upload: 'Không thể cập nhật hình ảnh!'
  }
};

export default content;
