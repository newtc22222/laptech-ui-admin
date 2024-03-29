import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalForm, Tabbed } from '../../../components/common';
import { Form, InputMultipleImage } from '../../../components/validation';

import useFetch from '../../../hooks/useFetch';
import { productImageService, uploadService } from '../../../services';
import {
  chooseFieldsOfObject,
  isEqualObjectExact,
  getUpdateByUserInSystem,
  makeToast,
  toastType
} from '../../../utils';
import content from '../content';

const ProductImageForm = ({ product, handleBack, ...rest }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({ defaultValues: imageList });
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const { data: imageList } = useFetch(`/products/${product.id}/images`);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      makeToast(content.error.missing, toastType.error);
    }
  }, [errors]);

  if (!imageList) return <></>;

  function mapObjectImageToArr(data) {
    const newData = [];
    Object.keys(data).forEach(key => {
      data[key].forEach(img => {
        newData.push({
          productId: product.id,
          url: img,
          type: key
        });
      });
    });
    return newData;
  }

  const handleSaveData = async data => {
    const oldData = chooseFieldsOfObject(imageList, [
      'productId',
      'url',
      'type'
    ]);
    const newData = mapObjectImageToArr(data);
    if (isEqualObjectExact(oldData, newData)) {
      makeToast(content.nothingChange, toastType.info);
      return;
    }

    // handle new data
    const newData_is_string = newData.filter(
      img => typeof img.url === 'string'
    );
    const imgRemove = _.differenceWith(oldData, newData_is_string, _.isEqual);

    const imgAdd = newData.filter(img => typeof img.url !== 'string');

    try {
      const result = await uploadService.cloudinaryMultiple(
        imgAdd.map(img => img.url),
        'product/' + product.id
      );

      productImageService.updateMultiple(
        dispatch,
        {
          addList: result.map((object, idx) => {
            const newImage = {
              id: crypto.randomUUID().replace(/\s/g, ''),
              productId: product.id,
              type: imgAdd[idx].type,
              url: object.secure_url,
              ...getUpdateByUserInSystem()
            };
            return newImage;
          }),
          removeList: imgRemove.map(img => imageList[_.findIndex(oldData, img)])
        },
        product.id,
        accessToken
      );
      handleBack();
    } catch (error) {
      makeToast(content.error.upload, toastType.error);
    }
  };

  function getConfigTab(imageList) {
    return [
      {
        title: content.form_image.advertise,
        content: (
          <InputMultipleImage
            className="my-3 mx-3"
            control={control}
            errors={errors}
            name="ADVERTISE"
            defaultValue={imageList
              .filter(img => img.type === 'ADVERTISE')
              .map(img => img.url)}
            required
            getValues={getValues}
          />
        )
      },
      {
        title: content.form_image.detail,
        content: (
          <InputMultipleImage
            className="my-3 mx-3"
            control={control}
            errors={errors}
            name="DETAIL"
            defaultValue={imageList
              .filter(img => img.type === 'DETAIL')
              .map(img => img.url)}
            required
            getValues={getValues}
          />
        )
      },
      {
        title: content.form_image.extra,
        content: (
          <InputMultipleImage
            className="my-3 mx-3"
            control={control}
            errors={errors}
            name="EXTRA"
            defaultValue={imageList
              .filter(img => img.type === 'EXTRA')
              .map(img => img.url)}
          />
        )
      },
      {
        title: content.form_image.feedback,
        content: (
          <InputMultipleImage
            className="my-3 mx-3"
            control={control}
            errors={errors}
            name="FEEDBACK"
            defaultValue={imageList
              .filter(img => img.type === 'FEEDBACK')
              .map(img => img.url)}
            disabled
          />
        )
      }
    ];
  }

  return (
    <ModalForm object={product} title={content.form_image.title} disabledFooter>
      <Form
        handleSubmit={handleSubmit}
        submitAction={handleSaveData}
        cancelAction={handleBack}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      >
        <Tabbed config={getConfigTab(imageList)} fill />
      </Form>
    </ModalForm>
  );
};

export default ProductImageForm;
