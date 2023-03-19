import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/common/ModalForm';

import apiUsers from '../../apis/user.api';
import { addToast } from '../../redux-feature/toast_notify';

/**
 * @since 2023-02-14
 */
const UserForm = ({ user, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleCreateData = async () => {
    try {
      const updateUser = {};

      // await apiUsers.createNewUser(dispatch, updateUser, accessToken);
      handleBack();
    } catch (err) {
      console.log(err);
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Bạn chưa cập nhật hình ảnh cho ứng dụng!'
        })
      );
    }
  };

  const handleSaveData = async () => {
    try {
      const updateUser = {};

      // await apiBrands.updateBrand(dispatch, updateUser, user.id, accessToken);
      handleBack();
    } catch (err) {
      console.log(err);
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Bạn chưa cập nhật hình ảnh cho ứng dụng!'
        })
      );
    }
  };

  return (
    <ModalForm
      object={user}
      handleBack={handleBack}
      action={() => {
        user ? handleSaveData() : handleCreateData();
      }}
      FormContent={() => <></>}
    />
  );
};

export default UserForm;
