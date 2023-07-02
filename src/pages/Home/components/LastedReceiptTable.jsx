import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { importProductService, invoiceService } from '../../../services';
import { getCurrencyString, getStringBackTime } from '../../../utils';

const LatestedReceiptTable = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const invoiceObject = useSelector(state => state['invoices']);
  const importsObject = useSelector(state => state['imports']);

  const [tableData, setTableData] = useState([]);

  const handleUpdateTableData = () => {
    console.log(importsObject.data);
    console.log(invoiceObject.data);
    const data = [];
    importsObject.data.forEach(importProduct => {
      const row = {
        id: importProduct.id,
        type: 'Nhập hàng',
        quantity: importProduct.quantity,
        totalPrice: importProduct.importedPrice * importProduct.quantity,
        createdDate: importProduct.createdDate,
        modifiedDate: importProduct.modifiedDate
      };
      data.push(row);
    });
    invoiceObject.data.forEach(invoice => {
      const row = {
        id: invoice.id,
        type: 'Bán hàng',
        quantity: invoice.paymentAmount,
        totalPrice: invoice.paymentTotal,
        createdDate: invoice.createdDate,
        modifiedDate: invoice.modifiedDate
      };
      data.push(row);
    });
    data
      .sort(
        (r1, r2) =>
          new Date(r1.modifiedDate).getTime() -
          new Date(r2.modifiedDate).getTime()
      )
      .reverse();
    setTableData(data);
  };

  useEffect(() => {
    if (!importsObject.data) importProductService.getAll(dispatch, accessToken);
  }, [importsObject.data, dispatch, accessToken]);

  useEffect(() => {
    if (!invoiceObject.data) invoiceService.getAll(dispatch, accessToken);
  }, [invoiceObject.data, dispatch, accessToken]);

  useEffect(() => {
    if (!!importsObject.data && !!invoiceObject.data) handleUpdateTableData();
  }, [importsObject, invoiceObject, dispatch, accessToken]);

  return (
    <div className="p-3 border rounded">
      <h5 className="text-uppercase text-center">
        {'Danh sách đơn hàng gần đây'}
      </h5>
      <table className="table table-hover table-bordered table-striped table-responsive">
        <thead className="table-info">
          <tr>
            <th>Mã phiếu</th>
            <th>Loại phiếu</th>
            <th>Số lượng hàng</th>
            <th>Tổng giá trị</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {tableData.slice(0, 10).map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.quantity}</td>
                <td>{getCurrencyString(row.totalPrice, 'vi-VN', 'VND')}</td>
                <td>{getStringBackTime(row.createdDate)}</td>
                <td>{getStringBackTime(row.modifiedDate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(LatestedReceiptTable);
