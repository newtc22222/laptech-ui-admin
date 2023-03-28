import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { labelService, productService } from '../../services';

import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';

import ModalForm from '../../components/common/ModalForm';
// TODO: Build validate form
import { Form, InputImage, TextInput } from '../../components/validation';
import content from './content';

// 1: brand, category
// n: image, label, discount
const ProductForm = ({ product, handleBack, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const { brandList, categoryList } = props;
  const {
    data: labelList,
    isLabelFetching,
    errorLabel
  } = useSelector(state => state['labels']);

  if (isLabelFetching) {
    return;
  }

  const handleCreateData = async () => {};

  const handleSaveData = async () => {};

  const renderForm = <div>Hello</div>;

  return (
    <ModalForm
      object={product}
      handleBack={handleBack}
      action={() => {
        product ? handleSaveData() : handleCreateData();
      }}
    >
      {renderForm}
    </ModalForm>
  );
};

export default ProductForm;
