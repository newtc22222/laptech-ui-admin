import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import apiBrand from '../../apis/product/brand.api';

import CheckLoginTimeout from '../../components/validation/CheckLoginTimeout';
import ModalConfirm from '../../components/common/ModalConfirm';
import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';
import BrandForm from './BrandForm';
import BrandTable from './BrandTable';

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
    if (!brandList || error) apiBrand.getAll(dispatch);
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
    <CheckLoginTimeout>
      <div>
        {showModal && (
          <ModalConfirm
            show={showModal}
            setShow={action.showModal}
            {...modalValue}
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
        <PageHeader pageName={pageName}>
          <button
            className="btn btn-primary fw-bold"
            onClick={action.setCreateMode}
          >
            {titleButtonAdd}
          </button>
        </PageHeader>
        <BrandTable
          brandList={brandList}
          brandTotalRecord={brandList?.length}
          handleSetUpdateMode={brand => action.setUpdateMode(brand)}
          handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
        />
      </div>
    </CheckLoginTimeout>
  );
};

export default BrandPage;
