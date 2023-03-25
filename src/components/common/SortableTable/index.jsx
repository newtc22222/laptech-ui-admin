import Table from '../Table';
import useSort from '../../../hooks/useSort';

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <i class="bi bi-arrow-down-up"></i>
      </div>
    );
  }

  switch (sortOrder) {
    case 'asc':
      return (
        <div>
          <i class="bi bi-arrow-up"></i>
        </div>
      );
    case 'desc':
      return (
        <div>
          <i class="bi bi-arrow-down"></i>
        </div>
      );
    default:
      return (
        <div>
          <i class="bi bi-arrow-down-up"></i>
        </div>
      );
  }
}

function SortableTable({ data, config, keyFn, ...props }) {
  const { config, data } = props;
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
          style={{ cursor: 'pointer' }}
          onClick={() => setSortColumn(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
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
