import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import { Typeahead } from 'react-bootstrap-typeahead';

const SelectedInputBox = ({
  control,
  name,
  errors,
  defaultValue,
  options,
  ...props
}) => {
  function getDefaultValue() {
    if (defaultValue) return [defaultValue];
    return props.required ? [options[0]] : [];
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
          <div
            className={classNames('p-2', props.className, {
              'border-danger': errors[name]
            })}
          >
            <label
              htmlFor={`select-${name}`}
              className="text-uppercase text-muted mb-1"
            >
              {props.label || 'Choose value below'}
            </label>
            <Typeahead
              id={`select-${name}`}
              flip
              options={options}
              selected={value}
              onChange={onChange}
              placeholder={props.placeholder || ''}
              disabled={props.disabled || false}
            />
            <p className="text-danger small">
              {errors[name] && props.errorMessage}
            </p>
          </div>
        );
      }}
    />
  );
};

export default SelectedInputBox;
