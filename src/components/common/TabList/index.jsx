import React from 'react';
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import classNames from 'classnames';

function TabList({ configData, ...props }) {
  return (
    <Tab.Container
      id="tab-list"
      defaultActiveKey={configData[0]?.key || 0}
      className={classNames(props.className)}
    >
      <Row>
        <Col xl={2} md={3}>
          <Nav variant="pills" className="flex-column border rounded-2">
            {configData.map((item, idx) => {
              return (
                <Nav.Item key={idx}>
                  <Nav.Link
                    eventKey={item.key || idx}
                    className={classNames(
                      'd-flex justify-content-between',
                      item.className
                    )}
                    disabled={item.disabled}
                  >
                    <span className="fw-bold">{item.title.concat(' ')}</span>
                    <span>{item.quantity || 0}</span>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Col>
        <Col xl={10} md={9}>
          {configData.map((item, idx) => {
            return (
              <Tab.Content key={idx}>
                <Tab.Pane eventKey={item.key || idx}>{item.body}</Tab.Pane>
              </Tab.Content>
            );
          })}
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default TabList;
