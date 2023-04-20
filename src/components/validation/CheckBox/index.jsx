import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

const CheckBox = ({ control, name, checked, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={checked || false}
      render={({ field: { value, onChange } }) => {
        return (
          <div
            className={classNames('form-check', props.className, {
              'form-switch': props.useSwitch
            })}
          >
            <input
              id={name}
              type="checkbox"
              className="form-check-input"
              disabled={props.disabled || false}
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
            <label htmlFor={name}>{props.label || 'Check here!'}</label>
          </div>
        );
      }}
      id={name}
    />
  );
};

export default CheckBox;
