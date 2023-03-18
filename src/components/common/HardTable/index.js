import React, { useState } from 'react';
import usePaging from '../../../hooks/usePaging';
import ModalControl from './ModalControl';

import { ico_del, ico_edit } from '../../../common/svg/crud';

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
 * @param {string[]} headerList
 * @param {object[]} dataList
 * @param {number} totalRecordData the range of data in db
 * @param {() => {}} cb_handleSetUpdateMode
 * @param {() => {}} cb_handleShowDeleteModal
 * @since 2023-02-10
 */
const HardTable = ({
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

  return {
    ButtonControl: (
      <button
        className="btn btn-outline-secondary"
        onClick={() => setShowModalSetting(true)}
      >
        Setting
      </button>
    ),
    Table: (
      <>
        <ModalControl
          show={showModalSetting}
          setShow={setShowModalSetting}
          setColumnsShow={setColumnsShow}
          columnSort={columnSort}
          setColumnSort={setColumnSort}
        />
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
                            {ico_edit}
                          </button>{' '}
                          <br />
                          <button
                            className="btn btn-outline-danger"
                            onClick={() =>
                              cb_handleShowDeleteModal(item.id, item.name)
                            }
                          >
                            {ico_del}
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
    )
  };
};

export default HardTable;
