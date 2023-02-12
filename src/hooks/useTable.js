import React from "react";

/**
 * @param {string[]} headerList
 * @param {() => JSX.Element} cb_handle
 * @since 2023-02-10
 */
function useTable(headerList, cb_handle) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered border-dark table-hover table-sm">
        <thead className="bg-primary text-white">
          <tr className="text-center">
            {headerList?.map((column_name, idx) => <th key={idx}>{column_name}</th>)}
          </tr>
        </thead>
        <tbody>
          {cb_handle()}
        </tbody>
      </table>
    </div>
  );
}

export default useTable;