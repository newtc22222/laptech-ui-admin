import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/common/ModalForm';

import apiLabel from '../../apis/product/label.api';

import { getUpdateByUserInSystem } from '../../helper/getUser';

const titleName = 'Tiêu đề (hiển thị trực tiếp)';
const titleIcon = 'Biểu tượng đại diện';
const titleTitle = 'Thông tin mô tả khi người dùng trỏ chuột vào';
const titleDescription = 'Thông tin chi tiết về nhãn sản phẩm';
const linkToChooseIcon = 'https://icons.getbootstrap.com/';
const hintToChooseIcon = `Truy cập vào link ${linkToChooseIcon} sau đó chọn 1 icon và copy thẻ icon được để sẵn.`;

/**
 * @since 2023-02-13
 */
const LabelForm = ({ label, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const iconRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleCreateData = async () => {
    const newLabel = {
      name: nameRef.current.value,
      icon: iconRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      ...getUpdateByUserInSystem()
    };

    await apiLabel.create(dispatch, newLabel, accessToken);
    handleBack();
  };

  const handleSaveData = async () => {
    const newLabel = {
      name: nameRef.current.value,
      icon: iconRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      modifiedDate: new Date().toISOString(),
      ...getUpdateByUserInSystem()
    };
    await apiLabel.update(dispatch, newLabel, label.id, accessToken);
    handleBack();
  };

  const renderForm = (
    <>
      <div className="mb-3">
        <label htmlFor="label-icon" className="form-label fw-bold">
          {titleIcon}
        </label>
        <a
          className="ms-3 text-primary text-decoration-none"
          href={linkToChooseIcon}
          target="_blank"
        >
          {hintToChooseIcon}
        </a>
        <input
          type="text"
          className="form-control"
          id="label-icon"
          defaultValue={label?.icon}
          ref={iconRef}
          placeholder="<i class='bi bi-house'></i>"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="label-name" className="form-label">
          {titleName}
        </label>
        <input
          type="text"
          className="form-control"
          id="label-name"
          defaultValue={label?.name}
          ref={nameRef}
          placeholder="Core i3, Core i5, NVIDIA, Led RGB, ..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="label-title" className="form-label">
          {titleTitle}
        </label>
        <input
          type="text"
          className="form-control"
          id="label-title"
          defaultValue={label?.title}
          ref={titleRef}
          placeholder="Core i3 8560U ..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="label-description" className="form-label">
          {titleDescription}
        </label>
        <textarea
          className="form-control"
          id="label-description"
          defaultValue={label?.description}
          ref={descriptionRef}
          placeholder="New Core i3 8th generation with safe battery mode ..."
        />
      </div>
    </>
  );

  return (
    <ModalForm
      object={label}
      handleBack={handleBack}
      action={() => {
        label ? handleSaveData() : handleCreateData();
      }}
    >
      {renderForm}
    </ModalForm>
  );
};

export default LabelForm;
