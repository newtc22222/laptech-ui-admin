import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { brandService, categoryService, productService } from '../../services';

import CheckLoginTimeout from '../../components/validation/CheckLoginTimeout';
import { ModalConfirm, PageHeader, Loading } from '../../components/common';
import ServerNotResponse from '../Error/ServerNotResponse';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const pageName = 'Sản phẩm';
const objectName = 'products';
const titleButtonAdd = 'Thêm thông tin';

const ProductPage = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: productEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: productList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  const {
    data: brandList,
    isBrandFetching,
    errorBrand
  } = useSelector(state => state['brands']);

  const {
    data: categoryList,
    isCategoryFetching,
    errorCategory
  } = useSelector(state => state['categories']);

  useEffect(() => {
    if (!productList || error) productService.getAll(dispatch);
    if (!brandList || errorBrand) brandService.getAll(dispatch);
    if (!categoryList || errorCategory) categoryService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = (productId, productName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${productName} khỏi hệ thống không?`,
      () => {
        productService.delete(dispatch, productId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

  if (isFetching || isBrandFetching || isCategoryFetching) {
    return <Loading />;
  }

  if (error || errorBrand || errorCategory) {
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
          <ProductForm
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        )}
        {workMode === WorkMode.edit && (
          <ProductForm
            product={productEdit}
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
        <ProductTable
          productList={productList}
          productTotalRecord={productList?.length || 0}
          handleSetUpdateMode={product => action.setUpdateMode(product)}
          handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
        />
      </div>
    </CheckLoginTimeout>
  );
};

export default ProductPage;
