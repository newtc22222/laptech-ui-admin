import React from 'react';
import classNames from 'classnames';

function AreaInput({ register, errors, attribute, ...props }) {
  function getRules() {
    const rules = {};
    if (props.required) {
      rules.required =
        props.errorMessage || `You need to provide your ${attribute}!`;
    }
    // input with text
    if (props.minLength) {
      const minValue = props.minLength || 0;
      rules.minLength = {
        value: minValue,
        message: props.errorMessageForMin || 'Min length is ' + minValue + '!'
      };
    }
    if (props.maxLength) {
      const maxValue = props.maxLength || Number.POSITIVE_INFINITY;
      rules.maxLength = {
        value: maxValue,
        message: props.errorMessageForMax || 'Max length is ' + maxValue + '!'
      };
    }
    return rules;
  }

  return (
    <div className="form-floating">
      <textarea
        className={classNames('form-control', {
          'is-invalid': props.required && errors[attribute]
        })}
        {...register(attribute, getRules())}
        id={`text-area-${attribute}`}
        style={{
          height: props.height || '100px',
          minHeight: props.minHeight || '80px',
          maxHeight: props.maxHeight || '50vw'
        }}
        defaultValue={props.defaultValue}
        required={props.required}
        placeholder={props.placeholder || 'Leave your message here!'}
      />
      <label className="text-uppercase" htmlFor={`text-area-${attribute}`}>
        {(props.label || `Input your ${attribute}`).concat(' ')}
        {props.required && <span className="text-danger">*</span>}
      </label>
      <p className="text-danger small">{errors[attribute]?.message}</p>
    </div>
  );
}

export default AreaInput;
