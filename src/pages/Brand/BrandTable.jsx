import React from 'react';

function BrandTable({ brandList, handleSetUpdateMode, handleShowDeleteModal }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered border-dark table-hover table-sm">
        <thead className="bg-primary text-white">
          <tr className="text-center">
            <th scope="col">Mã thương hiệu</th>
            <th scope="col">Tên thương hiệu</th>
            <th scope="col">Quốc gia</th>
            <th scope="col">Ngày thành lập</th>
            <th scope="col">Logo</th>
            <th scope="col">Số sản phẩm trong kho</th>
            <th scope="col">Thiết lập</th>
          </tr>
        </thead>
        <tbody>
          {brandList?.map(brand => {
            return (
              <tr className="text-center" key={brand.id}>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BrandTable;
