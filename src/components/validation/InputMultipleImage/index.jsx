import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

import './index.css';

const InputMultipleImage = ({
  control,
  errors,
  name,
  defaultValue,
  width,
  height,
  ...props
}) => {
  const defaultWidth = width || 200;
  const defaultHeight = height || 200;
  const defaultImg = `https://placeholder.pics/svg/${defaultWidth}x${defaultHeight}/1B82FF-95EDFF/000000-FFFFFF/choose%20image`;

  function getImage(value) {
    return value instanceof File ? URL.createObjectURL(value) : value;
  }

  function getRequiredRule() {
    const rules = {};
    if (props.required) {
      rules.validate = () => {
        return (
          props.getValues(name).length > 0 ||
          props.errorMessage ||
          'You need to provide at least 1 picture!'
        );
      };
    }
    return rules;
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || []}
      rules={getRequiredRule()}
      render={({ field: { value, onChange } }) => {
        return (
          <div className={classNames(props.className)}>
            <div
              className={classNames('input-group mb-2', {
                'border border-danger': errors[name]
              })}
            >
              <input
                id="inputMultipleImage"
                className="form-control"
                type="file"
                multiple
                disabled={props.disabled || false}
                onChange={e => {
                  if (e.target.files.length > 0) {
                    onChange({
                      target: { value: [...value, ...e.target.files] }
                    });
                  }
                }}
              />
              <button
                id="inputMultipleImage"
                className="btn btn-outline-secondary"
                type="button"
                disabled={props.disabled}
                onClick={() => {
                  onChange({ target: { value: defaultValue } });
                }}
              >
                Reset
              </button>
              <button
                id="inputMultipleImage"
                className="btn btn-outline-dark"
                type="button"
                disabled={props.disabled}
                onClick={() => {
                  onChange({ target: { value: [] } });
                }}
              >
                Remove all
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {value?.map((image, idx) => {
                return (
                  <img
                    alt="uploadImg"
                    key={idx}
                    style={{ maxWidth: defaultWidth, maxHeight: defaultHeight }}
                    className={classNames(
                      'w-100 img-fluid img-thumbnail img-can-del',
                      {
                        'border border-danger': errors[name]
                      }
                    )}
                    src={getImage(image) || defaultImg}
                    onClick={() => {
                      if (!props.disabled)
                        onChange({
                          target: {
                            value: value.filter(
                              (item, itemIdx) => itemIdx !== idx
                            )
                          }
                        });
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
};

export default InputMultipleImage;
