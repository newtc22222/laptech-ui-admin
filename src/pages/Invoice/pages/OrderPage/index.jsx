import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalOption, TabList } from '../../../../components/common';

import InvoiceTable from './InvoiceTable';
import ItemBox from './ItemBox';
import content from './content';

import hardInvoiceList from '../../../../samples/hardInvoiceList';

const Invoice = () => {
  const tabStatusList = Object.keys(content.status);
  const [showModal, setShowModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState(hardInvoiceList);
  const [invoice, setInvoice] = useState(null);

  const configData = tabStatusList.map(tab => {
    const invoiceListOfTab = invoiceList.filter(i => i.orderStatus === tab);
    return {
      key: tab.toLowerCase(),
      title: content.status[tab],
      quantity: invoiceList.filter(i => i.orderStatus === tab).length,
      body: (
        <InvoiceTable
          invoiceList={invoiceListOfTab}
          setInvoice={setInvoice}
          setShowModal={setShowModal}
        />
      )
    };
  });

  function renderOption(item) {
    const status = item?.orderStatus;

    function changeStatus(newStatus) {
      setInvoiceList(prev =>
        prev.map(i => {
          if (i.id === item.id) {
            return { ...i, orderStatus: newStatus };
          }
          return i;
        })
      );
      setShowModal(false);
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
    <div className="mt-2">
      <ModalOption
        className="modal-xl"
        show={showModal}
        setShow={setShowModal}
        title={content.invoice}
        titleCancel="Trở lại"
        renderOption={renderOption(invoice)}
      >
        <ItemBox data={invoice} />
      </ModalOption>
      <TabList configData={configData} />
    </div>
  );
};

export default Invoice;
