import React from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";

const InputImage = ({
  control,
  errors,
  name,
  defaultValue,
  width,
  height,
  ...props
}) => {
  const defaultWidth = width || 200;
  const defaultHeight = height || 150;
  const defaultImg = `https://placeholder.pics/svg/${defaultWidth}x${defaultHeight}/1B82FF-95EDFF/000000-FFFFFF/choose%20image`;

  const getImage = (value) => {
    return value instanceof File ? URL.createObjectURL(value) : value;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      rules={{ required: props.required || false }}
      render={({ field: { value, onChange } }) => {
        return (
          <div className={classNames(props.className)}>
            <div
              className={classNames({
                "border border-danger": errors[name]
              })}
            >
              <input
                className="form-control"
                type="file"
                disabled={props.disabled || false}
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    onChange({
                      target: { value: e.target.files[0] }
                    });
                  }
                }}
              />
            </div>
            <div className="d-flex">
              <img
                alt="uploadImg"
                style={{ maxWidth: defaultWidth, maxHeight: defaultHeight }}
                className={classNames("img-fuild img-thumbnail", {
                  "border border-danger": errors[name]
                })}
                src={getImage(value) || defaultImg}
                onClick={() => {
                  if (value != null && !props.disabled)
                    onChange({ target: { value: null } });
                }}
              />
            </div>
          </div>
        );
      }}
    />
  );
};

export default InputImage;
