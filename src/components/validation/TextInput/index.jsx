import React from 'react';
import classNames from 'classnames';

/**
 * @param {{
 *  register: Function,
 *  errors: object,
 *  attribute: string,
 *  required?: boolean,
 *  props: ['label', 'placeholder', 'type: text|password|email']
 * }}
 */
function TextInput({ register, errors, attribute, required, ...props }) {
  const storeAttribute = () =>
    register(
      attribute,
      required && {
        required: props.errorMessage || `You need to provide your ${attribute}!`
      }
    );

  return (
    <div className="form-floating">
      <input
        className={classNames('form-control', props.className, {
          'is-invalid': required && errors[attribute]
        })}
        {...storeAttribute()}
        id={attribute}
        type={props.type || 'text'}
        defaultValue={props.defaultValue}
        required={required}
        placeholder={
          props.placeholder ||
          'This is a default placeholder, If you know you know'
        }
      />
      <label htmlFor={attribute} className="text-uppercase">
        {(props.label || 'Input').concat(' ')}
        {required && <span className="text-danger">*</span>}
      </label>
      <p className="text-danger small">{errors[attribute]?.message}</p>
    </div>
  );
}

export default TextInput;
