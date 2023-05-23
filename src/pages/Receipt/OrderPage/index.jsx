import React, { useEffect } from 'react';
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
import { invoiceService } from '../../../services';
import { getUpdateByUserInSystem, makeToast, toastType } from '../../../utils';
import content from './content';

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

  useEffect(() => {
    invoiceService.getAll(dispatch, accessToken);
  }, [dispatch, accessToken]);

  if (!invoiceList || isFetching) return <Loading />;
  if (error) return <ServerNotResponse />;

  const handleShowDeleteModal = invoiceId => {
    action.addModalValue(
      `Xác nhận xoá ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} có mã ${invoiceId} khỏi hệ thống không?`,
      () => {
        invoiceService.delete(dispatch, invoiceId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

  const configData = Object.keys(content.status).map(tab => {
    const invoiceListOfTab = invoiceList?.filter(i => i.orderStatus === tab);
    return {
      key: tab.toLowerCase(),
      title: content.status[tab],
      quantity: invoiceList.filter(i => i.orderStatus === tab).length,
      body: (
        <InvoiceTable
          invoiceList={invoiceListOfTab}
          handleSetUpdateMode={invoice => action.setUpdateMode(invoice)}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )
    };
  });

  function renderOption(item) {
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
                onClick={() => changeStatus('WAIT_CONFIRMED')}
              >
                {content.changeStatus['CONFIRMED']}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => changeStatus('IGNORED')}
              >
                {content.changeStatus['REJECTED']}
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

    return <div className="d-flex gap-2">{otherStatus()}</div>;
  }

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
          handleBack={() => action.changeWorkMode(WorkMode.view)}
          renderOption={renderOption(invoiceEdit)}
        >
          <ItemBox data={invoiceEdit} />
        </ModalOption>
      )}
      <PageHeader pageName={content.pageName}>
        <div className="d-flex gap-2">
          <CountdownRefresh
            isPause
            countdownTime={1000 * 20}
            handleChange={() => invoiceService.getAll(dispatch, accessToken)}
          />
          <button
            type="button"
            onClick={() => invoiceService.getAll(dispatch, accessToken)}
            className="btn btn-primary"
          >
            {content.titleBtnReload}
          </button>
        </div>
      </PageHeader>
      <TabList configData={configData} />
    </div>
  );
};

export default Invoice;