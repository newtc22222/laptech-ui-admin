import React from 'react';

import { SelectedBox, TextInput } from '../../../components/validation';
import content from '../content';

const CreateForm = ({ register, control, errors, getValues, ...props }) => {
  return (
    <>
      <TextInput
        label={content.form.name}
        register={register}
        errors={errors}
        attribute="name"
        required
        errorMessage={content.error.name}
      />
      <TextInput
        label={content.form.phone}
        register={register}
        errors={errors}
        attribute="phone"
        required
        errorMessage={content.error.phone}
      />
      <TextInput
        label={content.form.password}
        register={register}
        errors={errors}
        type="password"
        attribute="password"
        title={content.form.passwordTitle}
        required
        errorMessage={content.error.password}
      />
      <TextInput
        label={content.form.email}
        register={register}
        errors={errors}
        attribute="email"
      />
      <TextInput
        label={content.form.dob}
        register={register}
        errors={errors}
        attribute="dateOfBirth"
        defaultValue="2000-01-01"
        type="date"
        required
        errorMessage={content.error.dob}
      />
      <SelectedBox
        className="border rounded-2 mb-2"
        label={content.form.gender}
        control={control}
        errors={errors}
        name="gender"
        options={content.genderOptions}
        required
      />
    </>
  );
};

export default CreateForm;
