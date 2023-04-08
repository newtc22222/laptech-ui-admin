import classNames from 'classnames';
import React from 'react';
import { Accordion } from 'react-bootstrap';

function AccordionCustom({ configContent, ...props }) {
  const activeItem = configContent.filter(item => item.isActive);
  const activeKey = [];
  activeItem?.forEach(i => activeKey.push(configContent.indexOf(i)));

  return (
    <Accordion
      defaultActiveKey={activeKey}
      className={classNames('mb-3', props.className)}
      alwaysOpen
    >
      {configContent.map((item, idx) => {
        return (
          <Accordion.Item key={idx} eventKey={idx}>
            <Accordion.Header>
              <div className="text-uppercase">{item.header}</div>
            </Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default AccordionCustom;
