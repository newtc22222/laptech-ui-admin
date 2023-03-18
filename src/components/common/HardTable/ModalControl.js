import React from 'react';
import { Modal } from 'react-bootstrap';
import { ico_sort } from '../../../common/svg/crud';

/**
 * @param {string} header
 * @returns {boolean}
 */
function isSortColumn(header) {
  if (
    _.intersectionWith(
      // Get same item in 2 arrays
      header.toLowerCase().split(' '),
      ['logo', 'path', 'url', 'image', 'hình', 'ảnh'],
      _.isEqual
    ).length > 0
  )
    return false;
  return true;
}

const ModalControl = ({
  show,
  setShow,
  headerList,
  setColumnsShow,
  columnSort,
  setColumnSort
}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      className="modal-xl"
    >
      <Modal.Body>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Setting</h2>
          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={() => {
                setColumnsShow(_.range(0, headerList.length));
              }}
            >
              All
            </button>
            <button
              className="btn btn-warning"
              onClick={() => {
                const listIndexDisable = [];
                headerList.forEach((item, idx) => {
                  if (
                    item.toLowerCase() === 'id' ||
                    item.toLowerCase() === 'name' ||
                    item.toLowerCase().includes('tên')
                  )
                    listIndexDisable.push(idx);
                });
                setColumnsShow(listIndexDisable);
              }}
            >
              None
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModalSetting(false)}
            >
              Back
            </button>
          </div>
        </div>
        <div className="container pt-2 pb-2">
          <h5>Choose column show in table</h5>
          <div className="btn-group w-100" role="group">
            {headerList.map((header, idx) => {
              return (
                <>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id={'btncheck' + idx}
                    autoComplete="off"
                    checked={columnsShow.includes(idx)}
                    onChange={() => {
                      setColumnsShow(prev => {
                        if (prev.includes(idx)) {
                          return prev.filter(id => id !== idx);
                        }
                        return [...prev, idx];
                      });
                    }}
                    disabled={
                      header.toLowerCase() === 'id' ||
                      header.toLowerCase() === 'name' ||
                      header.toLowerCase().includes('tên')
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor={'btncheck' + idx}
                  >
                    {header}
                  </label>
                </>
              );
            })}
          </div>
        </div>
        <div className="container pt-2 pb-2 mt-2">
          <h5>Choose sort column</h5>
          <div className="btn-group" role="group">
            {headerList.map((header, idx) => {
              if (isSortColumn(header)) {
                return (
                  <>
                    <input
                      type="radio"
                      className="btn-check"
                      id={'btn-radio' + idx}
                      autoComplete="off"
                      checked={columnSort.idx === idx}
                      onChange={() => {
                        setColumnSort(prev => {
                          return { ...prev, idx };
                        });
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={'btn-radio' + idx}
                    >
                      {header}
                    </label>
                  </>
                );
              }
            })}
            <div className="btn-group" role="group">
              <button
                id="btnGroupSortOption"
                type="button"
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {ico_sort[columnSort.dir]}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="btnGroupSortOption"
              >
                <li>
                  <span
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (columnSort.dir !== 'asc') {
                        setColumnSort(prev => {
                          return { ...prev, dir: 'asc' };
                        });
                      }
                    }}
                  >
                    {ico_sort.asc} {'Low to high'}
                  </span>
                </li>
                <li>
                  <span
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (columnSort.dir !== 'desc') {
                        setColumnSort(prev => {
                          return { ...prev, dir: 'desc' };
                        });
                      }
                    }}
                  >
                    {ico_sort.desc} {'High to low'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalControl;
