import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import _ from 'lodash';
import classNames from 'classnames';

const CheckBoxGroup = ({ control, name, errors, options, ...props }) => {
  const [filterText, setFilterText] = useState('');
  const [optionsFilter, setOptionsFilter] = useState(options);

  function handleChangeOption(e) {
    const filterText = e.target.value.trim().toLowerCase();
    const listFilter = options.filter(o =>
      o.label.trim().toLowerCase().includes(filterText)
    );
    setFilterText(filterText);
    setOptionsFilter(listFilter);
  }

  function getRule() {
    const rules = {};
    rules.validate = () => {
      const choices = props.getValues(name);
      return (
        choices.length > 0 ||
        props.errorMessage ||
        'You need to choose at least 1!'
      );
    };
    return rules;
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={props.defaultValue || []}
      rules={props.required && getRule()}
      render={({ field: { value, onChange } }) => {
        const handleChoose = option => {
          if (_.findIndex(value, option) !== -1) {
            const newChoice = value.filter(o => o.id !== option.id);
            return onChange(newChoice);
          }
          return onChange([...value, option]);
        };

        return (
          <div
            className={classNames(
              { 'border border-danger': errors[name] },
              props.className
            )}
          >
            {props.title && <h4 className="mb-1">{props.title}</h4>}
            {props.searchBar && (
              <div>
                <input
                  className="form-control my-1"
                  type="text"
                  placeholder="Search ..."
                  value={filterText}
                  onChange={handleChangeOption}
                />
              </div>
            )}
            {optionsFilter.map(o => {
              return (
                <div
                  key={o.id}
                  className={classNames('form-check', o.className, {
                    'form-switch': props.useSwitch
                  })}
                >
                  <input
                    id={o.id}
                    type="checkbox"
                    className="form-check-input"
                    disabled={o.disabled || false}
                    checked={_.findIndex(value, o) !== -1}
                    onChange={() => handleChoose(o)}
                  />
                  <label htmlFor={o.id}>
                    {o.render || o.label || 'Check here!'}
                  </label>
                </div>
              );
            })}
            {errors[name] && (
              <span className="text-danger">{errors[name].message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default CheckBoxGroup;
