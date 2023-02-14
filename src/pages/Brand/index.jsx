import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiBrands from '../../apis/product/brand.api';

import BrandTable from './BrandTable';
import BrandForm from './BrandForm';

import ModalCustom from '../../components/Modal';
import Loading from '../../components/common/Loading';

const pageName = 'Thương hiệu';
const objectName = 'brands';
const titleButtonAdd = 'Thêm thông tin';

const BrandPage = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    navigate,
    workMode,
    showModal,
    brandEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    navigate('/auth/login');

  const { brandList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  // Loading
  useEffect(() => {
    apiBrands.getAllBrands(dispatch);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = useCallback((brandId, brandName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${brandName} khỏi hệ thống không?`,
      () => {
        apiBrands.deleteBrand(dispatch, brandId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  // Change work mode
  if (workMode === WorkMode.create) {
    return (
      <BrandForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
    );
  }
  if (workMode === WorkMode.edit) {
    return (
      <BrandForm
        brand={brandEdit}
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
      <BrandTable
        brandList={brandList}
        handleSetUpdateMode={brand => action.setUpdateMode(brand)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default BrandPage;
