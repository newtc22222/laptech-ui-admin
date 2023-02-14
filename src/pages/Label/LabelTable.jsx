import React from 'react';
import useTable from '../../hooks/useTable';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';

/**
 * @since 2023-02-13
 */
const LabelTable = ({
  labelList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  return useTable(
    [
      'ID',
      'Tiêu đề',
      'Ảnh mô tả',
      'Nội dung gợi ý',
      'Mô tả chi tiết',
      'Mẫu hiển thị',
      'Thiết lập'
    ],
    () =>
      labelList?.map(label => (
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
  );
};

export default LabelTable;
