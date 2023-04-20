import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownMenu({ children, config, ...props }) {
  const renderContent = (
    <Dropdown.Menu>
      {config.map((item, idx) => {
        if (item === 'divider') return <Dropdown.Divider key={idx} />;
        return (
          <Dropdown.Item key={idx} onClick={item.handle}>
            {item.label}
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  );

  return (
    <Dropdown className={props.className} align={props.align || 'start'}>
      <Dropdown.Toggle className="bg-secondary border-secondary w-100">
        {children}
      </Dropdown.Toggle>
      {renderContent}
    </Dropdown>
  );
}

export default DropdownMenu;
