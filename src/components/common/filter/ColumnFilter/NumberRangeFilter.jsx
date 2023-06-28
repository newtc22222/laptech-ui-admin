import React, { useMemo } from 'react';

const NumberRangeFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className="hstack gap-1">
      <input
        value={filterValue[0] || ''}
        className="form-control"
        style={{
          minWidth: '70px'
        }}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={min}
        min={min}
        max={max}
      />
      <span>-</span>
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
        placeholder={max}
        min={min}
        max={max}
      />
    </div>
  );
};

export default NumberRangeFilter;
