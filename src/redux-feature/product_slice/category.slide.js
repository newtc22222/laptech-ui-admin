import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryList: null,
  isFetching: false,
  error: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoryStart: state => {
      state.isFetching = true;
    },
    fetchCategoryFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.categoryList = action.payload;
    },
    createCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.categoryList = [...state.categoryList, action.payload];
    },
    updateCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.categoryList = state.categoryList.map(category => {
        if (category.id === action.payload.id) {
          return { ...category, ...action.payload };
        }
        return category;
      });
    },
    deleteCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.categoryList = state.categoryList.filter(
        category => category.id !== action.payload
      );
    }
  }
});

export const {
  fetchCategoryStart,
  fetchCategoryFailed,
  getCategorySuccess,
  createCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess
} = categorySlice.actions;

export default categorySlice.reducer;
