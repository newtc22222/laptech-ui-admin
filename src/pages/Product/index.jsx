import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import {
  ProductAccessoriesForm,
  ProductDiscountForm,
  ProductImageForm,
  ProductLabelForm
} from './components';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';
import {
  brandService,
  categoryService,
  exportService,
  productService
} from '../../services';
import content from './content';

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
  } = useSelector(state => state['products']);

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

  const handleShowDeleteModal = useCallback((productId, productName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} ${productName} khỏi hệ thống không?`,
      () => {
        productService.delete(dispatch, productId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  const handleSetUpdateMode = useCallback(
    (product, specWorkMode) => action.setUpdateMode(product, specWorkMode),
    []
  );

  const handleBack = useCallback(
    () => action.changeWorkMode(WorkMode.view),
    []
  );

  const handleFetchProduct = useCallback(
    () => productService.getAll(dispatch),
    [dispatch]
  );

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
            handleBack={handleBack}
          />
        );
      case WorkMode.edit:
        return (
          <ProductForm
            brandList={brandList}
            categoryList={categoryList}
            product={productEdit}
            handleBack={handleBack}
          />
        );
      case 'edit_image':
        return (
          <ProductImageForm product={productEdit} handleBack={handleBack} />
        );
      case 'edit_label':
        return (
          <ProductLabelForm product={productEdit} handleBack={handleBack} />
        );
      case 'edit_accessories':
        return (
          <ProductAccessoriesForm
            product={productEdit}
            brandList={brandList}
            categoryList={categoryList}
            handleBack={handleBack}
          />
        );
      case 'edit_discount':
        return (
          <ProductDiscountForm product={productEdit} handleBack={handleBack} />
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {renderFormModal()}
      <PageHeader pageName={content.pageName}>
        <div className="d-flex flex-row gap-2">
          <button
            type="button"
            className="btn btn-outline-success fw-bold"
            onClick={handleFetchProduct}
          >
            {content.titleBtnReload}
          </button>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-primary fw-bold"
              onClick={() =>
                exportService.csv(accessToken, dispatch, 'products')
              }
              disabled={
                isFetching ||
                isBrandFetching ||
                isCategoryFetching ||
                !productList ||
                !brandList ||
                !categoryList ||
                error ||
                errorBrand ||
                errorCategory
              }
            >
              {content.titleBtnExport}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary fw-bold"
              onClick={action.setCreateMode}
              disabled={
                isFetching ||
                isBrandFetching ||
                isCategoryFetching ||
                !productList ||
                !brandList ||
                !categoryList ||
                error ||
                errorBrand ||
                errorCategory
              }
            >
              {content.titleBtnAdd}
            </button>
          </div>
        </div>
      </PageHeader>
      {isFetching ||
      isBrandFetching ||
      isCategoryFetching ||
      !productList ||
      !brandList ||
      !categoryList ? (
        <Loading />
      ) : (
        <ProductTable
          brandList={brandList}
          categoryList={categoryList}
          productList={productList}
          productTotalRecord={productList?.length || 0}
          handleShowDeleteModal={handleShowDeleteModal}
          handleSetUpdateMode={handleSetUpdateMode}
          handleSetUpdateImageMode={handleSetUpdateMode}
          handleSetUpdateLabelMode={handleSetUpdateMode}
          handleSetUpdateAccessoriesMode={handleSetUpdateMode}
          handleSetUpdateDiscountMode={handleSetUpdateMode}
        />
      )}
    </>
  );
};

export default ProductPage;
