import React from 'react';
import classNames from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function PopoverMenu({ children, config, ...props }) {
  const renderPopover = (
    <Popover id="popover-menu">
      {props.header && <Popover.Header>{props.header}</Popover.Header>}
      <Popover.Body className="p-1">
        <div className="list-group list-group-flush">
          {config.map((item, idx) => {
            return (
              <div
                key={idx}
                className={classNames(
                  'list-group-item list-group-item-action',
                  item.className
                )}
                onClick={item.handle}
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      flip
      rootClose
      trigger="click"
      placement={props.placement || 'auto'}
      overlay={renderPopover}
    >
      {children}
    </OverlayTrigger>
  );
}

export default PopoverMenu;
