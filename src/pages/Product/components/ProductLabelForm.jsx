import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, Loading } from '../../../components/common';

import { labelService, productService } from '../../../services';
import { Form, CheckBoxGroup } from '../../../components/validation';
import content from '../content';

const ProductLabelForm = ({ product, handleBack, ...props }) => {
  const {
    data: labelList,
    isFetching,
    error
  } = useSelector(state => state['labels']);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!labelList || error) labelService.getAll(dispatch);
  }, []);

  const handleSaveData = data => {
    console.log(data);
  };

  const renderForm = () => {
    if (isFetching) return <Loading />;
    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
      ></Form>
    );
  };

  return (
    <ModalForm object={product} title={content.form_label.title} disabledFooter>
      {renderForm()}
    </ModalForm>
  );
};

export default ProductLabelForm;
