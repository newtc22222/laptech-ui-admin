import React from 'react';

import { Loading, SortableTable } from '../../components/common';

import chooseFieldsOfObject from '../../utils/chooseFieldsOfObject';
import content from './content';

const fields = [
  'id',
  'name',
  'country',
  'establishDate',
  'logo',
  'createdDate',
  'modifiedDate'
];

const BrandTable = ({
  brandList,
  brandTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (brandList === null || brandList === undefined) return <Loading />;

  const data = chooseFieldsOfObject(brandList, fields);
  const config = [
    {
      label: content.id,
      render: brand => brand.id,
      sortValue: brand => brand.id
    },
    {
      label: content.name,
      render: brand => brand.name,
      sortValue: brand => brand.name
    },
    {
      label: content.country,
      render: brand => brand.country,
      sortValue: brand => brand.country
    },
    {
      label: content.establishDate,
      render: brand => brand.establishDate,
      sortValue: brand => brand.establishDate
    },
    {
      label: content.logo,
      style: { maxWidth: '8vw' },
      className: 'text-center',
      render: brand => (
        <img alt={brand.name} src={brand.logo} className="img-thumbnail" />
      )
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: brand => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(brand)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() => handleShowDeleteModal(brand.id, brand.name)}
            >
              {content.btnDel}
            </button>
          </div>
        );
      }
    }
  ];

  const keyFn = brand => brand.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={brandTotalRecord}
    />
  );
};

export default BrandTable;
