import React from 'react';

import SoftTable from '../../components/common/SoftTable';

import { formatDateTime } from '../../utils/formatTime';
// TODO: build sortable table
import { Loading, SortableTable } from '../../components/common';
import content from './content';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';
const headerList = [
  'ID',
  'Mã chiết khấu',
  'Kiểu áp dụng',
  'Mức giảm giá',
  'Mức giảm tối đa',
  'Ngày áp dụng',
  'Ngày hết hạn',
  'Thiết lập'
];

/**
 * @since 2023-02-13
 */
const DiscountTable = ({
  discountList,
  discountTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (discountList === null || discountList === undefined) return <Loading />;

  return (
    <SoftTable
      headerList={headerList}
      dataList={discountList}
      totalRecordData={discountTotalRecord}
      cb_handleRow={(idx_start, idx_end) =>
        discountList.slice(idx_start, idx_end).map(discount => (
          <tr key={discount.id} className="text-center">
            <td>{discount.id}</td>
            <td className="fw-bolder">{discount.code}</td>
            <td className="fw-bold text-secondary">{discount.appliedType}</td>
            <td>{(discount.rate * 100).toFixed(2) + ' %'}</td>
            <td className="text-danger">{discount.maxAmount}</td>
            <td> {formatDateTime(discount.appliedDate)}</td>
            <td> {formatDateTime(discount.endedDate)}</td>
            <td style={{ width: '10%' }}>
              <button
                className="btn btn-secondary w-100 mb-2"
                onClick={() => handleSetUpdateMode(discount)}
              >
                {titleButtonUpdate}
              </button>{' '}
              <br />
              <button
                className="btn btn-danger w-100"
                onClick={() =>
                  handleShowDeleteModal(discount.id, discount.code)
                }
              >
                {titleButtonDelete}
              </button>
            </td>
          </tr>
        ))
      }
    />
  );
};

export default DiscountTable;
