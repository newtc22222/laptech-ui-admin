import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import apiBrands from '../../apis/product/brand.api';

import BrandTable from './BrandTable';
import ModalCustom from '../../components/Modal';
import BrandForm from './BrandForm';

const WorkMode = {
  view: 'VIEW',
  create: 'CREATE',
  edit: 'EDIT'
};

const BrandPage = () => {
  const token = localStorage.getItem('jwtToken');
  const dispatch = useDispatch();
  const { brandList, isFetching, error } = useSelector(state => state.brands);
  const [workMode, setWorkMode] = useState(WorkMode.view);
  const [brandEdit, setBrandEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  useEffect(() => {
    apiBrands.getAllBrands(dispatch);
  }, []);

  const handleSetCreateMode = () => {
    setBrandEdit(null);
    setWorkMode(WorkMode.create);
  };

  const handleSetUpdateMode = useCallback(brand => {
    setBrandEdit(brand);
    setWorkMode(WorkMode.edit);
  }, []);

  const handleDelete = useCallback(brandId => {
    apiBrands.removeBrand(dispatch, brandId, token);
  }, []);

  const handleShowDeleteModal = useCallback((brandId, brandName) => {
    setModalValue({
      title: 'Xác nhận xoá thông tin thương hiệu',
      content: `Bạn có thực sự muốn loại bỏ thương hiệu ${brandName} khỏi hệ thống không?`,
      handleDelete: () => {
        handleDelete(brandId);
        setShowModal(false);
      }
    });
    setShowModal(true);
  }, []);

  if (workMode === WorkMode.create) {
    return <BrandForm handleBack={() => setWorkMode(WorkMode.view)} />;
  }

  if (workMode === WorkMode.edit) {
    return (
      <BrandForm
        brand={brandEdit}
        handleBack={() => setWorkMode(WorkMode.view)}
      />
    );
  }

  if (isFetching) {
    return (
      <div className="text-center">
        <div
          className="spinner-grow text-primary"
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showModal && (
        <ModalCustom
          show={showModal}
          setShow={setShowModal}
          props={modalValue}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thương hiệu</h1>
        <button
          className="btn btn-primary fw-bold"
          onClick={handleSetCreateMode}
        >
          Thêm thông tin
        </button>
      </div>
      <BrandTable
        brandList={brandList}
        handleSetUpdateMode={brand => handleSetUpdateMode(brand)}
        handleShowDeleteModal={(id, name) => handleShowDeleteModal(id, name)}
      />
    </div>
  );
};

export default BrandPage;
