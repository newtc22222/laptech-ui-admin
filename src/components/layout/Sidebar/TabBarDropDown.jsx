import React from 'react';
import classNames from 'classnames';

import { useAppContext } from '../../context/AppContext';
import TabBar from './TabBar';

const TabBarDropDown = ({ tab, toggle }) => {
  const { activeTab } = useAppContext();
  const { name, title, icon, subTab } = tab;

  const getStyle = () => {
    return activeTab.tab === name
      ? { cursor: 'pointer', backgroundColor: '#0e4893' }
      : { cursor: 'pointer' };
  };

  return (
    <li>
      <div
        className={classNames('nav-link px-3 link-light', {
          'link-dark fw-bold': activeTab.subTab === name,
          'd-flex align-items-center': toggle,
          'text-center': !toggle
        })}
        data-bs-toggle="collapse"
        data-bs-target={`#${name}-collapse`}
        aria-expanded={activeTab.tab === name}
        aria-controls={`${name}-collapse`}
        style={getStyle()}
      >
        {icon}
        {toggle && (
          <span className="ms-3 text-uppercase d-none d-lg-inline">
            {title}
          </span>
        )}
      </div>
      <div
        className={classNames('bg-primary collapse', {
          show: activeTab.tab === name
        })}
        id={`${name}-collapse`}
      >
        <ul
          className="link-toggle-nav list-unstyled fw-normal small"
          id={'sub-' + name}
          data-bs-parent="#menu"
        >
          {subTab?.map(tab => {
            return (
              <TabBar
                key={tab.name}
                name={tab.name}
                title={tab.title}
                url={tab.url}
                icon={tab.icon}
                parentName={name}
                toggle={toggle}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default TabBarDropDown;
