import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiCategories from '../../apis/product/category.api';

import ModalCustom from '../../components/Modal';
import Loading from '../../components/common/Loading';
import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';

const pageName = 'Phân loại hàng hóa';
const objectName = 'categories';
const titleButtonAdd = 'Thêm thông tin';

const Category = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { categoryList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  const [dispatch, workMode, showModal, categoryEdit, modalValue, action] =
    useWorkspace();

  useEffect(() => {
    apiCategories.getAllCategories(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((categoryId, categoryName) => {
    action.addModalValue(
      'Xác nhận xoá thông tin thương hiệu',
      `Bạn có thực sự muốn loại bỏ thương hiệu ${categoryName} khỏi hệ thống không?`,
      () => {
        apiCategories.deleteCategory(dispatch, categoryId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  if (workMode === WorkMode.create) {
    return (
      <CategoryForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
    );
  }
  if (workMode === WorkMode.edit) {
    return (
      <CategoryForm
        category={categoryEdit}
        handleBack={() => action.changeWorkMode(WorkMode.view)}
      />
    );
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      {showModal && (
        <ModalCustom
          show={showModal}
          setShow={action.showModal}
          props={modalValue}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{pageName}</h1>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </div>
      <CategoryTable
        categoryList={categoryList}
        handleSetUpdateMode={category => action.setUpdateMode(category)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default Category;
