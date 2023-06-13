import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { discountService } from '../../services';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import DiscountTable from './DiscountTable';
import DiscountForm from './DiscountForm';

const pageName = 'Mã chiết khấu sản phẩm';
const objectName = 'discounts';
const titleButtonAdd = 'Thêm thông tin';

/**
 * @since 2023-02-13
 */
const Discount = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: discountEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: discountList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  useEffect(() => {
    if (!discountList || error) discountService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((discountId, discountCode) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${discountCode} khỏi hệ thống không?`,
      () => {
        discountService.delete(dispatch, discountId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  const handleBack = useCallback(
    () => action.changeWorkMode(WorkMode.view),
    []
  );

  const handleSetUpdateMode = useCallback(
    category => action.setUpdateMode(category),
    []
  );

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {workMode === WorkMode.create && <DiscountForm handleBack={handleBack} />}
      {workMode === WorkMode.edit && (
        <DiscountForm discount={discountEdit} handleBack={handleBack} />
      )}
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </PageHeader>
      {!discountList || isFetching ? (
        <Loading />
      ) : (
        <DiscountTable
          discountList={discountList}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </div>
  );
};

export default Discount;
