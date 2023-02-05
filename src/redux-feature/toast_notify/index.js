import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: 'toastList',
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      action.payload = {
        id: Math.floor(Math.random() * 1000),
        ...action.payload
      }
      state.push(action.payload);
    },
    removeToast: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  addToast,
  removeToast
} = toastSlice.actions;

export default toastSlice.reducer;