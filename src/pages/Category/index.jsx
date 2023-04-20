import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { categoryService } from '../../services';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';

import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';

const pageName = 'Phân loại hàng hóa';
const objectName = 'categories';
const titleButtonAdd = 'Thêm thông tin';

const Category = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: categoryEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: categoryList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  useEffect(() => {
    if (!categoryList || error) categoryService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = (categoryId, categoryName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${categoryName} khỏi hệ thống không?`,
      () => {
        categoryService.delete(dispatch, categoryId, accessToken);
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
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {workMode === WorkMode.create && (
        <CategoryForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <CategoryForm
          category={categoryEdit}
          handleBack={() => action.changeWorkMode(WorkMode.view)}
        />
      )}
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
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
