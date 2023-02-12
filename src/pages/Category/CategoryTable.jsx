import React from 'react';
import useTable from '../../hooks/useTable';

function CategoryTable({
  categoryList,
  handleSetUpdateMode,
  handleShowDeleteModal
}) {
  return useTable(
    [
      'Mã phân loại',
      'Tên',
      'Mô tả',
      'Ảnh minh họa',
      'Số sản phẩm trong kho',
      'Thiết lập'
    ],
    () =>
      categoryList?.map((category, index) => {
        return (
          <tr className="text-center" key={index}>
            <td>{category.id}</td>
            <td className="fw-bolder">{category.name}</td>
            <td>{category.description}</td>
            <td>
              <img
                src={category.image}
                alt={category.name + ' images'}
                className="rounded img-fluid img-thumbnail"
                style={{ maxWidth: '10vw' }}
              />
            </td>
            <td>
              <p className="fw-bold">0</p>
            </td>
            <td>
              <button
                className="btn btn-secondary w-100 mb-2"
                onClick={() => handleSetUpdateMode(category)}
              >
                Cập nhật
              </button>{' '}
              <br />
              <button
                className="btn btn-danger  w-100"
                onClick={() =>
                  handleShowDeleteModal(category.id, category.name)
                }
              >
                Xóa
              </button>
            </td>
          </tr>
        );
      })
  );
}

export default CategoryTable;
