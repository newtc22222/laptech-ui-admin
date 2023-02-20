import React, { useState } from 'react';
import getPagingIndex from '../utils/HandlePaging';

/**
 * @param {boolean} condition
 * @returns {string} className
 */
const getClassPageItem = condition => {
  return condition ? 'page-item disabled' : 'page-item';
};

/**
 * @param {number} unitInPage
 * @param {number} show_record_data the range of data show in page
 * @param {number} total_record_data the range of data in database
 * @returns {any[]} [idx_start, idx_end, cb_handlePaging]
 * @since 2023-02-17
 */
function usePaging(show_record_data, total_record_data) {
  const [unitInPage, setUnitInPage] = useState(10);
  const [current_page, setCurrentPage] = useState(1);

  const page_num = [];
  const page_amount = Math.ceil(total_record_data / unitInPage);
  if (page_amount > 1) {
    for (let i = 1; i <= page_amount; i++) {
      page_num.push(i);
    }
  }

  const action = {
    firstPage: () => setCurrentPage(1),
    prevPage: () => setCurrentPage(current_page - 1),
    choosePage: number => setCurrentPage(number),
    nextPage: () => setCurrentPage(current_page + 1),
    lastPage: () => setCurrentPage(page_amount),
    changeUnitInPage: number => setUnitInPage(number)
  };

  let [idx_start, idx_end] = getPagingIndex(
    current_page,
    unitInPage,
    show_record_data
  );

  if (show_record_data <= unitInPage) {
    [idx_start, idx_end] = [0, show_record_data];
  }

  return [
    idx_start,
    idx_end,
    () => (
      <>
        {page_amount > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={getClassPageItem(current_page === 1)}>
                <a className="page-link" href="#" onClick={action.firstPage}>
                  First
                </a>
              </li>
              <li className={getClassPageItem(current_page === 1)}>
                <a className="page-link" href="#" onClick={action.prevPage}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {page_num?.map(num => (
                <li
                  className={
                    num === current_page ? 'page-item active' : 'page-item'
                  }
                  key={num}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => action.choosePage(num)}
                  >
                    {num}
                  </a>
                </li>
              ))}
              <li className={getClassPageItem(current_page === page_amount)}>
                <a className="page-link" href="#" onClick={action.nextPage}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              <li className={getClassPageItem(current_page === page_amount)}>
                <a className="page-link" href="#" onClick={action.lastPage}>
                  Last
                </a>
              </li>
              <li>
                <select
                  onChange={e => action.changeUnitInPage(e.target.value)}
                  placeholder={unitInPage}
                >
                  {[5, 10, 20, 50].map(x => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </nav>
        )}
      </>
    )
  ];
}

export default usePaging;
ra;
