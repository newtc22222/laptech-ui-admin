import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import { Typeahead } from 'react-bootstrap-typeahead';

const SelectedMultipleBox = ({
  control,
  name,
  errors,
  defaultValue,
  options,
  ...props
}) => {
  function getDefaultValue() {
    if (defaultValue) return [].concat(defaultValue);
    return props.required ? [...options] : [];
  }

  function getRequiredRule() {
    if (props.required)
      return {
        validate: () => {
          return props.getValues(name).length > 0;
        }
      };
    return {};
  }

  return (
    <Controller
      control={control}
      name={name}
      errors={errors}
      defaultValue={getDefaultValue()}
      rules={getRequiredRule()}
      render={({ field: { value, onChange } }) => {
        return (
          <div className={props.className || ''}>
            <label htmlFor={`select-${name}-multiple`}>
              {props.label || 'Choose value below'}
            </label>
            <div
              className={classNames({
                'border border-danger rounded-2': errors[name]
              })}
            >
              <Typeahead
                id={`select-${name}-multiple`}
                flip
                multiple
                options={options}
                selected={value}
                onChange={onChange}
                placeholder={props.placeholder || ''}
                size={props.size || 10}
                disabled={props.disabled || false}
              />
            </div>
            <p className="text-danger small">
              {errors[name] && props.errorMessage}
            </p>
          </div>
        );
      }}
    />
  );
};

export default SelectedMultipleBox;
