import React from 'react';
import useTable from '../../hooks/useTable';

function BrandTable({ brandList, handleSetUpdateMode, handleShowDeleteModal }) {
  return useTable(
    [
      'Mã thương hiệu',
      'Tên thương hiệu',
      'Quốc gia',
      'Ngày thành lập',
      'Logo',
      'Số sản phẩm trong kho',
      'Thiết lập'
    ],
    () =>
      brandList?.map(brand => (
        <tr key={brand.id} className="text-center">
          <td>{brand.id}</td>
          <td className="fw-bolder">{brand.name}</td>
          <td className="fw-bold text-secondary">{brand.country}</td>
          <td>{brand.establishDate}</td>
          <td>
            <img
              src={brand.logo}
              alt={brand.name + ' logo'}
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
              onClick={() => handleSetUpdateMode(brand)}
            >
              Cập nhật
            </button>{' '}
            <br />
            <button
              className="btn btn-danger w-100"
              onClick={() => handleShowDeleteModal(brand.id, brand.name)}
            >
              Xóa
            </button>
          </td>
        </tr>
      ))
  );
}

export default BrandTable;
