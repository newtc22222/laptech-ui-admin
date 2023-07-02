import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ModalConfirm,
  PageHeader,
  Loading,
  ServerNotResponse
} from '../../components/common';
import LabelTable from './LabelTable';
import LabelForm from './LabelForm';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';
import { exportService, labelService } from '../../services';

import content from './content';

/**
 * @since 2023-02-13
 */
const Label = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    dispatch,
    workMode,
    showModal,
    objectEdit: labelEdit,
    modalValue,
    action
  } = useWorkspace();

  const {
    data: labelList,
    isFetching,
    error
  } = useSelector(state => state['labels']);

  useEffect(() => {
    if (!labelList || error) labelService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((labelId, labelName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${content.pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${content.pageName.toLowerCase()} ${labelName} khỏi hệ thống không?`,
      () => {
        labelService.delete(dispatch, labelId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  const handleBack = useCallback(
    () => action.changeWorkMode(WorkMode.view),
    []
  );

  const handleSetUpdateMode = useCallback(
    label => action.setUpdateMode(label),
    []
  );

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <div>
      <ModalConfirm
        show={showModal}
        setShow={action.showModal}
        {...modalValue}
      />
      {workMode === WorkMode.create && <LabelForm handleBack={handleBack} />}
      {workMode === WorkMode.edit && (
        <LabelForm label={labelEdit} handleBack={handleBack} />
      )}
      <PageHeader pageName={content.pageName}>
        <div className="btn-group">
          <button
            className="btn btn-outline-primary fw-bold"
            onClick={() => exportService.csv(accessToken, dispatch, 'labels')}
            disabled={!labelList || isFetching}
          >
            {content.titleBtnExport}
          </button>
          <button
            className="btn btn-outline-primary fw-bold"
            onClick={action.setCreateMode}
            disabled={!labelList || isFetching}
          >
            {content.titleBtnAdd}
          </button>
        </div>
      </PageHeader>
      {!labelList || isFetching ? (
        <Loading />
      ) : (
        <LabelTable
          labelList={labelList}
          handleSetUpdateMode={handleSetUpdateMode}
          handleShowDeleteModal={handleShowDeleteModal}
        />
      )}
    </div>
  );
};

export default Label;
