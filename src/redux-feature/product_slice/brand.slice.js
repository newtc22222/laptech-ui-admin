import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandList: null,
  isFetching: false,
  error: false
}

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    fetchBrandStart: (state) => {
      state.isFetching = true;
    },
    fetchBrandFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.brandList = action.payload;
    },
    createBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.brandList = [...state.brandList, action.payload];
    },
    updateBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.brandList = state.brandList.map((brand) => {
        if (brand.id === action.payload.id) {
          return action.payload;
        }
        return brand;
      });
    },
    deleteBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.brandList = state.brandList.filter(brand => brand.id !== action.payload);
    },
  },
});

export const {
  fetchBrandStart,
  fetchBrandFailed,
  getBrandSuccess,
  createBrandSuccess,
  updateBrandSuccess,
  deleteBrandSuccess,
} = brandSlice.actions;

export default brandSlice.reducer;