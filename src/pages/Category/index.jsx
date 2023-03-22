import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';

import apiCategory from '../../apis/product/category.api';

import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';
import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';

const pageName = 'Phân loại hàng hóa';
const objectName = 'categories';
const titleButtonAdd = 'Thêm thông tin';

const Category = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    Navigate,
    workMode,
    showModal,
    categoryEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  const {
    data: categoryList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  useEffect(() => {
    if (!categoryList) apiCategory.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = (categoryId, categoryName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${categoryName} khỏi hệ thống không?`,
      () => {
        apiCategory.delete(dispatch, categoryId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      {showModal && (
        <ModalConfirm
          show={showModal}
          setShow={action.showModal}
          props={modalValue}
        />
      )}
      {workMode === WorkMode.create && (
        <CategoryForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <CategoryForm
          category={categoryEdit}
          handleBack={() => action.changeWorkMode(WorkMode.view)}
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
        categoryTotalRecord={categoryList?.length}
        handleSetUpdateMode={category => action.setUpdateMode(category)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default Category;
