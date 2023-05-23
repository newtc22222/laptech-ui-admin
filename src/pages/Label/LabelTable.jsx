import React from 'react';

// TODO: build sortable table
import { Loading, SortableTable } from '../../components/common';
import content from './content';
import chooseFieldsOfObject from '../../utils/chooseFieldsOfObject';

const fields = [
  'id',
  'name',
  'icon',
  'title',
  'description',
  'createdDate',
  'modifiedDate'
];

/**
 * @since 2023-02-13
 */
const LabelTable = ({
  labelList,
  labelTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (labelList === null || labelList === undefined) return <Loading />;

  const data = chooseFieldsOfObject(labelList, fields);
  const config = [
    {
      label: content.id,
      render: label => label.id,
      sortValue: label => label.id
    },
    {
      label: content.name,
      render: label => label.name,
      sortValue: label => label.name
    },
    {
      label: content.icon,
      render: label => label.icon
    },
    {
      label: content.title,
      render: label => label.title,
      sortValue: label => label.title
    },
    {
      label: content.description,
      render: label => label.description
    },
    {
      label: content.sample,
      render: label => {
        return (
          <div
            title={label.title}
            className="d-flex justify-content-center border border-primary rounded-2"
          >
            <div
              className="mx-2"
              dangerouslySetInnerHTML={{ __html: label.icon }}
            />
            {label.name}
          </div>
        );
      }
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

  const keyFn = label => label.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={labelTotalRecord}
    />
  );
};

export default LabelTable;
