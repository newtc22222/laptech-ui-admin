import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalForm } from '../../../components/common';
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
    formState: { errors, isSubmitting, isDirty }
  } = useForm();

  const handleCreateData = async data => {
    const newTicket = {
      productId: data.product[0].id,
      quantity: data.quantity,
      importedPrice: data.importedPrice,
      importedDate: data.importedDate,
      ...getUpdateByUserInSystem()
    };

    await importProductService.create(dispatch, newTicket, accessToken);
    handleBack();
  };

  const handleSaveData = async data => {
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

    await importProductService.update(
      dispatch,
      { ...newData, ...getUpdateByUserInSystem() },
      importTicketEdit.id,
      accessToken
    );
    handleBack();
  };

  if (!productList) return <></>;

  return (
    <ModalForm object={importTicketEdit} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={importTicketEdit ? handleSaveData : handleCreateData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
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
    </ModalForm>
  );
};

export default ImportedForm;
