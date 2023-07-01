import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import BrandForm from './BrandForm';
import BrandTable from './BrandTable';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';
import { brandService } from '../../services';

const pageName = 'Thương hiệu';
const objectName = 'brands';
const titleButtonAdd = 'Thêm thông tin';

const BrandPage = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: brandEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: brandList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  // Loading
  useEffect(() => {
    if (!brandList || error) brandService.getAll(dispatch);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = useCallback(
    (brandId, brandName) => {
      action.addModalValue(
        `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
        `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${brandName} khỏi hệ thống không?`,
        () => {
          brandService.delete(dispatch, brandId, accessToken);
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
    brand => action.setUpdateMode(brand),
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
      {workMode === WorkMode.edit && (
        <BrandForm brand={brandEdit} handleBack={handleBack} />
      )}
      {workMode === WorkMode.create && <BrandForm handleBack={handleBack} />}
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
          disabled={!brandList || isFetching || error}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
      {!brandList || isFetching ? (
        <Loading />
      ) : (
        <BrandTable
          brandList={brandList}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </div>
  );
};

export default BrandPage;
