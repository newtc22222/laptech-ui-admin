import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { brandService, categoryService, productService } from '../../services';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import {
  ProductDiscountForm,
  ProductImageForm,
  ProductLabelForm
} from './components';

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

  function renderFormModal() {
    switch (workMode) {
      case WorkMode.create:
        return (
          <ProductForm
            brandList={brandList}
            categoryList={categoryList}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      case WorkMode.edit:
        return (
          <ProductForm
            brandList={brandList}
            categoryList={categoryList}
            product={productEdit}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      case 'edit_image':
        return (
          <ProductImageForm
            product={productEdit}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      case 'edit_label':
        return (
          <ProductLabelForm
            product={productEdit}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      case 'edit_discount':
        return (
          <ProductDiscountForm
            product={productEdit}
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <div>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {renderFormModal()}
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
      <ProductTable
        brandList={brandList}
        categoryList={categoryList}
        productList={productList}
        productTotalRecord={productList?.length || 0}
        handleSetUpdateMode={product => action.setUpdateMode(product)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
        handleSetUpdateImageMode={(product, specWorkMode) =>
          action.setUpdateMode(product, specWorkMode)
        } // update
        handleSetUpdateLabelMode={(product, specWorkMode) =>
          action.setUpdateMode(product, specWorkMode)
        } // update
        handleSetUpdateDiscountMode={(product, specWorkMode) =>
          action.setUpdateMode(product, specWorkMode)
        } // update
      />
    </div>
  );
};

export default ProductPage;
