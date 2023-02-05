import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import apiCategories from '../../apis/product/category.api';

const Category = () => {
  const { categoryList, loading, error } = useSelector(
    state => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    apiCategories.getAllCategories(dispatch);
  }, []);

  const handleCreate = () => {};

  const handleUpdate = () => {};

  const handleDelete = () => {};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Phân loại sản phẩm</h1>
        <button className="btn btn-primary fw-bold" onClick={handleCreate}>
          Thêm thông tin
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered border-dark table-hover table-sm">
          <thead className="bg-primary text-white">
            <tr className="text-center">
              <th scope="col">Mã phân loại</th>
              <th scope="col">Tên</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Ảnh minh họa</th>
              <th scope="col">Số sản phẩm trong kho</th>
              <th scope="col">Thiết lập</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.map((category, index) => {
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
                      onClick={handleUpdate}
                    >
                      Cập nhật
                    </button>{' '}
                    <br />
                    <button
                      className="btn btn-danger  w-100"
                      onClick={handleDelete}
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
    </div>
  );
};

export default Category;
