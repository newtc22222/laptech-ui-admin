import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

/**
 * @param {{ control: object, name: string, defaultValue: string, options: object[], props: object }}
 */
const RadioBox = ({ control, name, defaultValue, options, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || options[0].value}
      render={({ field: { value, onChange } }) => {
        return (
          <div className={classNames('container pt-1 pb-1', props.className)}>
            {props.title && <p className="text-uppercase">{props.title}</p>}
            {options?.map(option => {
              return (
                <div className="form-check" key={option.value}>
                  <input
                    id={option.value}
                    type="radio"
                    className="form-check-input"
                    name={name}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                    disabled={props.disabled || false}
                  />
                  <label htmlFor={option.value}>
                    {option.label || 'Check here!'}
                  </label>
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default RadioBox;
