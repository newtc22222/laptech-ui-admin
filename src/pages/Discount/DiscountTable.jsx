import React from 'react';

// TODO: build sortable table
import { Loading, SortableTable } from '../../components/common';
import content from './content';
import chooseFieldsOfObject from '../../utils/chooseFieldsOfObject';
import { formatDateTime } from '../../utils/formatTime';

const fields = [
  'id',
  'code',
  'appliedType',
  'rate',
  'maxAmount',
  'appliedDate',
  'endedDate',
  'createdDate',
  'modifiedDate'
];

/**
 * @since 2023-02-13
 */
const DiscountTable = ({
  discountList,
  discountTotalRecord,
  handleSetUpdateMode,
  handleShowDeleteModal
}) => {
  if (discountList === null || discountList === undefined) return <Loading />;

  const data = chooseFieldsOfObject(discountList, fields);
  const config = [
    {
      label: content.id,
      render: discount => discount.id,
      sortValue: discount => discount.id
    },
    {
      label: content.code,
      render: discount => discount.code,
      sortValue: discount => discount.code
    },
    {
      label: content.appliedType,
      render: discount => discount.appliedType,
      sortValue: discount => discount.appliedType
    },
    {
      label: content.rate,
      render: discount => discount.rate,
      sortValue: discount => discount.rate
    },
    {
      label: content.maxAmount,
      render: discount => discount.maxAmount,
      sortValue: discount => discount.maxAmount
    },
    {
      label: content.appliedDate,
      render: discount => formatDateTime(discount.appliedDate),
      sortValue: discount => discount.appliedDate
    },
    {
      label: content.endedDate,
      render: discount => formatDateTime(discount.endedDate),
      sortValue: discount => discount.endedDate
    },
    {
      label: content.setting,
      style: { maxWidth: '5vw' },
      render: discount => {
        return (
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => handleSetUpdateMode(discount)}
            >
              {content.btnEdit}
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={() => handleShowDeleteModal(discount.id, discount.name)}
            >
              {content.btnDel}
            </button>
          </div>
        );
      }
    }
  ];

  const keyFn = discount => discount.id;

  return (
    <SortableTable
      data={data}
      config={config}
      keyFn={keyFn}
      totalRecordData={discountTotalRecord}
    />
  );
};

export default DiscountTable;
