import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import {
  CalendarPicker,
  ModalConfirm,
  PageHeader
} from '../../components/common';
import BannerBox from './components/BannerBox';
import BannerForm from './components/BannerForm';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';
import { bannerService } from '../../services';
import { getUpdateByUserInSystem } from '../../utils';
import content from './content';

const Banner = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterDate, setFilterDate] = useState(new Date());
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: bannerEdit,
    modalValue,
    action
  } = useWorkspace();

  const handleShowDeleteModal = bannerId => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} khỏi hệ thống không?`,
      async () => {
        await bannerService.remove(
          dispatch,
          getUpdateByUserInSystem(),
          bannerId,
          accessToken
        );
        setRefreshKey(prev => prev + 1);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

  function renderFormModal() {
    switch (workMode) {
      case WorkMode.create:
        return (
          <BannerForm
            handleBack={() => {
              setRefreshKey(prev => prev + 1);
              action.changeWorkMode(WorkMode.view);
            }}
          />
        );
      case WorkMode.edit:
        return (
          <BannerForm
            banner={bannerEdit}
            handleBack={() => {
              setRefreshKey(prev => prev + 1);
              action.changeWorkMode(WorkMode.view);
            }}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {renderFormModal()}
      <PageHeader pageName={content.pageName}>
        <button
          className="btn btn-primary fw-bold"
          type="button"
          onClick={() => action.changeWorkMode(WorkMode.create)}
        >
          {content.titleBtnAdd}
        </button>
      </PageHeader>
      <Row>
        <Col xl={3}>
          <div className="sticky-top" style={{ top: '10vh' }}>
            <CalendarPicker selected={filterDate} setSelected={setFilterDate} />
          </div>
        </Col>
        <Col xl={9}>
          <BannerBox
            refreshKey={refreshKey}
            filterDate={filterDate}
            handleShowDeleteModal={handleShowDeleteModal}
            handleShowUpdateModal={banner => action.setUpdateMode(banner)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Banner;
