import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiBrands from '../../apis/product/brand.api';
import apiUpload from '../../apis/upload.api';
import useForm from '../../hooks/useForm';
import { addToast } from '../../redux-feature/toast_notify';

const hintToChooseImage_vi = 'Nhấn trực tiếp vào hình ảnh để chọn file';
const hintToChooseImage_en = 'Click image to choose file';

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

  const handleCreateData = async () => {
    try {
      const formData = new FormData();
      formData.append('file', logo.file, logo.filename);
      const result = await apiUpload.uploadImage(formData, accessToken);

      const newBrand = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: result.data
      };

      await apiBrands.createNewBrand(dispatch, newBrand, accessToken);
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

  const handleSaveData = async () => {
    try {
      let result;
      if (logo.image != null && logo.image != brand.logo) {
        const formData = new FormData();
        formData.append('file', logo.file, logo.filename);
        result = await apiUpload.uploadImage(formData, accessToken);
      }

      const updateBrand = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: result?.data || brand.logo
      };

      await apiBrands.updateBrand(dispatch, updateBrand, brand.id, accessToken);
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
            Tên thương hiệu
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
            Quốc gia
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
            Ngày thành lập
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
            Logo của hãng{' '}
            <small className="text-primary">{hintToChooseImage_vi}</small>
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
