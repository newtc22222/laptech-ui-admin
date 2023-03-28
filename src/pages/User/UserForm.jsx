import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userService } from '../../services';

import ModalForm from '../../components/common/ModalForm';
// TODO: Build validate form
import { Form, InputImage, TextInput } from '../../components/validation';
import content from './content';

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
    }
  };

  const handleSaveData = async () => {
    try {
      const updateUser = {};

      // await apiBrands.updateBrand(dispatch, updateUser, user.id, accessToken);
      handleBack();
    } catch (err) {
      console.log(err);
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
