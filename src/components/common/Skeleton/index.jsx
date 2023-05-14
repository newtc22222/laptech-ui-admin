import React from 'react';
import classNames from 'classnames';

const Skeleton = ({ config, className, ...rest }) => {
  return (
    <div className={classNames(className)} {...rest}>
      {config.map((attribute, idx) => {
        return (
          <span
            key={idx}
            className={classNames('placeholder col-12', attribute?.className)}
            style={attribute?.style}
          ></span>
        );
      })}
    </div>
  );
};

export default Skeleton;
