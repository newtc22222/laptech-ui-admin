import React from 'react';
import SoftTable from '../../components/common/SoftTable';
import Loading from '../../components/common/Loading';

const titleButtonUpdate = 'Cập nhật';
const titleButtonDelete = 'Xóa';
const headerList = [
  'ID',
  'Tên',
  'Mô tả',
  'Ảnh minh họa',
  'Số sản phẩm trong kho',
  'Thiết lập'
];

function CategoryTable({
  categoryList,
  categoryTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) {
  if (categoryList === null || categoryList === undefined) return <Loading />;

  return (
    <SoftTable
      headerList={headerList}
      dataList={categoryList}
      totalRecordData={categoryTotalRecord}
      cb_handleRow={(idx_start, idx_end) =>
        categoryList.slice(idx_start, idx_end).map((category, index) => {
          return (
            <tr className="text-center" key={index}>
              <td>{category.id}</td>
              <td className="fw-bolder">{category.name}</td>
              <td style={{ maxWidth: '30vw' }}>{category.description}</td>
              <td>
                <img
                  src={category.image}
                  alt={category.name + ' images'}
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
                  onClick={() => handleSetUpdateMode(category)}
                >
                  {titleButtonUpdate}
                </button>{' '}
                <br />
                <button
                  className="btn btn-danger  w-100"
                  onClick={() =>
                    handleShowDeleteModal(category.id, category.name)
                  }
                >
                  {titleButtonDelete}
                </button>
              </td>
            </tr>
          );
        })
      }
    />
  );
}

export default CategoryTable;
