import React from 'react';
import classNames from 'classnames';

import { DropdownMenu, ReactTable } from '../../components/common';
import chooseFieldsOfObject from '../../utils/chooseFieldsOfObject';
import { getCurrencyString } from '../../utils/formatCurency';
import content from './content';
import SelectMultipleFilter from '../../components/common/filter/ColumnFilter/SearchMultipleFilter';

const fields = [
  'id',
  'name',
  'brandId',
  'categoryId',
  'releasedDate',
  'quantityInStock',
  'listedPrice',
  'specifications',
  'descriptionDetail',
  'createdDate',
  'modifiedDate'
];

function ProductTable({
  productList,
  brandList,
  categoryList,
  handleSetUpdateMode,
  handleShowDeleteModal,
  ...props
}) {
  const columns = [
    {
      Header: content.id,
      accessor: 'id'
    },
    {
      Header: content.name,
      accessor: 'name'
    },
    {
      Header: content.brand,
      accessor: 'brandId',
      Cell: ({ value }) => (
        <span className="fw-bold">
          {brandList.find(brand => brand.id === value)?.name || ''}
        </span>
      ),
      Filter: SelectMultipleFilter,
      filter: 'includes'
    },
    {
      Header: content.category,
      accessor: 'categoryId',
      Cell: ({ value }) => (
        <span className="fw-bold">
          {categoryList.find(category => category.id === value)?.name || ''}
        </span>
      ),
      Filter: SelectMultipleFilter,
      filter: 'includes'
    },
    {
      Header: content.releasedDate,
      accessor: 'releasedDate'
    },
    {
      Header: content.quantityInStock,
      accessor: 'quantityInStock',
      Cell: ({ value }) => {
        return (
          <div
            className={classNames('fw-bold text-center', {
              'text-primary': value > 3,
              'text-danger': value <= 3
            })}
          >
            {value}
          </div>
        );
      }
    },
    {
      Header: content.listedPrice,
      accessor: 'listedPrice',
      Cell: ({ value }) => getCurrencyString(value, 'vi-VN', 'VND')
    },
    {
      Header: content.form.specifications,
      accessor: 'specifications'
    },
    {
      Header: content.form.descriptionDetail,
      accessor: 'descriptionDetail'
    },
    {
      Header: 'createdDate',
      accessor: 'createdDate'
    },
    {
      Header: 'modifiedDate',
      accessor: 'modifiedDate'
    },
    {
      Header: content.setting,
      accessor: 'setting',
      Cell: ({ row }) => {
        return (
          <div className="d-flex flex-column gap-1">
            <DropdownMenu
              className="flex-fill"
              config={getConfigMenu(row.values)}
            >
              {content.btnEdit}
            </DropdownMenu>
            <button
              className="btn btn-danger flex-fill"
              onClick={() =>
                handleShowDeleteModal(row.values.id, row.values.name)
              }
            >
              {content.btnDel}
            </button>
          </div>
        );
      },
      disableFilters: true,
      disableSortBy: true
    }
  ];

  const getConfigMenu = product => {
    const configMenu = [
      {
        label: content.menu.basicInformation,
        handle: () => handleSetUpdateMode(product)
      },
      {
        label: content.menu.images,
        handle: () => props.handleSetUpdateImageMode(product, 'edit_image')
      },
      {
        label: content.menu.labels,
        handle: () => props.handleSetUpdateLabelMode(product, 'edit_label')
      },
      'divider',
      {
        label: content.menu.accessories,
        handle: () =>
          props.handleSetUpdateAccessoriesMode(product, 'edit_accessories')
      },
      {
        label: content.menu.discounts,
        handle: () =>
          props.handleSetUpdateDiscountMode(product, 'edit_discount')
      }
    ];
    return configMenu;
  };

  return (
    <ReactTable
      columns={columns}
      hiddenColumns={[
        'specifications',
        'descriptionDetail',
        'createdDate',
        'modifiedDate'
      ]}
      data={productList}
      isFiltered
      isSortabled
      isPagination
    />
  );
}

export default ProductTable;
