import React from 'react';
import classNames from 'classnames';

const PageHeader = ({ children, pageName, ...props }) => {
  return (
    <div
      className={classNames(
        'd-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom',
        props.className
      )}
    >
      <h3 className="text-uppercase">{pageName}</h3>
      {children}
    </div>
  );
};

export default PageHeader;
