import React from 'react';

const DateRangeFilter = ({ column: { filterValue = [], setFilter } }) => {
  return (
    <div className="hstack gap-1">
      <input
        value={filterValue[0] || ''}
        className="form-control"
        type="date"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
      />
      <span>-</span>
      <input
        value={filterValue[1] || ''}
        className="form-control"
        type="date"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? val : undefined]);
        }}
      />
    </div>
  );
};

export default DateRangeFilter;
