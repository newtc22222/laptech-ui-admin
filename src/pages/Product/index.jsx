import React, { useEffect } from 'react';
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
import { brandService, categoryService, productService } from '../../services';
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

  const handleShowDeleteModal = (productId, productName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} ${productName} khỏi hệ thống không?`,
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
      case 'edit_accessories':
        return (
          <ProductAccessoriesForm
            product={productEdit}
            brandList={brandList}
            categoryList={categoryList}
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
            className="btn btn-success fw-bold"
            onClick={() => productService.getAll(dispatch)}
          >
            {content.titleBtnReload}
          </button>
          <button
            type="button"
            className="btn btn-primary fw-bold"
            onClick={action.setCreateMode}
          >
            {content.titleBtnAdd}
          </button>
        </div>
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
        }
        handleSetUpdateLabelMode={(product, specWorkMode) =>
          action.setUpdateMode(product, specWorkMode)
        }
        handleSetUpdateAccessoriesMode={(product, specWorkMode) =>
          action.setUpdateMode(product, specWorkMode)
        }
        handleSetUpdateDiscountMode={(product, specWorkMode) =>
          action.setUpdateMode(product, specWorkMode)
        }
      />
    </>
  );
};

export default ProductPage;
