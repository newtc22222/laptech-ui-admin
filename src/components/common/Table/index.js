import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ico_sort } from '../../../common/svg/crud';
import usePaging from '../../../hooks/usePaging';

/**
 * @param {string} key
 * @returns {string}
 */
function getClassNameOfColumn(key) {
  switch (key.toLowerCase()) {
    case 'name':
      return 'fw-bold';
    case 'min':
    case 'max':
      return 'text-danger';
    default:
      return '';
  }
}

/**
 * @param {object} item
 * @returns {object[]}
 */
function getCustomList(item) {
  const customItemList = []; // custom row (use this)

  Object.keys(item).forEach(key => {
    let value = item[key];
    if (key.toLowerCase().includes('date')) {
      if (key.toLowerCase().includes('time')) {
        value = value.toLocaleString('vi'); //HH:mm:ss dd/MM/yyyy
      } else {
        value = value.toLocaleString('vi').slice(9); // dd/MM/yyyy
      }
    }
    const isImg = ['logo', 'path', 'image', 'url'].includes(key); // check img
    const className = getClassNameOfColumn(key); // css in class name

    const newObject = { value, className, isImg };
    if (key === 'specialField') {
      newObject[key] = item[key];
    }
    customItemList.push(newObject);
  });

  return customItemList; // row -> cell[]
}

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

/**
 * @param {string[]} headerList
 * @param {object[]} dataList
 * @param {number} totalRecordData the range of data in db
 * @param {() => {}} cb_handleSetUpdateMode
 * @param {() => {}} cb_handleShowDeleteModal
 * @since 2023-02-10
 */
const Table = ({
  headerList,
  dataList,
  totalRecordData,
  cb_handleSetUpdateMode,
  cb_handleShowDeleteModal
}) => {
  const [idx_start, idx_end, cb_handlePaging] = usePaging(
    dataList.length,
    totalRecordData
  );

  const [showModalSetting, setShowModalSetting] = useState(false);
  const [columnsShow, setColumnsShow] = useState(_.range(0, headerList.length)); // Can not remove Action column
  const [columnSort, setColumnSort] = useState({ idx: 0, dir: 'asc' }); // sort by, sort dir

  /**
   * @param {object[]} list
   * @returns {obejct[]} list was sort
   */
  function getSortData(list) {
    // get first object -> get keys -> choose key
    const columnSortName = Object.keys(list[0])[columnSort.idx];
    // sort by object. Example: 'name'
    const newListWithSort = _.sortBy(list, [columnSortName]);
    return columnSort.dir !== 'desc'
      ? newListWithSort
      : _.reverse(newListWithSort);
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowModalSetting(true)}
        >
          Setting
        </button>
      </div>
      {showModalSetting && (
        <Modal show backdrop="static" className="modal-xl">
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
                    id="btnGroupDrop1"
                    type="button"
                    className="btn btn-outline-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {ico_sort[columnSort.dir]}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
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
      )}
      <div className="table-responsive">
        <table className="table table-bordered border-dark table-hover table-sm">
          <thead className="bg-primary text-white">
            <tr className="text-center">
              {headerList
                ?.filter((item, idx) => columnsShow.includes(idx))
                .map((column_name, idx) => (
                  <th key={idx}>{column_name}</th>
                ))}
              <th>{'Thiết lập'}</th>
            </tr>
          </thead>
          <tbody>
            {getSortData(dataList)
              .slice(idx_start, idx_end)
              .map(item => {
                const customRow = getCustomList(item);
                return (
                  <tr key={item.id} className="text-center">
                    {customRow
                      .filter((item, idx) => columnsShow.includes(idx))
                      .map((cell, idx) => {
                        if (cell.isImg) {
                          return (
                            <td key={idx}>
                              <img
                                className="rounded img-fluid img-thumbnail"
                                style={{ maxWidth: '8vw' }}
                                src={cell.value}
                                alt={'#' + idx}
                              />
                            </td>
                          );
                        }
                        if (cell.specialField) {
                          return <td key={idx}>{cell.specialField}</td>;
                        }
                        return (
                          <td key={idx} className={cell.className}>
                            {cell.value}
                          </td>
                        );
                      })}
                    <td style={{ width: '5%' }}>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => cb_handleSetUpdateMode(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-tools"
                            viewBox="0 0 16 16"
                          >
                            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
                          </svg>
                        </button>{' '}
                        <br />
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            cb_handleShowDeleteModal(item.id, item.name)
                          }
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
              })}
          </tbody>
        </table>
      </div>
      {cb_handlePaging()}
    </>
  );
};

export default Table;
