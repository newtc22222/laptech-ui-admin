import React from 'react';
import usePaging from '../../../hooks/usePaging';

/**
 * @param {{
 *  headerList: string[],
 *  dataList: object[],
 *  totalRecordData: number,
 *  cb_handleRow: (idx_start: number, idx_end: number) => JSX.Element
 * }}
 * @since 2023-02-10
 */
function SoftTable({ headerList, dataList, totalRecordData, cb_handleRow }) {
  const [idx_start, idx_end, Paging] = usePaging(
    dataList.length,
    totalRecordData
  );

  return (
    <>
      <div className="table-reponsive">
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
      <Paging />
    </>
  );
}

export default SoftTable;
