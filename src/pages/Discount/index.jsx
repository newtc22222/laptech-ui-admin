import React, { useEffect } from 'react';
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

  const handleShowDeleteModal = (discountId, discountCode) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${discountCode} khỏi hệ thống không?`,
      () => {
        discountService.delete(dispatch, discountId, accessToken);
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

  function renderFormModal() {
    switch (workMode) {
      case WorkMode.create:
        return (
          <DiscountForm
            handleBack={() => action.changeWorkMode(WorkMode.view)}
          />
        );
      case WorkMode.edit:
        return (
          <DiscountForm
            discount={discountEdit}
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
      <DiscountTable
        discountList={discountList}
        discountTotalRecord={discountList?.length}
        handleSetUpdateMode={discount => action.setUpdateMode(discount)}
        handleShowDeleteModal={(id, code) => handleShowDeleteModal(id, code)}
      />
    </div>
  );
};

export default Discount;
