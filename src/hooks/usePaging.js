import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import getRecordShowIndex from '../utils/HandleRecordShow';

const list_amount_record_on_page = [5, 10, 25, 50, 100];
const max_paging_show = 7;

/**
 * @param {boolean} condition
 * @returns {string} className with disabled or not
 */
function getClassPageItem(condition) {
  return 'page-item' + (condition ? ' disabled' : '');
}

/**
 *
 * @param {number} recordsShow the length of data put in list
 * @param {number} totalRecords the length of data in database
 * @returns {[number, number, JSX.Element]}
 */
const usePaging = (recordsShow, totalRecords) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsInPage, setRecordsInPage] = useState(10); // default record show in 1 page
  const [goToPage, setGoToPage] = useState(null);

  const page_list = _.range(1, Math.ceil(totalRecords / recordsInPage) + 1);
  const last_page = page_list[page_list.length - 1];

  useEffect(() => {
    setGoToPage(null); // refresh input go to page
  }, [currentPage]);

  // use this when user try to change record on page larger
  if (currentPage > last_page) {
    setCurrentPage(last_page);
  }

  // this function make sure a range of numbers always be max_paging_show
  // (except last_page < max_paging_show)
  const getIndexPage = () => {
    let page_start;
    switch (currentPage) {
      case 1:
      case 2:
      case 3:
        page_start = 0;
        break;
      default:
        page_start = currentPage - 3;
        break;
    }
    // handle the last
    if (currentPage > last_page - max_paging_show + 3) {
      page_start = last_page - max_paging_show;
    }
    const page_end = page_start + max_paging_show;
    return [page_start, page_end];
  };

  const actionChangePage = {
    first: () => setCurrentPage(1),
    prev: () => setCurrentPage(prev => prev - 1),
    number: number => setCurrentPage(number),
    next: () => setCurrentPage(prev => prev + 1),
    last: () => setCurrentPage(last_page),
    changeRecordsInPage: number => setRecordsInPage(number)
  };

  const handleChangeGoToPage = e => {
    const input = Number(e.target.value);
    let exact_page = input;
    if (input < 1) exact_page = 1;
    if (input > last_page) exact_page = last_page;
    setGoToPage(exact_page);
  };

  // handle the index of record will show
  let [idx_start, idx_end] = getRecordShowIndex(
    currentPage,
    recordsInPage,
    recordsShow
  );
  if (recordsShow < recordsInPage) {
    [idx_start, idx_end] = [0, recordsShow];
  }

  return [
    idx_start,
    idx_end,
    () => (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={getClassPageItem(currentPage <= 1)}>
            <span className="page-link" onClick={actionChangePage.first}>
              {'<<'}
            </span>
          </li>
          <li className={getClassPageItem(currentPage <= 1)}>
            <span className="page-link" onClick={actionChangePage.prev}>
              {'<'}
            </span>
          </li>
          {page_list.slice(...getIndexPage()).map(page => {
            return (
              <li className="page-item" key={page}>
                <span
                  className={
                    'page-link' + (page === currentPage ? ' active' : '')
                  }
                  onClick={() => actionChangePage.number(page)}
                >
                  {page}
                </span>
              </li>
            );
          })}
          <li className={getClassPageItem(currentPage >= last_page)}>
            <span className="page-link" onClick={actionChangePage.next}>
              {'>'}
            </span>
          </li>
          <li className={getClassPageItem(currentPage >= last_page)}>
            <span className="page-link" onClick={actionChangePage.last}>
              {'>>'}
            </span>
          </li>
          {/* Go to specified page */}
          <li className="page-item">
            <div className="input-group">
              <input
                className="page-link"
                type="number"
                value={goToPage || ''}
                min="1"
                max={last_page}
                onChange={handleChangeGoToPage}
                required
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={() => {
                  if (goToPage && page_list.includes(goToPage)) {
                    actionChangePage.number(goToPage);
                  }
                }}
              >
                Go to
              </button>
            </div>
          </li>
          {/* Choose a number of records show on 1 page */}
          <li className="page-item ms-2">
            <select
              className="page-link"
              onChange={e => {
                actionChangePage.changeRecordsInPage(e.target.value);
              }}
              value={recordsInPage}
            >
              {list_amount_record_on_page.map(x => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </nav>
    )
  ];
};

export default usePaging;
