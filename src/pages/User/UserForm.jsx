import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

import { Loading, ModalForm } from '../../components/common';
import { Form } from '../../components/validation';
import CreateForm from './form/CreateForm';
import EditForm from './form/EditForm';

import useFetch from '../../hooks/useFetch';
import { roleService, userService, userRoleService } from '../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem
} from '../../utils';
import content from './content';

/**
 * @since 2023-02-14
 */
const UserForm = ({ user, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const userInSystem = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const { data: roleOfUser } = useFetch(
    `/users/${user?.id || userInSystem.id}/roles`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  const {
    data: roleList,
    isRoleFetching,
    isRoleError
  } = useSelector(state => state['roles']);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast(content.error.missing, toastType.error);
    }
  }, [errors]);

  useEffect(() => {
    if (!roleList || isRoleError) roleService.getAll(dispatch, accessToken);
  }, []);

  const handleCreateData = data => {
    const userData = {
      name: data.name,
      gender: data.gender.value,
      dateOfBirth: data.dateOfBirth,
      email: !data.email ? undefined : data.email,
      phone: data.phone,
      password: data.password,
      ...getUpdateByUserInSystem()
    };

    userService.create(dispatch, userData, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    const newData = {
      ...user,
      name: data.name,
      gender: typeof data.gender === 'string' ? data.gender : data.gender.value,
      dateOfBirth: data.dateOfBirth,
      email: !data.email ? null : data.email,
      active: data.active
    };
    // check role
    const oldRole = roleOfUser.map(r => r.id);
    const newRole = data.roleList.map(r => r.id);
    const removeRole = _.differenceWith(oldRole, newRole, _.isEqual);
    const addRole = _.differenceWith(newRole, oldRole, _.isEqual);

    // handle change
    if (isEqualObject(newData, user) && isEqualObject(removeRole, addRole)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    } else {
      if (!isEqualObject(newData, user)) {
        userService.updatePartial(
          dispatch,
          { ...newData, ...getUpdateByUserInSystem() },
          user.id,
          accessToken
        );
      }
      // role
      addRole.forEach(r => {
        userRoleService.add(dispatch, { roleId: r }, user.id, accessToken);
      });
      removeRole.forEach(r => {
        userRoleService.remove(dispatch, { roleId: r }, user.id, accessToken);
      });
      // active
      if (newData.active !== user.active) {
        newData.active
          ? userService.activeUser(
              user.id,
              getUpdateByUserInSystem(),
              accessToken
            )
          : userService.blockUser(
              user.id,
              getUpdateByUserInSystem(),
              accessToken
            );
      }

      reset();
      handleBack();
    }
  };

  const MainForm = () => {
    if (!roleList || isRoleFetching) return <Loading />;

    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={user ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
      >
        {user ? (
          <EditForm
            user={user}
            roleList={roleList}
            roleOfUser={roleOfUser}
            register={register}
            control={control}
            errors={errors}
            getValues={getValues}
          />
        ) : (
          <CreateForm
            roleList={roleList}
            register={register}
            control={control}
            errors={errors}
            getValues={getValues}
          />
        )}
      </Form>
    );
  };

  return (
    <ModalForm object={user} disabledFooter>
      <MainForm />
    </ModalForm>
  );
};

export default UserForm;
