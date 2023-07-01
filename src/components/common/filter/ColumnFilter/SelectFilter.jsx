import React from 'react';

const SelectFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
  ...rest
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <div>
      <select
        className="border rounded w-100 pt-1 pb-2 px-1"
        value={filterValue}
        onChange={e => setFilter(e.target.value || undefined)}
      >
        <option value="">{rest.label?.all || 'ALL'}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
