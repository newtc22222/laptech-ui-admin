import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';

import apiBrand from '../../apis/product/brand.api';

import BrandTable from './BrandTable';
import BrandForm from './BrandForm';
import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';

const pageName = 'Thương hiệu';
const objectName = 'brands';
const titleButtonAdd = 'Thêm thông tin';

const BrandPage = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    Navigate,
    workMode,
    showModal,
    brandEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  const {
    data: brandList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  // Loading
  useEffect(() => {
    if (!brandList) apiBrand.getAll(dispatch);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = (brandId, brandName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${brandName} khỏi hệ thống không?`,
      () => {
        apiBrand.delete(dispatch, brandId, accessToken);
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
        <BrandForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <BrandForm
          brand={brandEdit}
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
      <BrandTable
        brandList={brandList}
        brandTotalRecord={brandList?.length}
        handleSetUpdateMode={brand => action.setUpdateMode(brand)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default BrandPage;
