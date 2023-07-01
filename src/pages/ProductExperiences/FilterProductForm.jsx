import React from 'react';
import Select from 'react-select';

const FilterProductForm = ({
  productOption,
  setProductOption,
  options,
  ...rest
}) => {
  return (
    <Select
      defaultValue={productOption}
      isMulti
      name="productViewList"
      options={options}
      onChange={setProductOption}
    />
  );
};

export default FilterProductForm;
