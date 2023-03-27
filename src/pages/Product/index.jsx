import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import apiBrand from '../../apis/product/brand.api';
import apiCategory from '../../apis/product/category.api';
import apiProduct from '../../apis/product/product.api';

import CheckLoginTimeout from '../../components/validation/CheckLoginTimeout';
import PageHeader from '../../components/common/PageHeader';
import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';
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
    if (!productList || error) apiProduct.getAll(dispatch);
    if (!brandList || errorBrand) apiBrand.getAll(dispatch);
    if (!categoryList || errorCategory) apiCategory.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = (productId, productName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${productName} khỏi hệ thống không?`,
      () => {
        apiProduct.delete(dispatch, productId, accessToken);
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
