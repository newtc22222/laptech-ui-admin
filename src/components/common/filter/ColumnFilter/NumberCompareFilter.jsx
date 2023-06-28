import React, { useEffect, useMemo } from 'react';

const compareKey = ['>=', '==', '<='];

const NumberRangeFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) => {
  useEffect(() => setFilter([compareKey[0], undefined]), []);

  const max = useMemo(() => {
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      max = Math.max(row.values[id], max);
    });
    return max;
  }, []);

  return (
    <div className="hstack gap-1">
      <select
        className="form-select"
        style={{ minWidth: '70px' }}
        onChange={e => setFilter((old = []) => [e.target.value, old[1]])}
      >
        {compareKey.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        value={filterValue[1] || ''}
        className="form-control"
        style={{ minWidth: '70px' }}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        max={max}
      />
    </div>
  );
};

export default NumberRangeFilter;
