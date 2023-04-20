import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

const SelectedBox = ({ control, name, defaultValue, options, ...props }) => {
  function getDefaultValue() {
    if (defaultValue) return defaultValue;
    return props.required ? options[0] : null;
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={getDefaultValue()}
      render={({ field: { value, onChange } }) => {
        const handleChange = e => {
          const choice =
            e.target.value !== props.defaultText ? e.target.value : null;
          onChange(choice);
        };

        return (
          <div className={classNames('form-floating', props.className)}>
            <select
              className="form-select"
              id="floatingSelect"
              onChange={handleChange}
              defaultValue={value}
              required={props.required || false}
              disabled={props.disabled || false}
            >
              {props.defaultText && (
                <option key="default" disabled={props.required}>
                  {props.defaultText}
                </option>
              )}
              {options?.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">
              {props.label || 'Choose value below'}
            </label>
            {/* <p className="text-danger small">{errors[attribute]?.message}</p> */}
          </div>
        );
      }}
    />
  );
};

export default SelectedBox;
