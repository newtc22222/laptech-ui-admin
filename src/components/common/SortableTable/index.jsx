import React from 'react';

import Table from '../Table';
import useSort from '../../../hooks/useSort';

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <i className="bi bi-arrow-down-up"></i>
      </div>
    );
  }

  switch (sortOrder) {
    case 'asc':
      return <i className="bi bi-arrow-up"></i>;

    case 'desc':
      return <i className="bi bi-arrow-down"></i>;

    default:
      return <i className="bi bi-arrow-down-up"></i>;
  }
}

function SortableTable({ data, config, keyFn, ...props }) {
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    config
  );

  const updatedConfig = config.map(column => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          style={{
            cursor: 'pointer',
            backgroundColor: column.label === sortBy && '#0E4893'
          }}
          onClick={() => setSortColumn(column.label)}
        >
          <div className="d-flex justify-content-between ps-2 pe-1">
            {column.label}
            {getIcons(column.label, sortBy, sortOrder)}
          </div>
        </th>
      )
    };
  });

  return (
    <Table {...props} data={sortedData} config={updatedConfig} keyFn={keyFn} />
  );
}

export default SortableTable;