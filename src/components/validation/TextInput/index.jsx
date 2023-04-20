import React from 'react';
import className from 'classnames';
import validateEmail from '../../../utils/validateEmail';
import { checkPasswordStrength } from '../../../utils/validatePassword';

/**
 * @param {{
 *  register: Function,
 *  errors: object,
 *  attribute: string,
 *  required?: boolean,
 *  errorMessage?: string
 *  props: ['label', 'placeholder', 'type: text|password|email']
 * }}
 */
function TextInput({ register, errors, attribute, required, ...props }) {
  function getRules() {
    const rules = {};
    if (required) {
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
    // check input type
    switch (props.type) {
      case 'date':
      case 'datetime-local':
      case 'number': {
        if (props.min) {
          const errorMessage =
            props.errorMessageForMin || 'Min value is ' + props.min;
          rules.min = {
            value: Number(props.min),
            message: errorMessage
          };
        }
        if (props.max) {
          const errorMessage =
            props.errorMessageForMax || 'Max value is ' + props.max;
          rules.max = {
            value: Number(props.max),
            message: errorMessage
          };
        }
        break;
      }
      case 'email': {
        const errorMessage = props.errorMessage || 'Your email is invalid!';
        rules.validate = value => validateEmail(value) || errorMessage;
        break;
      }
      case 'password': {
        const errorMessage =
          props.errorMessage || "Your password hasn't strength enough!";
        rules.validate = value =>
          checkPasswordStrength(value) > 1 || errorMessage;
        break;
      }
      default:
        break;
    }
    return rules;
  }

  return (
    <div className="form-floating">
      <input
        className={className('form-control', props.className, {
          'is-invalid': required && errors[attribute]
        })}
        {...register(attribute, getRules())}
        id={`text-input-${attribute}`}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        readOnly={props.readOnly}
        required={required}
        type={props.type || 'text'}
        min={props.min}
        max={props.max}
        placeholder={
          props.placeholder ||
          'This is a default placeholder, If you know you know'
        }
      />
      <label className="text-uppercase" htmlFor={`text-input-${attribute}`}>
        {(props.label || 'Input').concat(' ')}
        {required && <span className="text-danger">*</span>}
      </label>
      <p className="text-danger small">{errors[attribute]?.message}</p>
    </div>
  );
}

export default TextInput;
