import React, { useState } from 'react';
import usePaging from './usePaging';

/**
 * @param {string[]} headerList
 * @param {object[]} dataList
 * @param {number} totalRecordData the range of data in db
 * @param {() => JSX.Element} cb_handleRow
 * @since 2023-02-10
 */
function useTable(headerList, dataList, totalRecordData, cb_handleRow) {
  const [idx_start, idx_end, cb_handlePaging] = usePaging(
    dataList.length,
    totalRecordData
  );

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered border-dark table-hover table-sm">
          <thead className="bg-primary text-white">
            <tr className="text-center">
              {headerList?.map((column_name, idx) => (
                <th key={idx}>{column_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>{cb_handleRow(idx_start, idx_end)}</tbody>
        </table>
      </div>
      {cb_handlePaging()}
    </>
  );
}

export default useTable;
