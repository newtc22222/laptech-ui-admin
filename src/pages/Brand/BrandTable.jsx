import React from 'react';
import Loading from '../../components/common/Loading';
import SoftTable from '../../components/common/SoftTable';
import { ico_edit, ico_del } from '../../common/svg/crud';

const headerList = [
  'ID',
  'Tên thương hiệu',
  'Quốc gia',
  'Ngày thành lập',
  'Logo',
  'Số sản phẩm trong kho',
  'Thiết lập'
];

const BrandTable = ({
  brandList,
  brandTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (brandList === null || brandList === undefined) return <Loading />;

  return (
    <SoftTable
      headerList={headerList}
      dataList={brandList}
      totalRecordData={brandTotalRecord}
      cb_handleRow={(idx_start, idx_end) =>
        brandList.slice(idx_start, idx_end).map(brand => (
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
                style={{ maxWidth: '8vw' }}
              />
            </td>
            <td>
              <p className="fw-bold">0</p>
            </td>
            <td style={{ width: '10%' }}>
              <button
                className="btn btn-secondary w-100 mb-2"
                onClick={() => handleSetUpdateMode(brand)}
              >
                {ico_edit}
              </button>{' '}
              <br />
              <button
                className="btn btn-danger w-100"
                onClick={() => handleShowDeleteModal(brand.id, brand.name)}
              >
                {ico_del}
              </button>
            </td>
          </tr>
        ))
      }
    />
  );
};

export default BrandTable;
