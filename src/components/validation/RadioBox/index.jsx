import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

/**
 * @param {{ control: object, name: string, defaultValue: string, options: string[] }}
 */
const RadioBox = ({ control, name, defaultValue, options, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || options[0]}
      render={({ field: { value, onChange } }) => {
        return (
          <div
            className={classNames(
              'container pt-1 pb-1 border border-dark',
              props.className
            )}
          >
            {options?.map(option => {
              return (
                <div className="form-check" key={option}>
                  <input
                    id={option}
                    type="radio"
                    className="form-check-input"
                    name={name}
                    checked={value === option}
                    onChange={() => onChange(option)}
                    disabled={props.disabled || false}
                  />
                  <label htmlFor={option}>{option || 'Check here!'}</label>
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
