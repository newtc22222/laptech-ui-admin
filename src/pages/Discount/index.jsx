import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import DiscountTable from './DiscountTable';
import DiscountForm from './DiscountForm';

import { discountService, exportService } from '../../services';

import content from './content';

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
  } = useSelector(state => state['discounts']);

  useEffect(() => {
    if (!discountList || error) discountService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((discountId, discountCode) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} ${discountCode} khỏi hệ thống không?`,
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
    discount => action.setUpdateMode(discount),
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
      <DiscountForm
        show={workMode === WorkMode.create}
        handleBack={handleBack}
      />
      <DiscountForm
        show={workMode === WorkMode.edit}
        discount={discountEdit}
        handleBack={handleBack}
      />
      <PageHeader pageName={content.pageName}>
        <div className="btn-group" role="group">
          <button
            className="btn btn-outline-primary fw-bold"
            onClick={() =>
              exportService.csv(accessToken, dispatch, 'discounts')
            }
            disabled={!discountList || isFetching}
          >
            {content.titleBtnExport}
          </button>
          <button
            className="btn btn-outline-primary fw-bold"
            onClick={action.setCreateMode}
            disabled={!discountList || isFetching}
          >
            {content.titleBtnAdd}
          </button>
        </div>
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
