import React, { useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination
} from 'react-table';

import { icon_svg } from '../../../assets/svg';

import GlobalFilter from '../filter/GlobalFilter';
import { TextFilter } from '../filter/ColumnFilter';
import classNames from 'classnames';

const ReactTable = ({
  columns = [],
  hiddenColumns = [],
  data = [],
  isSortabled = false,
  isFiltered = false,
  hasGlobalFilter = false,
  isPagination = false,
  ...rest
}) => {
  const columnsConfig = useMemo(() => columns, [columns]);
  const dataConfig = useMemo(() => data, [data]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: TextFilter
    };
  }, []);

  const filterTypes = useMemo(
    () => ({
      includes: (rows, id, filterValue) => {
        if (filterValue.length === 0) return rows;
        return rows.filter(row => {
          const rowValue = row.values[id];
          return filterValue.includes(rowValue);
        });
      },
      between: (rows, id, filterValue) => {
        if (!filterValue) return rows;
        if (filterValue.length === 0 || (!filterValue[0] && !filterValue[1]))
          return rows;
        return rows.filter(row => {
          const rowValue = row.value[id];
          const start = filterValue[0] || rowValue;
          const end = filterValue[1] || rowValue;
          return start <= rowValue && rowValue <= end;
        });
      }
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns: columnsConfig,
      data: dataConfig,
      initialState: { hiddenColumns: hiddenColumns },
      defaultColumn,
      filterTypes: isFiltered && filterTypes
    },
    isFiltered && useFilters,
    hasGlobalFilter && useGlobalFilter,
    isSortabled && useSortBy,
    isPagination && usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // pagination
    page,
    pageCount,
    setPageSize,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    gotoPage,
    // normal
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter
  } = tableInstance;

  const getSortableConfig = column => {
    return isSortabled
      ? column.getHeaderProps(column.getSortByToggleProps())
      : column.getHeaderProps();
  };

  const renderData = objects => {
    return (
      <>
        {objects.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      {hasGlobalFilter && (
        <div className="mb-3">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      )}
      <table
        {...getTableProps()}
        className={classNames(
          'table table-bordered table-hover',
          rest.className
        )}
      >
        <thead className="table-primary align-middle">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...getSortableConfig(column)} className="align-middle">
                  <div className="d-flex flex-row text-uppercase">
                    {column.render('Header')}
                    {isSortabled && (
                      <div className="ms-2 d-flex align-items-center">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? icon_svg.arrow_down_high_to_low
                            : icon_svg.arrow_down_low_to_high
                          : ''}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
          {isFiltered &&
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {isPagination ? renderData(page) : renderData(rows)}
        </tbody>
      </table>
      {isPagination && (
        <div className="d-flex flex-row gap-3">
          <div className="d-flex align-items-center">{`Page ${
            Number(pageIndex) + 1
          } of ${pageCount}`}</div>

          <div className="vr"></div>
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Button paging"
          >
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={!canPreviousPage}
              onClick={() => gotoPage(0)}
            >
              {rest.label?.goFirst || '<<'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              {rest.label?.goPrevious || '<'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              {rest.label?.goNext || '>'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={!canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
            >
              {rest.label?.goLast || '>>'}
            </button>
          </div>
          <div className="vr"></div>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label className="col-form-label">
                {rest.label?.goToPage || 'Go to page'}
              </label>
            </div>
            <div className="col-auto">
              <input
                className="form-control-sm"
                type="number"
                defaultValue={pageIndex + 1}
                min={1}
                max={pageCount}
                onChange={e => {
                  const pageNum = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNum);
                }}
              />
            </div>
          </div>
          <div className="vr"></div>
          <div className="d-flex align-items-center">
            <select
              className="form-select-sm"
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map(x => (
                <option key={x} value={x}>
                  {rest.label?.show || 'Show' + ' ' + x}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ReactTable);
