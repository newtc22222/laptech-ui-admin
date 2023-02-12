import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiCategories from '../../apis/product/category.api';
import apiUpload from '../../apis/upload.api';
import useForm from '../../hooks/useForm';
import { addToast } from '../../redux-feature/toast_notify';

const CategoryForm = ({ category, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const countryRef = useRef();
  const dateRef = useRef();
  const [logo, setLogo] = useState({
    image: category?.logo || null,
    file: category?.logo || '',
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

      const newCategory = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: result.data
      };

      await apiCategories.createNewCategory(dispatch, newCategory, accessToken);
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
      if (logo.image != null && logo.image != category.logo) {
        const formData = new FormData();
        formData.append('file', logo.file, logo.filename);
        result = await apiUpload.uploadImage(formData, accessToken);
      }

      const updateCategory = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        establishDate: dateRef.current.value,
        logo: result?.data || category.logo
      };

      await apiCategories.updateCategory(
        dispatch,
        updateCategory,
        category.id,
        accessToken
      );
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
    category,
    handleBack,
    () => {
      category ? handleSaveData() : handleCreateData();
    },
    () => (
      <>
        <div className="mb-3">
          <label htmlFor="category-name" className="form-label">
            Tên thương hiệu
          </label>
          <input
            type="text"
            className="form-control"
            id="category-name"
            defaultValue={category?.name}
            ref={nameRef}
            placeholder="ASUS, ACER, DELL, ..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category-country" className="form-label">
            Quốc gia
          </label>
          <input
            type="text"
            className="form-control"
            id="category-country"
            defaultValue={category?.country}
            ref={countryRef}
            placeholder="China, USA, ..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category-name" className="form-label">
            Ngày thành lập
          </label>
          <input
            type="date"
            className="form-control"
            id="category-name"
            defaultValue={new Date(category?.establishDate || '2000-01-01')
              .toISOString()
              .slice(0, 10)}
            ref={dateRef}
          />
        </div>
        <div className="mb-3">
          <p>
            Logo của hãng{' '}
            <small className="text-primary">Click image to choose file</small>
          </p>
          <label htmlFor="formFile" className="form-label">
            <img
              style={{ maxWidth: '200px', maxHeight: '150px' }}
              src={logo.image || 'https://via.placeholder.com/200x150'}
              alt={category?.name || 'new logo'}
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

export default CategoryForm;
