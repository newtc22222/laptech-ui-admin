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
 * @param {number} unit_in_page
 * @param {object[]} dataList
 * @returns {any[]} [idx_start, idx_end, cb_handlePaging]
 * @since 2023-02-17
 */
function usePaging(unit_in_page, dataList) {
  const [currentPage, setCurrentPage] = useState(1);
  const page_num = [];
  const page_amount = Math.ceil(dataList.length / unit_in_page);
  if (page_amount > 1) {
    for (let i = 1; i <= page_amount; i++) {
      page_num.push(i);
    }
  }

  const action = {
    firstPage: () => setCurrentPage(1),
    prevPage: () => setCurrentPage(currentPage - 1),
    choosePage: number => setCurrentPage(number),
    nextPage: () => setCurrentPage(currentPage + 1),
    lastPage: () => setCurrentPage(page_amount)
  };

  const [idx_start, idx_end] = getPagingIndex(
    currentPage,
    unit_in_page,
    dataList
  );

  return [
    idx_start,
    idx_end,
    () => (
      <>
        {page_amount > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={getClassPageItem(currentPage === 1)}>
                <a className="page-link" href="#" onClick={action.firstPage}>
                  First
                </a>
              </li>
              <li className={getClassPageItem(currentPage === 1)}>
                <a className="page-link" href="#" onClick={action.prevPage}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {page_num?.map(num => (
                <li
                  className={
                    num === currentPage ? 'page-item active' : 'page-item'
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
              <li className={getClassPageItem(currentPage === page_amount)}>
                <a className="page-link" href="#" onClick={action.nextPage}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              <li className={getClassPageItem(currentPage === page_amount)}>
                <a className="page-link" href="#" onClick={action.lastPage}>
                  Last
                </a>
              </li>
            </ul>
          </nav>
        )}
      </>
    )
  ];
}

export default usePaging;
