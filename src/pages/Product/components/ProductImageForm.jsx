import React, { useEffect, useState } from 'react';
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

const ProductImageForm = ({ product, handleBack, ...props }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm();

  const [queryImageURL, setQueryImageURL] = useState(
    `/products/${product.id}/images`
  );

  const { data: imageList } = useFetch(queryImageURL);

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

  const handleSaveData = data => {
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
    if (imgRemove.length > 0) {
      imgRemove.forEach(img => {
        productImageService.remove(
          dispatch,
          getUpdateByUserInSystem(),
          imageList[_.findIndex(oldData, img)].id,
          accessToken
        );
      });
    }

    const imgAdd = newData.filter(img => typeof img.url !== 'string');
    if (imgAdd.length > 0) {
      const formData = new FormData();
      imgAdd.forEach(img => formData.append('files', img.url, img.url.name));
      const promise = new Promise((resolve, reject) => {
        const result = uploadService.uploadMultipleImage(
          dispatch,
          formData,
          accessToken
        );
        if (result) resolve(result);
        reject(new Error('Cannot upload images!'));
      });

      promise
        .then(result => {
          result.forEach((url, idx) => {
            const newImage = {
              id: crypto.randomUUID().replace(/\s/g, ''),
              productId: product.id,
              type: imgAdd[idx].type,
              url: url,
              // feedbackId: "",
              ...getUpdateByUserInSystem()
            };
            productImageService.add(dispatch, newImage, accessToken);
          });
        })
        .catch(err => {
          makeToast(content.error.upload, toastType.error);
          reset();
        });
    }
    setQueryImageURL(
      `/products/${product.id}/images?rand=${Math.floor(Math.random() * 1000)}`
    );
    // handleBack();
  };

  const configTab = [
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

  const renderForm = (
    <Form
      handleSubmit={handleSubmit}
      submitAction={handleSaveData}
      cancelAction={handleBack}
    >
      <Tabbed config={configTab} fill />
    </Form>
  );

  return (
    <ModalForm object={product} title={content.form_image.title} disabledFooter>
      {renderForm}
    </ModalForm>
  );
};

export default ProductImageForm;
