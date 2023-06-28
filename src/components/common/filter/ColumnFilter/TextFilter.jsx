import React from 'react';

const TextFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <div className="input-group">
      <input
        className="form-control"
        value={filterValue}
        onChange={e => setFilter(e.target.value || undefined)}
      />
    </div>
  );
};

export default TextFilter;
