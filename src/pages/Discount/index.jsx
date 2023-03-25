import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';

import apiDiscount from '../../apis/product/discount.api';

import DiscountTable from './DiscountTable';
import DiscountForm from './DiscountForm';
import ModalConfirm from '../../components/common/ModalConfirm';
import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ServerNotResponse from '../Error/ServerNotResponse';

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

  const {
    data: discountList,
    isFetching,
    error
  } = useSelector(state => state[objectName]);

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  useEffect(() => {
    if (!discountList) apiDiscount.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = (discountId, discountName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${discountName} khỏi hệ thống không?`,
      () => {
        apiDiscount.delete(dispatch, discountId, accessToken);
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
    <div>
      {showModal && (
        <ModalConfirm
          show={showModal}
          setShow={action.showModal}
          props={modalValue}
        />
      )}
      {workMode === WorkMode.create && (
        <DiscountForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <DiscountForm
          discount={discountEdit}
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
      <DiscountTable
        discountList={discountList}
        discountTotalRecord={discountList?.length}
        handleSetUpdateMode={discount => action.setUpdateMode(discount)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default Discount;
