import React, { useCallback, useState } from 'react';
import _ from 'lodash';

import TextEditor from '../../../../components/common/TextEditor';

import './NavTab.css';

const DescriptionBox = ({ descriptionText }) => {
  const clear_text = descriptionText
    ? descriptionText.replace(/style="/g, 'style=\\"').replace(/\);"/g, ');\\"')
    : null;
  const [tabs, setTabs] = useState(
    JSON.parse(clear_text) || [
      {
        id: crypto.randomUUID().replace(/-/g, ''),
        title: 'New tab',
        content: '',
        active: true
      }
    ]
  );

  const handleAddTab = () => {
    setTabs(prev => {
      prev = prev.map(tab => {
        tab.active = false;
        return tab;
      });
      prev.push({
        id: crypto.randomUUID().replace(/-/g, ''),
        title: 'New tab',
        content: '',
        active: true
      });
      return prev;
    });
  };

  const handleChooseTab = tabId => {
    setTabs(prev => {
      prev = prev.map(tab => {
        tab.active = tab.id === tabId;
        return tab;
      });
      return prev;
    });
  };

  const handleCloseTab = tabId => {
    setTabs(prev => {
      const oldIndex = _.findIndex(prev, ['id', tabId]); // get old index
      prev = prev.filter(tab => tab.id !== tabId); // remove old

      // choose new active tab (if ...)
      const tabActive = _.findIndex(prev, tab => tab.active === true);
      if (tabActive === -1) {
        let new_index;
        if (oldIndex === 0) {
          new_index = 0;
        } else if (oldIndex === prev.length) {
          new_index = prev.length - 1;
        } else {
          new_index = oldIndex - 1;
        }
        prev = _.map(prev, tab => {
          const tab_index = _.indexOf(prev, tab);
          tab.active = tab_index === new_index;
          return tab;
        });
      }

      return prev;
    });
  };

  const handleChangeTitle = (e, tabId) => {
    setTabs(prev => {
      prev = prev.map(tab => {
        if (tab.id === tabId) {
          tab.title = e.target.value;
        }
        return tab;
      });
      return prev;
    });
  };

  const handleChangeContent = useCallback((newContent, tabId) => {
    setTabs(prev => {
      prev = prev.map(tab => {
        if (tab.id === tabId) {
          tab.content = newContent;
        }
        return tab;
      });
      return prev;
    });
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-success m-2"
        onClick={() => console.log(JSON.stringify(tabs))}
      >
        Save
      </button>
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
            onClick={() => handleAddTab()}
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
              className={'tab-pane fade' + (tab.active ? ' show active' : '')}
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
              <TextEditor tab={tab} handleSaveContent={handleChangeContent} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DescriptionBox;
