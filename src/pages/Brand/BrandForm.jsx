import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import apiBrands from '../../apis/product/brand.api';
import apiUpload from '../../apis/upload.api';
import { addToast } from '../../redux-feature/toast_notify';

const BrandForm = ({ brand, handleBack }) => {
  let editMode = false;
  if (brand) editMode = true;

  const token = localStorage.getItem('jwtToken');
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
      const result = await apiUpload.uploadImage(formData, token);

      const newBrand = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: result.data
      };

      await apiBrands.createNewBrand(dispatch, newBrand, token);
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
        result = await apiUpload.uploadImage(formData, token);
      }

      const updateBrand = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: result?.data || brand.logo
      };

      await apiBrands.updateBrand(dispatch, updateBrand, brand.id, token);
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

  return (
    <div className="container mt-3 shadow p-3 mb-5 bg-body rounded">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{brand ? 'Sửa thông tin' : 'Thêm thông tin mới'}</h1>
        <div>
          <button
            className="btn btn-primary fw-bold me-3"
            onClick={() => {
              brand ? handleSaveData() : handleCreateData();
            }}
          >
            Lưu thông tin
          </button>
          <button className="btn btn-secondary fw-bold" onClick={handleBack}>
            Trở lại
          </button>
        </div>
      </div>
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
        <label htmlFor="formFile" className="form-label">
          Logo của hãng
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={handleChangeImage}
        />
      </div>
      <img
        style={{ maxWidth: '200px', maxHeight: '150px' }}
        src={logo.image || 'https://via.placeholder.com/200x150'}
        alt={brand?.name || 'new logo'}
      />
    </div>
  );
};

export default BrandForm;
