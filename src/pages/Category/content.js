import { ico_edit, ico_del } from '../../common/svg/crud';

const content = {
  category: 'phân loại',
  id: 'id',
  name: 'tên',
  description: 'mô tả',
  image: 'ảnh minh họa',
  setting: 'thiết lập',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    name: 'tên phân loại',
    description: 'mô tả chung',
    image: 'ảnh minh họa'
  },
  error: {
    name: 'Tên phân loại không được bỏ trống!',
    upload: 'Không thể cập nhật hình ảnh!'
  }
};

export default content;
