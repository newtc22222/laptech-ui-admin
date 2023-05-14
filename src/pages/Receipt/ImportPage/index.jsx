import React, { useEffect } from 'react';
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

  const handleShowDeleteModal = importId => {
    action.addModalValue(
      `Xác nhận xoá ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} số ${importId} khỏi hệ thống không?`,
      () => {
        importProductService.delete(dispatch, importId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

  if (isFetching || isProductFetching) {
    return <Loading />;
  }

  if (error || isProductError) {
    return <ServerNotResponse />;
  }

  const EditFormModal = () => {
    switch (workMode) {
      case WorkMode.create:
        return (
          <ImportedForm
            handleBack={() => action.changeWorkMode(WorkMode.view)}
            productList={productList}
          />
        );
      case WorkMode.edit:
        return (
          <ImportedForm
            importTicketEdit={importTickerEdit}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
            productList={productList}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      <EditFormModal />
      <PageHeader pageName={content.pageName}>
        <button
          type="button"
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
          disabled={!importList || !productList}
        >
          {content.titleBtnAdd}
        </button>
      </PageHeader>
      <ImportedTable
        importTicketList={importList}
        importTicketTotalRecord={importList?.length || 0}
        productList={productList}
        handleSetUpdateMode={importTicket => action.setUpdateMode(importTicket)}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </>
  );
};

export default ImportPage;
