import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';

import apiCategories from '../../apis/product/category.api';
import apiUpload from '../../apis/upload.api';

import { addToast } from '../../redux-feature/toast_notify';
import { getUpdateByUserInSystem } from '../../helper/getUser';

const titleName = 'Tên phân loại';
const titleDescription = 'Mô tả chung';
const titleImage = 'Hình ảnh đại diện';
const hintToChooseImage = 'Nhấn trực tiếp vào hình ảnh để chọn file';

const CategoryForm = ({ category, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState({
    image: category?.image || null,
    file: category?.image || '',
    filename: ''
  });

  const handleChangeImage = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        setImage({
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
      formData.append('file', image.file, image.filename);
      const promise = new Promise((resolve, reject) => {
        const result = apiUpload.uploadImage(dispatch, formData, accessToken);
        if (result) resolve(result);
        reject(new Error('Cannot upload images!'));
      });

      promise.then(result => {
        const newCategory = {
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          image: result,
          ...getUpdateByUserInSystem()
        };

        apiCategories.createNewCategory(dispatch, newCategory, accessToken);
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
      if (image.image != null && image.image != category.image) {
        const formData = new FormData();
        formData.append('file', image.file, image.filename);

        promise = new Promise((resolve, reject) => {
          const result = apiUpload.uploadImage(dispatch, formData, accessToken);
          if (result) resolve(result);
          reject(new Error('Cannot upload images!'));
        });
      }

      const updateCategory = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        image: category.image,
        ...getUpdateByUserInSystem()
      };

      promise?.then(result => {
        updateCategory.image = result;
      });

      apiCategories.updateCategory(
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
            {titleName}
          </label>
          <input
            type="text"
            className="form-control"
            id="category-name"
            defaultValue={category?.name}
            ref={nameRef}
            placeholder="Laptop, Screen, Speaker, Keyboard, ..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category-description" className="form-label">
            {titleDescription}
          </label>
          <input
            type="text"
            className="form-control"
            id="category-description"
            defaultValue={category?.description}
            ref={descriptionRef}
            placeholder="Properties, Status, Base model ?"
          />
        </div>
        <div className="mb-3">
          <p>
            {titleImage + ' '}
            <small className="text-primary">{hintToChooseImage}</small>
          </p>
          <label htmlFor="formFile" className="form-label">
            <img
              style={{ maxWidth: '200px', maxHeight: '150px' }}
              src={image.image || 'https://via.placeholder.com/200x150'}
              alt={category?.name || 'new image'}
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
