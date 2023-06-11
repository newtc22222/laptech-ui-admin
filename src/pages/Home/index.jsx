import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageHeader from '../../components/common/PageHeader';
import CardInformationGroup from './CardInformationGroup';

import exportService from '../../services/export/export.service';
import { makeToast, toastType } from '../../utils/makeToast';

function DashBoard() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);

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
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => exportService.test(accessToken, dispatch)}
          >
            Export data
          </button>
        </div>
      </PageHeader>
      <CardInformationGroup />
    </div>
  );
}

export default DashBoard;
