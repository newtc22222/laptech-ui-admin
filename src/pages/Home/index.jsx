import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageHeader from '../../components/common/PageHeader';
import {
  CardInformationGroup,
  BrandProductChart,
  CategoryProductChart,
  LastedReceiptTable,
  TopUserList,
  UserAccessChart
} from './components';

import exportService from '../../services/export/export.service';
import { productService, statisticService, userService } from '../../services';
import content from './content';

function DashBoard() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const productObject = useSelector(state => state['products']);
  const userObject = useSelector(state => state['users']);

  const [userFigures, setUserFigures] = useState(null);

  const handleShareChart = useCallback(() => {}, []);
  const handleExportData = useCallback(() => {
    exportService.excel(accessToken, dispatch, [
      'brand',
      'category',
      'discount'
    ]);
  }, []);

  useEffect(() => {
    statisticService
      .getUsersFigures(dispatch, accessToken)
      .then(data => setUserFigures(data));
  }, []);

  useEffect(() => {
    if (!productObject.data) productService.getAll(dispatch);
  }, [productObject.data, dispatch]);

  useEffect(() => {
    if (!userObject.data) userService.getAll(dispatch, accessToken);
  }, [userObject.data, dispatch]);

  return (
    <>
      <PageHeader pageName={content.pageName}>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handleShareChart}
          >
            {content.btnShareChart}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handleExportData}
          >
            {content.btnExportData}
          </button>
        </div>
      </PageHeader>
      <CardInformationGroup />
      <div className="row mt-3">
        <div className="col-9 d-flex flex-column gap-2">
          {!!userObject.data && <UserAccessChart userFigures={userFigures} />}
          <LastedReceiptTable />
        </div>
        <div className="col-3 d-flex flex-column gap-2">
          {!!productObject.data && (
            <BrandProductChart productList={productObject.data} />
          )}
          {!!productObject.data && (
            <CategoryProductChart productList={productObject.data} />
          )}
          {!!userObject.data && <TopUserList userFigures={userFigures} />}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
