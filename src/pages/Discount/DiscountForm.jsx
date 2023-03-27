import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/common/ModalForm';

import apiDiscount from '../../apis/product/discount.api';

import { getUpdateByUserInSystem } from '../../utils/getUserInSystem';

const titleCode = 'Mã được sử dụng';
const titleAppliedType = 'Kiểu giảm giá';
const titleDiscount = 'Mức giảm giá';
const titleRate = 'Tỉ lệ (0 - 80)%';
const titleMaxAmount = 'Mức giá tối đa';
const titleTime = 'Thời gian áp dụng';
const titleAppliedDate = 'Bắt đầu';
const titleEndedDate = 'Kết thúc';

const appliedTypeCombobox = ['PRODUCT', 'PURCHASE'];

const DiscountForm = ({ discount, handleBack }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const codeRef = useRef();
  const rateRef = useRef();
  const [appliedType, setAppliedType] = useState(
    discount?.appliedType || appliedTypeCombobox[0]
  );
  const maxAmountRef = useRef();
  const appliedDateRef = useRef();
  const endedDateRef = useRef();

  const handleCreateData = async () => {
    const newDiscount = {
      code: codeRef.current.value,
      rate: rateRef.current.value / 100,
      appliedType: appliedType,
      maxAmount: maxAmountRef.current.value,
      appliedDate: appliedDateRef.current.value,
      endedDate: endedDateRef.current.value,
      ...getUpdateByUserInSystem()
    };
    await apiDiscount.create(dispatch, newDiscount, accessToken);
    handleBack();
  };

  const handleSaveData = async () => {
    const newDiscount = {
      code: codeRef.current.value,
      rate: rateRef.current.value / 100,
      appliedType: appliedType,
      maxAmount: maxAmountRef.current.value,
      appliedDate: appliedDateRef.current.value,
      endedDate: endedDateRef.current.value,
      modifiedDate: new Date().toISOString(),
      ...getUpdateByUserInSystem()
    };
    await apiDiscount.update(dispatch, newDiscount, discount.id, accessToken);
    handleBack();
  };

  const renderForm = (
    <>
      <div className="mb-3">
        <label htmlFor="discount-code" className="form-discount">
          {titleCode}
        </label>
        <input
          type="text"
          className="form-control"
          id="discount-code"
          defaultValue={discount?.code}
          ref={codeRef}
          placeholder="BANOIDUNGNGAI, LUONGDAVE, ..."
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="discount-applied-type" className="form-discount">
          {titleAppliedType}
        </label>
        <select
          className="form-control"
          id="discount-applied-type"
          defaultValue={discount?.appliedType || appliedType}
          onChange={e => setAppliedType(e.target.value)}
          placeholder="BANOIDUNGNGAI, LUONGDAVE, ..."
        >
          {appliedTypeCombobox.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="fw-bold">{titleDiscount}</legend>
        <div className="row">
          <div className="col-4 mb-3">
            <label htmlFor="discount-rate" className="form-discount">
              {titleRate}
            </label>
            <input
              id="discount-rate"
              type="number"
              min="0"
              max="80"
              className="form-control"
              onChange={e => {
                if (e.target.value < 0) e.target.value = 0;
                if (e.target.value > 80) e.target.value = 80;
              }}
              defaultValue={discount?.rate * 100 || 5}
              ref={rateRef}
            />
          </div>
          <div className="col-8 mb-3">
            <label htmlFor="discount-max-amount" className="form-discount">
              {titleMaxAmount}
            </label>
            <input
              id="discount-max-amount"
              type="number"
              min="0"
              className="form-control"
              onChange={e => {
                if (e.target.value < 0) e.target.value = 0;
              }}
              defaultValue={discount?.maxAmount || 50000}
              ref={maxAmountRef}
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="fw-bold">{titleTime}</legend>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="discount-applied-date" className="form-discount">
              {titleAppliedDate}
            </label>
            <input
              id="discount-applied-date"
              type="datetime-local"
              className="form-control"
              defaultValue={
                discount?.appliedDate || new Date().toJSON().slice(0, 19)
              }
              ref={appliedDateRef}
            />
          </div>
          <div className="col mb-3">
            <label htmlFor="discount-ended-date" className="form-discount">
              {titleEndedDate}
            </label>
            <input
              id="discount-ended-date"
              type="datetime-local"
              className="form-control"
              defaultValue={
                discount?.endedDate ||
                new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
                  .toJSON()
                  .slice(0, 19)
              }
              ref={endedDateRef}
            />
          </div>
        </div>
      </fieldset>
    </>
  );

  return (
    <ModalForm
      object={discount}
      handleBack={handleBack}
      action={() => {
        discount ? handleSaveData() : handleCreateData();
      }}
    >
      {renderForm}
    </ModalForm>
  );
};

export default DiscountForm;
