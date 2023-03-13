import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
// import { removeVietnameseTones } from '../../utils/HandleText';

import apiBrands from '../../apis/product/brand.api';
import apiUpload from '../../apis/upload.api';

import { addToast } from '../../redux-feature/toast_notify';
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
    image: brand?.logo || null,
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

      promise.then(result => {
        const newBrand = {
          name: nameRef.current.value,
          country: countryRef.current.value,
          establishDate: dateRef.current.value,
          logo: result,
          ...getUpdateByUserInSystem()
        };
        apiBrands.createNewBrand(dispatch, newBrand, accessToken);
        handleBack();
      });
    } catch (err) {
      console.log(err);
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Bạn chưa cập nhật hình ảnh cho ứng dụng!'
        })
      );
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

      apiBrands.updateBrand(dispatch, updateBrand, brand.id, accessToken);
      handleBack();
    } catch (err) {
      console.log(err);
      dispatch(
        addToast({
          type: 'error',
          title: 'Lỗi hệ thống',
          content: 'Bạn chưa cập nhật hình ảnh cho ứng dụng!'
        })
      );
    }
  };

  return useForm(
    brand,
    handleBack,
    () => {
      brand ? handleSaveData() : handleCreateData();
    },
    () => (
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
              src={logo.image || 'https://via.placeholder.com/200x150'}
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
    )
  );
};

export default BrandForm;
