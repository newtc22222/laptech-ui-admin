import React from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import _ from 'lodash';
import TableRow from './TableRow';
import './TableRow.css';

const content = {
  attribute: 'thuộc tính',
  value: 'giá trị',
  add_more: 'thêm thông tin',
  error: 'Bạn có dữ liệu trống ở dòng:'
};

function setDefaultValue(text) {
  return text ? JSON.parse(text) : [];
}

const SpecificationTable = ({
  control,
  name,
  errors,
  defaultValue,
  ...props
}) => {
  function getRules() {
    const rules = {};
    rules.validate = () => {
      const rows = props.getValues()[name];
      if (rows?.length > 0) {
        const emptyContent = rows
          .filter(row => {
            return !row.attribute || !row.value;
          })
          .map(row => _.findIndex(rows, row) + 1);
        return (
          emptyContent.length < 1 ||
          `${content.error} ${emptyContent.join(',')}`
        );
      }
    };
    return rules;
  }

  const renderContent = ({ field: { value: data, onChange } }) => {
    const handleChangeValue = (e, key, item_edit) => {
      item_edit[key] = e.target.value;
      const newData = data.map(item => {
        if (item.index === item_edit.index) {
          return item_edit;
        }
        return item;
      });
      onChange(newData);
    };

    const handleAddMoreLine = () => {
      const newData = [
        ...data,
        {
          index: crypto.randomUUID(),
          attribute: '',
          value: ''
        }
      ];
      onChange(newData);
    };

    const handleRemoveLine = id => {
      const newData = data.filter(item => item.index !== id);
      onChange(newData);
    };

    return (
      <div
        className={classNames('container', {
          'border border-danger rounded-2 py-1': errors[name]
        })}
      >
        <div className="mt-2 table-responsive">
          <table className="table table-bordered border-dark">
            <thead className="bg-primary text-white">
              <tr className="text-center">
                <th className="text-uppercase">{content.attribute}</th>
                <th className="text-uppercase">{content.value}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
                <TableRow
                  key={item.index}
                  item={item}
                  handleChangeValue={handleChangeValue}
                  handleRemoveLine={handleRemoveLine}
                />
              ))}
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-uppercase fw-bold hover-add"
                  onClick={handleAddMoreLine}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  {content.add_more}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {errors[name] && (
          <span className="fw-bold ms-1 text-danger">
            {errors[name].message}
          </span>
        )}
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={setDefaultValue(defaultValue)}
      rules={getRules()}
      render={renderContent}
    />
  );
};

export default SpecificationTable;
