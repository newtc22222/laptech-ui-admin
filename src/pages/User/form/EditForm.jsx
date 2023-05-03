import React from 'react';
import { useSelector } from 'react-redux';

import {
  CheckBox,
  CheckBoxGroup,
  SelectedBox,
  TextInput
} from '../../../components/validation';
import useFetch from '../../../hooks/useFetch';
import content from '../content';

/**
 * @since 2023-02-14
 */
const EditForm = ({
  user,
  roleList,
  register,
  control,
  errors,
  getValues,
  ...props
}) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { data: roleOfUser } = useFetch(`/users/${user?.id}/roles`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!user || !roleList || !roleOfUser) return <></>;

  const configOption = roleList
    ? roleList.map(role => {
        return {
          id: role.id,
          label: role.name,
          className: 'mt-1'
        };
      })
    : [];

  return (
    <>
      <TextInput
        label={content.form.name}
        register={register}
        errors={errors}
        attribute="name"
        defaultValue={user.name}
        // readOnly={user.name}
        required
        errorMessage={content.error.name}
      />
      <SelectedBox
        className="border rounded-2 mb-2"
        label={content.form.gender}
        control={control}
        errors={errors}
        name="gender"
        defaultValue={user.gender}
        options={content.genderOptions}
        required
      />
      <TextInput
        label={content.form.dob}
        register={register}
        errors={errors}
        attribute="dateOfBirth"
        type="date"
        defaultValue={user.dateOfBirth}
        readOnly
      />
      <TextInput
        label={content.form.phone}
        register={register}
        errors={errors}
        attribute="phone"
        defaultValue={user.phone}
        readOnly
      />
      <TextInput
        label={content.form.email}
        register={register}
        errors={errors}
        attribute="email"
        defaultValue={user.email}
        readOnly
      />
      <CheckBoxGroup
        control={control}
        errors={errors}
        title={content.form.roles}
        className="d-flex flex-column gap-1 border rounded my-2 px-2 py-1"
        name="roleList"
        options={configOption}
        required
        getValues={getValues}
        defaultValue={roleOfUser.map(role => {
          return {
            id: role.id,
            label: role.name,
            className: 'mt-1'
          };
        })}
      />
      <CheckBox
        control={control}
        label={content.form.status}
        name="active"
        useSwitch
        checked={user.active}
      />
    </>
  );
};

export default EditForm;
