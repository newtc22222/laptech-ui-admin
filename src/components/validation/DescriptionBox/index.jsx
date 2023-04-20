import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import _ from 'lodash';

import { TextEditor } from '../../common';
import './NavTab.css';

function setDefaultValue(text) {
  const clearText = text
    ? text.replace(/style="/g, 'style=\\"').replace(/\);"/g, ');\\"')
    : null;
  return (
    JSON.parse(clearText) || [
      {
        id: crypto.randomUUID().replace(/-/g, ''),
        title: 'New tab',
        content: '',
        active: true
      }
    ]
  );
}

const DescriptionBox = ({ control, errors, name, defaultValue, ...props }) => {
  const getRules = () => {
    const rules = {};
    rules.validate = () => {
      const description = props.getValues()[name];
      if (description.length === 0) {
        return 'You need to create at least 1 tab!';
      }
      const emptyContentTab = description.filter(des => des.content === '');
      const emptyTab = emptyContentTab.map(
        tab => _.findIndex(description, tab) + 1
      );
      return (
        emptyContentTab.length < 1 ||
        `You have an empty content in tab: ${emptyTab.join(',')}!`
      );
    };
    return rules;
  };

  const renderContent = ({ field: { value: tabs, onChange } }) => {
    const handleAddTab = () => {
      const newTabList = tabs.map(tab => {
        tab.active = false;
        return tab;
      });
      newTabList.push({
        id: crypto.randomUUID().replace(/-/g, ''),
        title: 'New tab',
        content: '',
        active: true
      });
      onChange(newTabList);
    };

    const handleChooseTab = tabId => {
      const newTabList = tabs.map(tab => {
        tab.active = tab.id === tabId;
        return tab;
      });
      onChange(newTabList);
    };

    const handleCloseTab = tabId => {
      const oldIndex = _.findIndex(tabs, ['id', tabId]); // get old index
      let newTabList = tabs.filter(tab => tab.id !== tabId); // remove old

      const tabActive = _.findIndex(newTabList, tab => tab.active === true);

      if (tabActive === -1) {
        let new_index;
        if (oldIndex === 0) {
          new_index = 0;
        } else if (oldIndex === tabs.length) {
          new_index = tabs.length - 1;
        } else {
          new_index = oldIndex - 1;
        }
        newTabList = newTabList.map(tab => {
          const tab_index = _.indexOf(newTabList, tab);
          tab.active = tab_index === new_index;
          return tab;
        });
      }

      onChange(newTabList);
    };

    const handleChangeTitle = (e, tabId) => {
      const newTabList = tabs.map(tab => {
        if (tab.id === tabId) {
          tab.title = e.target.value;
        }
        return tab;
      });
      onChange(newTabList);
    };

    const handleChangeContent = (newContent, tabId) => {
      const newTabList = tabs.map(tab => {
        if (tab.id === tabId) {
          tab.content = newContent;
        }
        return tab;
      });
      onChange(newTabList);
    };

    return (
      <div>
        <ul className="nav nav-tabs">
          {tabs?.map(tab => {
            return (
              <li key={tab.id}>
                <div
                  className={
                    'input-group nav-link ' +
                    (tab.active ? 'bg-primary text-white' : '')
                  }
                >
                  <a
                    data-toggle="tab"
                    className={tab.active ? 'text-white' : 'text'}
                    style={{ textDecoration: 'none' }}
                    href={'#' + tab.id}
                    onClick={() => handleChooseTab(tab.id)}
                  >
                    {tab.title}
                  </a>
                  <span
                    className={
                      tab.active
                        ? 'badge ms-2badge ms-2 text-white'
                        : 'badge ms-2 text-dark'
                    }
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCloseTab(tab.id)}
                  >
                    X
                  </span>
                </div>
              </li>
            );
          })}
          <li className="nav-item">
            <a
              className="nav-link text-dark"
              aria-current="page"
              href="#new-tab"
              onClick={handleAddTab}
            >
              &#10010;
            </a>
          </li>
        </ul>
        <div className="tab-content ms-2 me-2">
          {tabs?.map(tab => {
            return (
              <div
                id={tab.id}
                className={classNames('tab-pane fade', {
                  'show active': tab.active
                })}
                key={tab.id}
              >
                <div className="input-group mb-2 mt-2">
                  <span className="input-group-text">Title of tab</span>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={tab.title}
                    onChange={e => handleChangeTitle(e, tab.id)}
                  />
                </div>
                <TextEditor
                  tab={tab}
                  handleChangeContent={handleChangeContent}
                />
              </div>
            );
          })}
        </div>
        {errors[name] && (
          <span className="text-danger ms-2 fw-bold">
            {errors[name].message}
          </span>
        )}
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={setDefaultValue(defaultValue)}
      rules={getRules()}
      render={renderContent}
    />
  );
};

export default DescriptionBox;
