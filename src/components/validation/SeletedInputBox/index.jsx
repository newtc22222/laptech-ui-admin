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
    if (defaultValue) return [].push(defaultValue);
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
        console.log(options);
        console.log(value);

        return (
          <div className={classNames(props.className)}>
            <label htmlFor={`select-${name}`}>
              {props.label || 'Choose value below'}
            </label>
            <div
              className={classNames({
                'border border-danger rounded-2': errors[name]
              })}
            >
              <Typeahead
                id={`select-${name}`}
                clearButton
                flip
                options={options}
                selected={value}
                onChange={onChange}
                placeholder={props.placeholder || ''}
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

export default SelectedInputBox;
