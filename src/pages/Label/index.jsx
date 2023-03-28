import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useWorkspace, { WorkMode } from '../../hooks/useWorkspace';

import { labelService } from '../../services';

import CheckLoginTimeout from '../../components/validation/CheckLoginTimeout';
import { ModalConfirm, PageHeader, Loading } from '../../components/common';
import ServerNotResponse from '../Error/ServerNotResponse';
import LabelTable from './LabelTable';
import LabelForm from './LabelForm';

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
    if (!labelList) labelService.getAll(dispatch);
  }, []);

  const handleShowDeleteModal = (labelId, labelName) => {
    action.addModalValue(
      `Xác nhận xoá thông tin ${pageName.toLowerCase()}`,
      `Bạn có thực sự muốn loại bỏ ${pageName.toLowerCase()} ${labelName} khỏi hệ thống không?`,
      () => {
        labelService.delete(dispatch, labelId, accessToken);
        action.showModal(false);
      }
    );
    action.showModal(true);
  };

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

  if (error) {
    return <ServerNotResponse />;
  }

  return (
    <CheckLoginTimeout>
      <div>
        {showModal && (
          <ModalConfirm
            show={showModal}
            setShow={action.showModal}
            {...modalValue}
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
        <PageHeader pageName={pageName}>
          <button
            className="btn btn-primary fw-bold"
            onClick={action.setCreateMode}
          >
            {titleButtonAdd}
          </button>
        </PageHeader>
        <LabelTable
          labelList={labelList}
          labelTotalRecord={labelList?.length || 0}
          handleSetUpdateMode={label => action.setUpdateMode(label)}
          handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
        />
      </div>
    </CheckLoginTimeout>
  );
};

export default Label;
