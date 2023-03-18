import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiProducts from '../../apis/product/product.api';

import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';
import DescriptionBox from './ProductEditBox/DescriptionBox';

const pageName = 'Sản phẩm';
const objectName = 'products';
const titleButtonAdd = 'Thêm thông tin';

const ProductPage = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    Navigate,
    workMode,
    showModal,
    productEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  const { productList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  // Loading
  useEffect(() => {
    if (!productList) apiProducts.getAllProducts(dispatch);
  }, []);

  // Show delete modal
  const handleShowDeleteModal = (productId, productName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${productName} khỏi hệ thống không?`,
      () => {
        apiProducts.deleteProduct(dispatch, productId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

  if (isFetching) {
    return <Loading />;
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
        <ProductForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <ProductForm
          product={productEdit}
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
    </div>
  );
};

export default ProductPage;
