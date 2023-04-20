import React from 'react';
import { useForm } from 'react-hook-form';

import { Form, TextInput } from '../../components/validation';

const LoginForm = () => {
  const storeDataHash = localStorage.getItem('storeData');
  let rmb_phone = '',
    rmb_password = '',
    rmb_check = false;

  if (storeDataHash) {
    const storeData = HashString.decrypt(storeDataHash);
    [rmb_phone, rmb_password, rmb_check] = storeData.split(';');
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return <div>LoginForm</div>;
};

export default LoginForm;
