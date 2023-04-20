import React from 'react';

// TODO: build sortable table
import { Loading, SortableTable } from '../../components/common';
import content from './content';

import chooseFieldsOfObject from '../../utils/chooseFieldsOfObject';

const fields = [
  'id',
  'name',
  'description',
  'image',
  'createdDate',
  'modifiedDate'
];

function CategoryTable({
  categoryList,
  categoryTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) {
  if (categoryList === null || categoryList === undefined) return <Loading />;

  const data = chooseFieldsOfObject(categoryList, fields);
  const config = [
    {
      label: content.id,
      render: category => category.id,
      sortValue: category => category.id
    },
    {
      label: content.name,
      render: category => category.name,
      sortValue: category => category.name
    },
    {
      label: content.description,
      render: category => category.description,
      sortValue: category => category.description
    },
    {
      label: content.image,
      style: { maxWidth: '8vw' },
      className: 'text-center',
      render: category => (
        <img
          alt={category.name}
          src={category.image}
          className="img-thumbnail"
        />
      )
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: category => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(category)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() => handleShowDeleteModal(category.id, category.name)}
            >
              {content.btnDel}
            </button>
          </div>
        );
      }
    }
  ];

  const keyFn = category => category.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={categoryTotalRecord}
    />
  );
}

export default CategoryTable;
