import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Loading, ModalForm } from '../../../components/common';
import { Form, TextInput } from '../../../components/validation';

import { importProductService } from '../../../services';
import {
  makeToast,
  toastType,
  isEqualObject,
  getUpdateByUserInSystem,
  chooseFieldsOfObject,
  getCurrencyString
} from '../../../utils';
import content from './content';
import SelectedInputBox from '../../../components/validation/SeletedInputBox';

const ImportedForm = ({ importTicketEdit, productList, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const productOptions = chooseFieldsOfObject(productList, [
    'id',
    'name',
    'listedPrice'
  ]).map(p => {
    return { id: p.id, label: p.name, listedPrice: p.listedPrice };
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast(content.error.missing, toastType.error);
    }
  }, []);

  const handleCreateData = data => {
    const newTicket = {
      productId: data.product[0].id,
      quantity: data.quantity,
      importedPrice: data.importedPrice,
      importedDate: data.importedDate,
      ...getUpdateByUserInSystem()
    };

    importProductService.create(dispatch, newTicket, accessToken);
    reset();
    handleBack();
  };

  const handleSaveData = data => {
    const isNotChange =
      Date.now() - Date.parse(importTicketEdit.importedDate) >
      1000 * 60 * 60 * 24 * 7;

    if (isNotChange) {
      makeToast(content.form.expired, toastType.warning);
      return;
    }

    const newTicket = {
      productId: data.product[0].id,
      quantity: data.quantity,
      importedPrice: data.importedPrice,
      importedDate: data.importedDate
    };
    const newData = { ...importTicketEdit, ...newTicket };

    if (isEqualObject(newData, importTicketEdit)) {
      makeToast(content.form.nothingChange, toastType.info);
      return;
    }

    importProductService.update(
      dispatch,
      { ...newData, ...getUpdateByUserInSystem() },
      importTicketEdit.id,
      accessToken
    );
    handleBack();
  };

  const MainForm = () => {
    if (!productList) return <Loading />;

    return (
      <Form
        handleSubmit={handleSubmit}
        submitAction={importTicketEdit ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
      >
        {importTicketEdit?.id && (
          <TextInput
            label={content.form.ticketId}
            register={register}
            errors={errors}
            attribute="id"
            defaultValue={importTicketEdit.id}
            readOnly
          />
        )}
        <SelectedInputBox
          label={content.form.productName}
          className="border rounded-2"
          name="product"
          control={control}
          errors={errors}
          placeholder="Choose product..."
          required
          getValues={getValues}
          defaultValue={
            importTicketEdit?.productId &&
            productOptions.filter(p => p.id === importTicketEdit.productId)[0]
          }
          options={productOptions}
        />
        <div className="text-primary">
          {content.recommendPrice +
            (!!watch('product') &&
              watch('product').length > 0 &&
              getCurrencyString(
                watch('product')[0].listedPrice,
                'vi-VN',
                'VND'
              ))}
        </div>
        <TextInput
          label={content.form.quantity}
          className="mt-3"
          register={register}
          errors={errors}
          attribute="quantity"
          type="number"
          min={1}
          max={5000}
          required
          defaultValue={importTicketEdit?.quantity || 10}
        />
        <TextInput
          label={content.form.price}
          register={register}
          errors={errors}
          attribute="importedPrice"
          type="number"
          min={1000}
          required
          defaultValue={importTicketEdit?.importedPrice || 5_000_000}
        />
        <TextInput
          label={content.form.date}
          register={register}
          errors={errors}
          attribute="importedDate"
          type="datetime-local"
          required
          defaultValue={
            importTicketEdit?.importedDate ||
            new Date().toISOString().slice(0, 19)
          }
        />
      </Form>
    );
  };

  return (
    <ModalForm object={importTicketEdit} disabledFooter>
      <MainForm />
    </ModalForm>
  );
};

export default ImportedForm;