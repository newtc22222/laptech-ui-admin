import React from 'react';
import classNames from 'classnames';

import { Loading, SortableTable } from '../../components/common';
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
  'createdDate',
  'modifiedDate'
];

function ProductTable({
  productList,
  productTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal,
  ...props
}) {
  const { brandList, categoryList } = props;

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
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-secondary flex-fill"
            onClick={() => handleSetUpdateMode(product)}
          >
            {content.btnEdit}
          </button>
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
