import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedbackList: null,
  isFetching: false,
  error: false
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    fetchFeedbackStart: (state) => {
      state.isFetching = true;
    },
    fetchFeedbackFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getFeedbackSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.feedbackList = action.payload;
    },
    createFeedbackSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.feedbackList = [...state.feedbackList, action.payload];
    },
    updateFeedbackSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.feedbackList = state.feedbackList.map((feedback) => {
        if (feedback.id === action.payload.id) {
          return action.payload;
        }
        return feedback;
      });
    },
    removeFeedbackSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.feedbackList = state.feedbackList.filter(feedback => feedback.id !== action.payload);
    },
  },
});

export const {
  fetchFeedbackStart,
  fetchFeedbackFailed,
  getFeedbackSuccess,
  createFeedbackSuccess,
  updateFeedbackSuccess,
  removeFeedbackSuccess,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;