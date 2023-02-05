import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  labelList: null,
  isFetching: false,
  error: false
}

const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    fetchLabelStart: (state) => {
      state.isFetching = true;
    },
    fetchLabelFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getLabelSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.labelList = action.payload;
    },
    createLabelSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.labelList = [...state.labelList, action.payload];
    },
    updateLabelSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.labelList = state.labelList.map((label) => {
        if (label.id === action.payload.id) {
          return action.payload;
        }
        return label;
      });
    },
    removeLabelSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.labelList = state.labelList.filter(label => label.id !== action.payload);
    },
  },
});

export const {
  fetchLabelStart,
  fetchLabelFailed,
  getLabelSuccess,
  createLabelSuccess,
  updateLabelSuccess,
  removeLabelSuccess,
} = labelSlice.actions;

export default labelSlice.reducer;