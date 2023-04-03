import React, { useState } from 'react';

const lockRowIcon = {
  true: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-lock-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
  ),
  false: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-unlock-fill"
      viewBox="0 0 16 16"
    >
      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
    </svg>
  )
};

const TableRow = ({ item, handleChangeValue, handleRemoveLine }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <tr>
      <td>
        <input
          className="w-100 border-0"
          type="text"
          defaultValue={item.attribute}
          disabled={disabled}
          onChange={e => handleChangeValue(e, 'attribute', item)}
        />
      </td>
      <td>
        <input
          className="w-100 border-0"
          type="text"
          defaultValue={item.value}
          disabled={disabled}
          onChange={e => handleChangeValue(e, 'value', item)}
        />
      </td>
      <td>
        <div className="d-flex gap-1 justify-content-evenly">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setDisabled(!disabled)}
          >
            {lockRowIcon[disabled]}
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            disabled={disabled}
            onClick={() => handleRemoveLine(item.index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
