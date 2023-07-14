import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import {
  CountdownRefresh,
  Loading,
  ModalConfirm,
  ModalOption,
  PageHeader,
  ServerNotResponse,
  TabList
} from '../../../components/common';
import { InvoiceTable, ItemBox } from './components';

import useWorkspace, { WorkMode } from '../../../hooks/useWorkspace';
import { exportService, invoiceService, userService } from '../../../services';
import { getUpdateByUserInSystem, makeToast, toastType } from '../../../utils';
import content from './content';

const countdownTime = 20 * 1000;

const Invoice = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: invoiceEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: invoiceList,
    isFetching,
    error
  } = useSelector(state => state['invoices']);
  const {
    data: userList,
    isUserFetching,
    isUserError
  } = useSelector(state => state['users']);

  useEffect(() => {
    if (!userList || isUserError) userService.getAll(dispatch, accessToken);
    invoiceService.getAll(dispatch, accessToken);
  }, [dispatch, accessToken]);

  const handleGetAllInvoice = useCallback(
    () => invoiceService.getAll(dispatch, accessToken),
    [dispatch, accessToken]
  );

  const handleShowDeleteModal = useCallback(
    invoiceId => {
      action.addModalValue(
        `Xác nhận xoá ${content.pageName.toLowerCase()}`,
        `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} có mã ${invoiceId} khỏi hệ thống không?`,
        () => {
          invoiceService.delete(dispatch, invoiceId, accessToken);
          action.showModal(false);
        }
      );
      action.showModal(true);
    },
    [dispatch, accessToken]
  );

  const handleBack = useCallback(
    () => action.changeWorkMode(WorkMode.view),
    []
  );

  const configData = useMemo(
    () =>
      Object.keys(content.status).map(tab => {
        const invoiceListOfTab = invoiceList?.filter(
          i => i.orderStatus === tab
        );
        return {
          key: tab.toLowerCase(),
          title: content.status[tab],
          quantity:
            invoiceList?.filter(i => i.orderStatus === tab)?.length || 0,
          body: (
            <InvoiceTable
              invoiceList={invoiceListOfTab}
              userList={userList}
              handleSetUpdateMode={invoice => action.setUpdateMode(invoice)}
              handleShowDeleteModal={handleShowDeleteModal}
            />
          )
        };
      }),
    [invoiceList]
  );

  const renderOption = item => {
    const status = item?.orderStatus;

    function changeStatus(newStatus) {
      if (invoiceEdit.status === newStatus) {
        makeToast(content.changeStatus.nothing, toastType.info);
        return;
      }

      if (newStatus === 'RECEIVED') {
        invoiceService.update(
          dispatch,
          {
            ...invoiceEdit,
            orderStatus: newStatus,
            isPaid: true,
            ...getUpdateByUserInSystem()
          },
          invoiceEdit.id,
          accessToken
        );
      } else {
        invoiceService.updateStatus(
          dispatch,
          {
            orderStatus: newStatus,
            ...getUpdateByUserInSystem()
          },
          invoiceEdit.id,
          accessToken
        );
      }
      action.changeWorkMode(WorkMode.view);
    }

    const otherStatus = () => {
      switch (status) {
        case 'PENDING':
          return (
            <>
              <button
                className="btn btn-primary"
                disabled={!item.isPaid}
                onClick={() => changeStatus('PREPARED')}
              >
                {content.changeStatus['PREPARED']}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => changeStatus('CANCELED')}
              >
                {content.changeStatus['CANCELED']}
              </button>
            </>
          );
        case 'WAIT_CONFIRMED':
          return (
            <>
              <button
                className="btn btn-primary"
                onClick={() => changeStatus('PREPARED')}
              >
                {content.changeStatus['PREPARED']}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => changeStatus('IGNORED')}
              >
                {content.changeStatus['REJECTED']}
              </button>
            </>
          );
        case 'PREPARED':
          return (
            <>
              <button
                className="btn btn-primary"
                onClick={() => changeStatus('SHIPPED')}
              >
                {content.changeStatus['SHIPPED']}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => changeStatus('IGNORED')}
              >
                {content.changeStatus['REJECTED']}
              </button>
            </>
          );
        case 'SHIPPED':
          return (
            <>
              <button
                className="btn btn-success"
                onClick={() => changeStatus('RECEIVED')}
              >
                {content.changeStatus['RECEIVED']}
              </button>
              <button
                className="btn btn-warning"
                onClick={() => changeStatus('CANCELED')}
              >
                {content.changeStatus['CANCELED']}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => changeStatus('FAILED')}
              >
                {content.changeStatus['FAILED']}
              </button>
            </>
          );
        default:
          return <></>;
      }
    };
    return (
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            if (item) exportService.pdf(accessToken, dispatch, item.id);
          }}
          disabled={!item}
        >
          In hoá đơn
        </button>
        {otherStatus()}
      </div>
    );
  };

  if (error || isUserError) return <ServerNotResponse />;

  return (
    <div>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {workMode === WorkMode.edit && (
        <ModalOption
          className="modal-xl"
          title={content.invoice}
          titleCancel="Trở lại"
          handleBack={handleBack}
          renderOption={renderOption(invoiceEdit)}
        >
          <ItemBox
            data={invoiceEdit}
            user={invoiceEdit && _.find(userList, { id: invoiceEdit.userId })}
          />
        </ModalOption>
      )}
      <PageHeader pageName={content.pageName}>
        <div className="d-flex gap-2">
          <CountdownRefresh
            isPause
            countdownTime={countdownTime}
            handleChange={handleGetAllInvoice}
          />
          <button
            type="button"
            onClick={handleGetAllInvoice}
            className="btn btn-primary"
            disabled={
              !invoiceList ||
              isFetching ||
              error ||
              !userList ||
              isUserFetching ||
              isUserError
            }
          >
            {content.titleBtnReload}
          </button>
          <button
            type="button"
            onClick={() => exportService.csv(accessToken, dispatch, 'invoices')}
            className="btn btn-primary"
            disabled={
              !invoiceList ||
              isFetching ||
              error ||
              !userList ||
              isUserFetching ||
              isUserError
            }
          >
            {content.titleBtnExport}
          </button>
        </div>
      </PageHeader>
      {!invoiceList || isFetching || isUserFetching || !userList ? (
        <Loading />
      ) : (
        <TabList configData={configData} />
      )}
    </div>
  );
};

export default Invoice;
