import { ico_edit, ico_del } from '../../common/svg/crud';

const content = {
  discount: 'phân loại',
  id: 'id',
  code: 'mã chiết khấu',
  appliedType: 'kiểu áp dụng',
  rate: 'mức chiết khấu',
  maxAmount: 'mức giảm tối đa',
  appliedDate: 'ngày áp dụng',
  endedDate: 'ngày hết hạn',
  setting: 'thiết lập',
  btnEdit: ico_edit,
  btnDel: ico_del,
  form: {
    code: 'Mã được sử dụng',
    appliedTypeTitle: 'Kiểu giảm giá được áp dụng',
    appliedType: 'Kiểu giảm giá',
    discountRange: 'Mức giảm giá',
    rate: 'Tỉ lệ (0 - 80)%',
    maxAmount: 'Mức giá tối đa',
    time: 'Thời gian áp dụng',
    appliedDate: 'Bắt đầu',
    endedDate: 'Kết thúc'
  },
  error: {
    code: 'Mã giảm giá không được bỏ trống!',
    appliedType: 'kiểu áp dụng',
    rate: 'ảnh minh họa',
    maxAmount: 'mức giảm tối đa',
    appliedDate: 'ngày áp dụng',
    endedDate: 'ngày hết hạn'
  }
};

export default content;
