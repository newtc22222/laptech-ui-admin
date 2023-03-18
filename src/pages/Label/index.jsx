import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWorkspace from '../../hooks/useWorkspace';
import WorkMode from '../../common/WorkMode';
import apiLabel from '../../apis/product/label.api';

import LabelTable from './LabelTable';
import LabelForm from './LabelForm';

import ModalConfirm from '../../components/common/ModalConfirm';
import Loading from '../../components/common/Loading';

const pageName = 'Nhãn thuộc tính của sản phẩm';
const objectName = 'labels';
const titleButtonAdd = 'Thêm thông tin';

/**
 * @since 2023-02-13
 */
const Label = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [
    dispatch,
    Navigate,
    workMode,
    showModal,
    labelEdit,
    modalValue,
    action
  ] = useWorkspace();

  if (accessToken === null || accessToken === undefined)
    return <Navigate to="/auth/login" />;

  const { labelList, isFetching, error } = useSelector(
    state => state[objectName]
  );

  useEffect(() => {
    if (!labelList) apiLabel.getAllLabels(dispatch);
  }, []);

  const handleShowDeleteModal = useCallback((labelId, labelName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${labelName} khỏi hệ thống không?`,
      () => {
        apiLabel.deleteLabel(dispatch, labelId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  }, []);

  // Change work mode
  if (workMode === WorkMode.create) {
    return (
      <LabelForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
    );
  }
  if (workMode === WorkMode.edit) {
    return (
      <LabelForm
        label={labelEdit}
        handleBack={() => action.changeWorkMode(WorkMode.view)}
      />
    );
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      {showModal && (
        <ModalConfirm
          show={showModal}
          setShow={action.showModal}
          props={modalValue}
        />
      )}
      {workMode === WorkMode.create && (
        <LabelForm handleBack={() => action.changeWorkMode(WorkMode.view)} />
      )}
      {workMode === WorkMode.edit && (
        <LabelForm
          label={labelEdit}
          handleBack={() => action.changeWorkMode(WorkMode.view)}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{pageName}</h1>
        <button
          className="btn btn-primary fw-bold"
          onClick={action.setCreateMode}
        >
          {titleButtonAdd}
        </button>
      </div>
      <LabelTable
        labelList={labelList}
        labelTotalRecord={labelList?.length}
        handleSetUpdateMode={label => action.setUpdateMode(label)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default Label;
