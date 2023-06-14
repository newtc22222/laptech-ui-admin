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
import { labelService } from '../../services';

const pageName = 'Nhãn thuộc tính của sản phẩm';
const objectName = 'labels';
const titleButtonAdd = 'Thêm thông tin';

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
  } = useSelector(state => state[objectName]);

  useEffect(() => {
    if (!labelList || error) labelService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((labelId, labelName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${labelName} khỏi hệ thống không?`,
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
      <PageHeader pageName={pageName}>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
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
