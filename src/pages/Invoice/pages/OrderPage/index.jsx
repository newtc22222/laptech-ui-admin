import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalOption, TabList } from '../../../../components/common';

import InvoiceTable from './InvoiceTable';
import ItemBox from './ItemBox';
import content from './content';

import invoiceList from '../../../../samples/invoice';

const Invoice = () => {
  const tabStatusList = Object.keys(content.status);
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState(null);

  const configData = tabStatusList.map(tab => {
    const invoiceListOfTab = invoiceList.filter(i => i.orderStatus === tab);
    return {
      key: tab.toLowerCase(),
      title: content.status[tab],
      quantity: invoiceList.filter(i => i.orderStatus === tab).length,
      body: (
        <InvoiceTable
          invoiceList={invoiceListOfTab}
          setItemList={setItemList}
          setShowModal={setShowModal}
        />
      )
    };
  });

  function renderOption() {
    const status = itemList?.orderStatus;
    const otherStatus = () => {
      switch (status) {
        case 'PENDING':
          return (
            <>
              <button className="btn btn-primary">
                {content.changeStatus['CONFIRMED']}
              </button>
              <button className="btn btn-danger">
                {content.changeStatus['REJECTED']}
              </button>
            </>
          );
        case 'WAIT_CONFIRMED':
          return (
            <>
              <button className="btn btn-primary">
                {content.changeStatus['PREPARED']}
              </button>
              <button className="btn btn-danger">
                {content.changeStatus['REJECTED']}
              </button>
            </>
          );
        case 'PREPARED':
          return (
            <>
              <button className="btn btn-primary">
                {content.changeStatus['SHIPPED']}
              </button>
              <button className="btn btn-danger">
                {content.changeStatus['REJECTED']}
              </button>
            </>
          );
        case 'SHIPPED':
          return (
            <>
              <button className="btn btn-success">
                {content.changeStatus['RECEIVED']}
              </button>
              <button className="btn btn-warning">
                {content.changeStatus['CANCELED']}
              </button>
              <button className="btn btn-danger">
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
        renderOption={renderOption()}
      >
        <ItemBox data={itemList} />
      </ModalOption>
      <TabList configData={configData} />
    </div>
  );
};

export default Invoice;
