import React, { Fragment } from 'react';

import usePaging from '../../../hooks/usePaging';
import classNames from 'classnames';

/**
 * @param {{data: object[], config: object[], keyFn: () => {}}} param0
 * @returns
 */
function Table({ data, config, keyFn, ...props }) {
  const [idx_start, idx_end, Paging] = usePaging(
    data.length,
    props.totalRecordData
  );

  const renderedHeaders = config.map(column => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.slice(idx_start, idx_end).map(rowData => {
    const renderedCells = config.map(column => {
      return (
        <td
          className={classNames(column.className)}
          style={column.style}
          key={column.label}
        >
          {column.render(rowData)}
        </td>
      );
    });

    return <tr key={keyFn(rowData)}>{renderedCells}</tr>;
  });

  return (
    <>
      <div>
        <table className="table table-bordered border-dark table-hover table-sm">
          <thead className="bg-primary text-white">
            <tr className="text-center text-uppercase">{renderedHeaders}</tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>
      </div>
      <Paging />
    </>
  );
}

export default Table;
