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
    endedDate: 'Kết thúc',
    nothingChange: 'Dữ liệu không có thay đổi!'
  },
  error: {
    missing: 'Vui lòng cập nhật đầy đủ thông tin!',
    code: 'Mã giảm giá không được bỏ trống!',
    rate: 'Mức giảm không hợp lệ!',
    minRate: 'Mức giảm thấp nhất là 0%',
    maxRate: 'Mức giảm cao nhất là 80%',
    maxAmount: 'Mức giảm tối đa không được trống!',
    appliedDate: 'Ngày áp dụng không được trống!',
    endedDate: 'Ngày hết hạn không được trống!',
    dateConflict: 'Vui lòng kiểm tra ngày sử dụng mã!'
  }
};

export default content;
