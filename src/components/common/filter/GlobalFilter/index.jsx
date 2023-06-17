import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ filter, setFilter, debounce, ...rest }) => {
  const [currentValue, setCurrentValue] = useState(filter);

  const handleChange = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, debounce);

  return (
    <div className="input-group">
      <span className="input-group-text">{rest.label || 'Search'}</span>
      <input
        className="form-control"
        type="text"
        placeholder={rest.placeholder || 'find something ... '}
        value={currentValue}
        onChange={e => {
          const value = e.target.value;
          setCurrentValue(value);
          handleChange(value);
        }}
      />
    </div>
  );
};

export default GlobalFilter;
