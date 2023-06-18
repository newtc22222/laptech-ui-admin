import React, { useState } from 'react';
import _ from 'lodash';

const BoxChoice = ({
  options,
  selected,
  setSelected,
  useLabelButton = false
}) => {
  const [filter, setFilter] = useState('');

  const handleSetSelected = e => {
    const itemId =
      typeof options[0].id === 'number'
        ? Number(e.target.value)
        : e.target.value;

    setSelected(prev => {
      const existedItem = prev.find(item => item?.id === itemId);

      if (!existedItem) {
        const newItem = options.find(item => item.id === itemId);
        return [...prev, newItem];
      }
      return prev.filter(item => item.id !== existedItem.id);
    });
  };

  return (
    <div
      className="col col-5 rounded border border-dark py-2 d-flex flex-column gap-2"
      style={{ maxHeight: '65vh', overflowY: 'auto' }}
    >
      <input
        type="search"
        className="form-control"
        onChange={e => setFilter(e.target.value)}
      />
      <div className="d-flex flex-column gap-2">
        {options
          .filter(item =>
            item.value.toLowerCase().includes(filter.toLowerCase())
          )
          .map(item => {
            return useLabelButton ? (
              <div className="d-flex" key={item.id}>
                <input
                  type="checkbox"
                  className="btn-check"
                  id={'check-' + item.id}
                  value={item.id}
                  checked={!!selected.find(select => select.id === item.id)}
                  onChange={handleSetSelected}
                />
                <label
                  className="btn btn-outline-primary flex-fill text-start"
                  htmlFor={'check-' + item.id}
                >
                  {item.render || item.value}
                </label>
              </div>
            ) : (
              <div className="form-check" key={item.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={'check-' + item.id}
                  value={item.id}
                  checked={!!selected.find(select => select.id === item.id)}
                  onChange={handleSetSelected}
                />
                <label
                  className="form-check-label"
                  htmlFor={'check-' + item.id}
                >
                  {item.render || item.value}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(BoxChoice);
