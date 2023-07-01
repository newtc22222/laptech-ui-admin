import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ModalForm, TransferList } from '../../../components/common';
import { Form } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { labelService, productLabelService } from '../../../services';
import { makeToast, toastType } from '../../../utils';
import content from '../content';

const renderOption = label => {
  return (
    <div
      key={label.id}
      title={label.title}
      className="d-flex justify-content-center border border-primary rounded-2 px-3 py-1"
    >
      <div className="me-2" dangerouslySetInnerHTML={{ __html: label.icon }} />
      {label.name + ' - ' + label.title}
    </div>
  );
};

const ProductLabelForm = ({ product, handleBack, ...props }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const {
    data: labelList,
    isFetching,
    error
  } = useSelector(state => state['labels']);

  const { data: labelListOfProduct } = useFetch(
    `/products/${product.id}/labels`
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting }
  } = useForm({
    defaultValues: {
      labelList: labelListOfProduct || []
    }
  });

  useEffect(() => {
    if (!labelList || error) labelService.getAll(dispatch);
  }, []);

  useEffect(() => {
    if (labelListOfProduct) {
      reset({
        labelList: labelListOfProduct.map(label => ({
          id: label.id,
          value: label.name,
          render: renderOption(label)
        }))
      });
    }
  }, [labelListOfProduct]);

  const handleSaveData = async data => {
    const oldData = labelListOfProduct.map(d => d.id);
    const newData = data.labelList.map(d => d.id);
    const removeLabel = _.differenceWith(oldData, newData, _.isEqual);
    const addLabel = _.differenceWith(newData, oldData, _.isEqual);

    if (removeLabel.length === 0 && addLabel.length === 0) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    await productLabelService.updateMultiple(
      dispatch,
      { addList: addLabel, removeList: removeLabel },
      product.id,
      accessToken
    );

    handleBack();
  };

  if (!labelListOfProduct || isFetching) return <></>;

  return (
    <ModalForm object={product} title={content.form_label.title} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <h4 className="mb-3">{product.name}</h4>
        <Controller
          control={control}
          name="labelList"
          // rules={{
          //   validate: {
          //     length: options => options.length > 1 || 'fail'
          //   }
          // }}
          render={({ field: { value, onChange } }) => {
            const optionConfig = labelList.map(label => ({
              id: label.id,
              value: label.name,
              render: renderOption(label)
            }));
            return (
              <TransferList
                options={optionConfig}
                choiceList={value}
                setChoiceList={onChange}
              />
            );
          }}
        />
      </Form>
    </ModalForm>
  );
};

export default ProductLabelForm;
