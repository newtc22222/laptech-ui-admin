import React from 'react';
import classNames from 'classnames';

import { DropdownMenu, Loading, SortableTable } from '../../components/common';
import chooseFieldsOfObject from '../../utils/chooseFieldsOfObject';
import { getCurrencyString } from '../../utils/formatCurency';
import content from './content';

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
  productTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal,
  ...props
}) {
  if (!productList || !brandList || !categoryList) return <Loading />;

  const data = chooseFieldsOfObject(productList, fields);
  const config = [
    {
      label: content.id,
      render: product => <div className="text-wrap">{product.id}</div>,
      sortValue: product => product.id
    },
    {
      label: content.name,
      render: product => <div className="text-wrap">{product.name}</div>,
      sortValue: product => product.name
    },
    {
      label: content.brand,
      render: product => {
        const brand = brandList.filter(b => b.id === product.brandId)[0];
        return <div className="fw-bold text-center">{brand?.name || ''}</div>;
      },
      sortValue: product => {
        const brand = brandList.filter(b => b.id === product.brandId)[0];
        return brand?.name || '';
      }
    },
    {
      label: content.category,
      render: product => {
        const category = categoryList.filter(
          c => c.id === product.categoryId
        )[0];
        return (
          <div className="fw-bold text-center">{category?.name || ''}</div>
        );
      },
      sortValue: product => {
        const category = categoryList.filter(
          c => c.id === product.categoryId
        )[0];
        return category?.name || '';
      }
    },
    {
      label: content.releasedDate,
      render: product => (
        <div className="text-center">{product.releasedDate}</div>
      ),
      sortValue: product => product.releasedDate
    },
    {
      label: content.quantityInStock,
      render: product => {
        const quantity = product.quantityInStock || 0;
        return (
          <div
            className={classNames('fw-bold text-center', {
              'text-primary': quantity > 3,
              'text-danger': quantity <= 3
            })}
          >
            {product.quantityInStock}
          </div>
        );
      },
      sortValue: product => product.quantityInStock
    },
    {
      label: content.listedPrice,
      render: product => (
        <div className="text-center">
          {getCurrencyString(product.listedPrice, 'vi-VN', 'VND')}
        </div>
      ),
      sortValue: product => product.listedPrice
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: product => (
        <div className="d-flex flex-column gap-1">
          <DropdownMenu className="flex-fill" config={getConfigMenu(product)}>
            {content.btnEdit}
          </DropdownMenu>
          <button
            className="btn btn-danger flex-fill"
            onClick={() => handleShowDeleteModal(product.id, product.name)}
          >
            {content.btnDel}
          </button>
        </div>
      )
    }
  ];

  function getConfigMenu(product) {
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
  }

  const keyFn = product => product.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={productTotalRecord}
    />
  );
}

export default ProductTable;
