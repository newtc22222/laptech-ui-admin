import React from 'react';
import SoftTable from '../../components/common/SoftTable';
import { getCurrencyString } from '../../utils/formatCurency';

import Loading from '../../components/common/Loading';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';
const currencyUnit = ' đồng';

// TODO: Build table with brand and category name (fetch if it needs)

const headerList = [
  'Tên sản phẩm',
  'Thương hiệu',
  'Danh mục',
  'Ảnh đại diện',
  'Ngày ra mắt',
  'Số lượng trong kho',
  'Giá niêm yết',
  'Thiết lập'
];

function ProductTable({
  productList,
  productTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) {
  if (productList === null || productList === undefined) return <Loading />;

  return (
    <SoftTable
      headerList={headerList}
      dataList={productList}
      totalRecordData={productTotalRecord}
      cb_handleRow={() =>
        productList?.map(product => (
          <tr key={product.id} className="text-center">
            <td className="fw-bolder">{product.name}</td>
            <td className="text-secondary">
              {brandList[product.brandId].name}
            </td>
            <td className="text-secondary">
              {categoryList[product.categoryId].name}
            </td>
            <td>
              <img src={''} />
            </td>
            <td>{product.releasedDate}</td>
            <td>
              <p className="fw-bold">0</p>
            </td>
            <td>
              <p className="fw-bold">
                {getCurrencyString(product.listedPrice) + currencyUnit}
              </p>
            </td>
            <td style={{ width: '10%' }}>
              <button
                className="btn btn-secondary w-100 mb-2"
                onClick={() => handleSetUpdateMode(product)}
              >
                {titleButtonUpdate}
              </button>{' '}
              <br />
              <button
                className="btn btn-danger w-100"
                onClick={() => handleShowDeleteModal(product.id, product.name)}
              >
                {titleButtonDelete}
              </button>
            </td>
          </tr>
        ))
      }
    />
  );
}

export default ProductTable;
