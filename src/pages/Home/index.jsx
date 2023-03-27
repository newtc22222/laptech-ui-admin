import React from 'react';

import { makeToast, toastType } from '../../utils/makeToast';

import CheckLoginTimeout from '../../components/validation/CheckLoginTimeout';
import PageHeader from '../../components/common/PageHeader';
import CardInformationGroup from './CardInformationGroup';

function DashBoard() {
  return (
    <CheckLoginTimeout>
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
    </CheckLoginTimeout>
  );
}

export default DashBoard;
