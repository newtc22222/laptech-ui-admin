import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentList: null,
  isFetching: false,
  error: false
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchCommentStart: (state) => {
      state.isFetching = true;
    },
    fetchCommentFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.commentList = action.payload;
    },
    createCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.commentList = [...state.commentList, action.payload];
    },
    updateCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.commentList = state.commentList.map((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });
    },
    deleteCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.commentList = state.commentList.filter(comment => comment.id !== action.payload);
    },
  },
});

export const {
  fetchCommentStart,
  fetchCommentFailed,
  getCommentSuccess,
  createCommentSuccess,
  updateCommentSuccess,
  deleteCommentSuccess,
} = commentSlice.actions;

export default commentSlice.reducer;