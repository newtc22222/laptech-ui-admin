import classNames from 'classnames';
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Tabbed = ({ config, ...props }) => {
  return (
    <Tabs
      className={classNames(props.className)}
      defaultActiveKey={0}
      id="tabbed"
      fill={props.fill}
      justify={props.justify}
    >
      {config.map((tab, idx) => {
        return (
          <Tab eventKey={idx} title={tab.title} key={idx}>
            {tab.content}
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default Tabbed;
