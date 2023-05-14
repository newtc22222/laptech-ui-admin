import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, Loading } from '../../../components/common';
import { Form, CheckBoxGroup } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { labelService, productLabelService } from '../../../services';
import { makeToast, toastType } from '../../../utils';
import content from '../content';

const renderOption = label => {
  return (
    <div
      title={label.title}
      className="d-flex justify-content-center border border-primary rounded-2 px-3 py-1"
    >
      <div className="me-2" dangerouslySetInnerHTML={{ __html: label.icon }} />
      {label.name + ' - ' + label.title}
    </div>
  );
};

const ProductLabelForm = ({ product, handleBack, ...props }) => {
  const {
    data: labelList,
    isFetching,
    error
  } = useSelector(state => state['labels']);
  const [refreshKey, setRefreshKey] = useState(0);
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const { data: labelListOfProduct } = useFetch(
    `/products/${product.id}/labels?key=${refreshKey}`
  );

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!labelList || error) labelService.getAll(dispatch);
  }, []);

  if (!labelListOfProduct) return <></>;

  const handleSaveData = data => {
    const oldData = labelListOfProduct.map(d => d.id);
    const newData = data.labelList.map(d => d.id);
    const removeLabel = _.differenceWith(oldData, newData, _.isEqual);
    const addLabel = _.differenceWith(newData, oldData, _.isEqual);

    if (removeLabel.length === 0 && addLabel.length === 0) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    // handle change
    Promise.all(
      removeLabel.map(async labelId => {
        await productLabelService.remove(
          dispatch,
          { labelId: labelId },
          product.id,
          accessToken
        );
      })
    );
    Promise.all(
      addLabel.map(async labelId => {
        await productLabelService.add(
          dispatch,
          { labelId: labelId },
          product.id,
          accessToken
        );
      })
    );
    setRefreshKey(prev => prev + 1);
  };

  const MainForm = () => {
    if (isFetching) return <Loading />;

    const configOption = labelList
      ? labelList.map(l => {
          return {
            id: l.id,
            label: l.name + ' ' + l.title,
            className: 'my-1',
            render: renderOption(l)
          };
        })
      : [];

    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
      >
        <CheckBoxGroup
          control={control}
          errors={errors}
          className="d-flex flex-column gap-1"
          name="labelList"
          options={configOption}
          defaultValue={labelListOfProduct.map(l => {
            return {
              id: l.id,
              label: l.name + ' ' + l.title,
              className: 'my-1',
              render: renderOption(l)
            };
          })}
          searchBar
        />
      </Form>
    );
  };

  return (
    <ModalForm object={product} title={content.form_label.title} disabledFooter>
      <MainForm />
    </ModalForm>
  );
};

export default ProductLabelForm;
