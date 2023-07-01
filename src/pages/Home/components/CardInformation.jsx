import React from 'react';
import classNames from 'classnames';

const CardInformation = ({ title, value, ...props }) => {
  return (
    <div className={classNames('col-xl-3 col-md-6', props.className)}>
      <div className="card shadow py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <div className="text-xs font-weight-bold text-uppercase mb-1">
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-dark">{value}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInformation;
