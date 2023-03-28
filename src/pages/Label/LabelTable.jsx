import React from 'react';

import SoftTable from '../../components/common/SoftTable';
// TODO: build sortable table
import { Loading, SortableTable } from '../../components/common';
import content from './content';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';
const headerList = [
  'ID',
  'Tiêu đề',
  'Ảnh mô tả',
  'Nội dung gợi ý',
  'Mô tả chi tiết',
  'Mẫu hiển thị',
  'Thiết lập'
];

/**
 * @since 2023-02-13
 */
const LabelTable = ({
  labelList,
  labelTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (labelList === null || labelList === undefined) return <Loading />;

  return (
    <SoftTable
      headerList={headerList}
      dataList={labelList}
      totalRecordData={labelTotalRecord}
      cb_handleRow={(idx_start, idx_end) =>
        labelList.slice(idx_start, idx_end).map(label => (
          <tr key={label.id} className="text-center">
            <td>{label.id}</td>
            <td className="fw-bolder">{label.name}</td>
            <td>
              <div dangerouslySetInnerHTML={{ __html: label.icon }} />
            </td>
            <td className="fw-bold text-secondary">{label.title}</td>
            <td style={{ maxWidth: '15vw' }}>{label.description}</td>
            <td>
              <div
                title={label.title}
                className="d-flex justify-content-center border border-primary rounded-2"
              >
                <div
                  className="me-2"
                  dangerouslySetInnerHTML={{ __html: label.icon }}
                />
                {label.name}
              </div>
            </td>
            <td style={{ width: '10%' }}>
              <button
                className="btn btn-secondary w-100 mb-2"
                onClick={() => handleSetUpdateMode(label)}
              >
                {titleButtonUpdate}
              </button>{' '}
              <br />
              <button
                className="btn btn-danger w-100"
                onClick={() => handleShowDeleteModal(label.id, label.name)}
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

export default LabelTable;
