import React from 'react';

import { makeToast, toastType } from '../../utils/makeToast';

import PageHeader from '../../components/common/PageHeader';
import CardInformationGroup from './CardInformationGroup';

function DashBoard() {
  return (
    <div>
      <PageHeader pageName="Home">
        <div className="btn-group me-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              makeToast('Show toast here!', toastType.success);
            }}
          >
            Share chart
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary">
            Export data
          </button>
        </div>
      </PageHeader>
      <CardInformationGroup />
    </div>
  );
}

export default DashBoard;
