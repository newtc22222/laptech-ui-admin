import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/common/ModalForm';

import apiBrand from '../../apis/product/brandAPI';
import apiUpload from '../../apis/upload.api';

import { makeToast, toastType } from '../../helper/makeToast';
import { getUpdateByUserInSystem } from '../../helper/getUser';

const titleName = 'Tên Thương hiệu';
const titleCountry = 'Quốc gia';
const titleEstablishDate = 'Ngày thành lập';
const titleLogo = 'Logo đại diện';
const hintToChooseImage = 'Nhấn trực tiếp vào hình ảnh để chọn file';

const BrandForm = ({ brand, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const countryRef = useRef();
  const dateRef = useRef();
  const [logo, setLogo] = useState({
    image:
      brand?.logo ||
      'https://placeholder.pics/svg/200x150/DEDEDE/555555/Choose%20image',
    file: brand?.logo || '',
    filename: ''
  });

  const handleChangeImage = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        setLogo({
          image: event.target.result,
          file: e.target.files[0],
          filename: e.target.files[0].name
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCreateData = () => {
    try {
      const formData = new FormData();
      formData.append('file', logo.file, logo.filename);
      const promise = new Promise((resolve, reject) => {
        const result = apiUpload.uploadImage(dispatch, formData, accessToken);
        if (result) resolve(result);
        reject(new Error('Cannot upload images!'));
      });

      const newBrand = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: null,
        ...getUpdateByUserInSystem()
      };

      promise.then(result => {
        newBrand.logo = result;
        apiBrand.create(dispatch, newBrand, accessToken);
        handleBack();
      });
    } catch (err) {
      console.log(err);
      makeToast('Không thể cập nhật hình ảnh!', toastType.error);
    }
  };

  const handleSaveData = () => {
    try {
      let promise;
      if (logo.image !== null && logo.image !== brand.logo) {
        const formData = new FormData();
        formData.append('file', logo.file, logo.filename);
        // upload new image
        promise = new Promise((resolve, reject) => {
          const result = apiUpload.uploadImage(dispatch, formData, accessToken);
          if (result) resolve(result);
          reject(new Error('Cannot upload images!'));
        });
      }

      const updateBrand = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: brand.logo,
        modifiedDate: new Date().toISOString(),
        ...getUpdateByUserInSystem()
      };
      promise?.then(result => {
        updateBrand.logo = result;
      });

      apiBrand.update(dispatch, updateBrand, brand.id, accessToken);
      handleBack();
    } catch (err) {
      console.log(err);
      makeToast('Không thể cập nhật hình ảnh!', toastType.error);
    }
  };

  const renderForm = () => (
    <>
      <div className="mb-3">
        <label htmlFor="brand-name" className="form-label">
          {titleName}
        </label>
        <input
          type="text"
          className="form-control"
          id="brand-name"
          defaultValue={brand?.name}
          ref={nameRef}
          placeholder="ASUS, ACER, DELL, ..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="brand-country" className="form-label">
          {titleCountry}
        </label>
        <input
          type="text"
          className="form-control"
          id="brand-country"
          defaultValue={brand?.country}
          ref={countryRef}
          placeholder="China, USA, ..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="brand-name" className="form-label">
          {titleEstablishDate}
        </label>
        <input
          type="date"
          className="form-control"
          id="brand-name"
          defaultValue={new Date(brand?.establishDate || '2000-01-01')
            .toISOString()
            .slice(0, 10)}
          ref={dateRef}
        />
      </div>
      <div className="mb-3">
        <p>
          {titleLogo + ' '}
          <small className="text-primary">{hintToChooseImage}</small>
        </p>
        <label htmlFor="formFile" className="form-label">
          <img
            style={{ maxWidth: '200px', maxHeight: '150px' }}
            src={logo.image}
            alt={brand?.name || 'new logo'}
          />
          <input
            className="form-control"
            style={{ display: 'none' }}
            type="file"
            id="formFile"
            onChange={handleChangeImage}
          />
        </label>
      </div>
    </>
  );

  return (
    <ModalForm
      object={brand}
      handleBack={handleBack}
      action={() => {
        brand ? handleSaveData() : handleCreateData();
      }}
      FormContent={renderForm}
    />
  );
};

export default BrandForm;
