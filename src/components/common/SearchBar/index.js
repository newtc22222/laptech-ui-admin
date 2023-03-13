import React, { useState } from 'react';
import _ from 'lodash';

import './SearchBar.css';

const SearchBar = ({ list_item }) => {
  const [text, setText] = useState('');

  let itemFilter;
  if (text !== '') {
    itemFilter = _.filter(list_item, o => o.name?.toLowerCase().includes(text));
  }

  const handleFilter = e => {
    const searchText = e.target.value.trim().toLowerCase();
    setText(searchText);
  };

  return (
    <div className="dropdown d-flex justify-content-center">
      <input
        className="dropdown-toggle"
        onChange={handleFilter}
        type="text"
        id="dropdownMenuBtn"
        data-bs-toggle="dropdown"
        // aria-expanded="false"
      />
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuBtn"
        style={{ maxHeight: '80vh', overflow: 'auto' }}
      >
        {itemFilter?.map(o => {
          return (
            <li key={o.name}>
              <a className="dropdown-item" href={'#' + o.id}>
                {o.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
