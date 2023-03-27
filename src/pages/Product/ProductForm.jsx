import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/common/ModalForm';

import apiProduct from '../../apis/product/product.api';
import apiLabel from '../../apis/product/label.api';
import apiDiscount from '../../apis/product/discount.api';

import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';

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

  const renderForm = <></>;

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

export default ProductForm;
