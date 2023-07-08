import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { categoryService, exportService } from '../../services';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';

import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';

import content from './content';

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
  } = useSelector(state => state['categories']);

  useEffect(() => {
    if (!categoryList || error) categoryService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback(
    (categoryId, categoryName) => {
      action.addModalValue(
        `Xác nhận xoá thông tin ${content.pageName.toLowerCase()}`,
        `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} ${categoryName} khỏi hệ thống không?`,
        () => {
          categoryService.delete(dispatch, categoryId, accessToken);
          action.showModal(false);
        }
      );
      action.showModal(true);
    },
    [dispatch, accessToken]
  );

  const handleBack = useCallback(
    () => action.changeWorkMode(WorkMode.view),
    []
  );

  const handleSetUpdateMode = useCallback(
    category => action.setUpdateMode(category),
    []
  );

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
      <CategoryForm
        show={workMode === WorkMode.create}
        handleBack={handleBack}
      />
      <CategoryForm
        show={workMode === WorkMode.edit}
        category={categoryEdit}
        handleSetUpdateMode={handleSetUpdateMode}
        handleBack={handleBack}
      />
      <PageHeader pageName={content.pageName}>
        <div className="btn-group" role="group">
          <button
            className="btn btn-outline-primary fw-bold"
            onClick={() =>
              exportService.csv(accessToken, dispatch, 'categories')
            }
            disabled={!categoryList || isFetching || error}
          >
            {content.titleBtnExport}
          </button>
          <button
            className="btn btn-outline-primary fw-bold"
            onClick={action.setCreateMode}
            disabled={!categoryList || isFetching || error}
          >
            {content.titleBtnAdd}
          </button>
        </div>
      </PageHeader>
      {!categoryList || isFetching ? (
        <Loading />
      ) : (
        <CategoryTable
          categoryList={categoryList}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </div>
  );
};

export default Category;
