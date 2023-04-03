import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Accordion } from 'react-bootstrap';

import { productService } from '../../services';

import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';

import { ModalForm, Loading } from '../../components/common';
// TODO: Build validate form
import { Form, InputImage, TextInput } from '../../components/validation';
import { DescriptionBox, SpecificationTable } from './ProductEditBox';
import content from './content';

// 1: brand, category
// n: image, label, discount
const ProductForm = ({ product, handleBack, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const { brandList, categoryList } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleCreateData = async () => {};

  const handleSaveData = async () => {};

  const renderForm = () => {
    if (!brandList || !categoryList) return <Loading />;
    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={product ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
      >
        <Accordion defaultActiveKey={['0', '2']} className="mb-3" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="text-uppercase">
                {content.form.basicInformation}
              </div>
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="text-uppercase">
                {content.form.specifications}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <SpecificationTable />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="text-uppercase">
                {content.form.descriptionDetail}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <DescriptionBox />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    );
  };

  return (
    <ModalForm object={product} disabledFooter>
      {renderForm()}
    </ModalForm>
  );
};

export default ProductForm;
