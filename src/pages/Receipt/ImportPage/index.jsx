import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../../components/common';
import ImportedForm from './ImportedForm';
import ImportedTable from './ImportedTable';

import useWorkspace, { WorkMode } from '../../../hooks/useWorkspace';
import { importProductService, productService } from '../../../services';
import content from './content';

/**
 * @since 2023-03-22
 */
const ImportPage = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: importTickerEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: importList,
    isFetching,
    error
  } = useSelector(state => state['imports']);
  const {
    data: productList,
    isProductFetching,
    isProductError
  } = useSelector(state => state['products']);

  // Loading
  useEffect(() => {
    if (!productList || isProductError)
      productService.getAll(dispatch, accessToken); // get list product
    importProductService.getAll(dispatch, accessToken); // refresh when mount
  }, [dispatch, accessToken]);

  const handleShowDeleteModal = useCallback(
    importId => {
      action.addModalValue(
        `Xác nhận xoá ${content.pageName.toLowerCase()}`,
        `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} số ${importId} khỏi hệ thống không?`,
        () => {
          importProductService.delete(dispatch, importId, accessToken);
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

  if (error || isProductError) {
    return <ServerNotResponse />;
  }

  return (
    <>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {workMode === WorkMode.create && (
        <ImportedForm productList={productList} handleBack={handleBack} />
      )}
      {workMode === WorkMode.edit && (
        <ImportedForm
          importTicketEdit={importTickerEdit}
          productList={productList}
          handleBack={handleBack}
        />
      )}
      <PageHeader pageName={content.pageName}>
        <button
          type="button"
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
          disabled={
            !importList ||
            !productList ||
            isFetching ||
            isProductFetching ||
            error ||
            isProductError
          }
        >
          {content.titleBtnAdd}
        </button>
      </PageHeader>
      {isFetching || !importList || isProductFetching || !productList ? (
        <Loading />
      ) : (
        <ImportedTable
          importTicketList={importList}
          productList={productList}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </>
  );
};

export default ImportPage;
