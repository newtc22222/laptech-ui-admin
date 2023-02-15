import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiDiscount from '../../apis/product/discount.api';

import DiscountTable from './DiscountTable';
import DiscountForm from './DiscountForm';

import ModalCustom from '../../components/Modal';
import Loading from '../../components/common/Loading';

const pageName = 'Mã chiết khấu sản phẩm';
const objectName = 'discounts';
const titleButtonAdd = 'Thêm thông tin';

/**
 * @since 2023-02-13
 */
const Discount = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    Navigate,
    workMode,
    showModal,
    discountEdit,
    modalValue,
    action
  ] = useWorkspace();

  const { discountList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  useEffect(() => {
    apiDiscount.getAllDiscounts(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((discountId, discountName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${discountName} khỏi hệ thống không?`,
      () => {
        apiDiscount.deleteDiscount(dispatch, discountId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  // Change work mode
  if (workMode === WorkMode.create) {
    return (
      <DiscountForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
    );
  }
  if (workMode === WorkMode.edit) {
    return (
      <DiscountForm
        discount={discountEdit}
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
      <DiscountTable
        discountList={discountList}
        handleSetUpdateMode={discount => action.setUpdateMode(discount)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default Discount;
