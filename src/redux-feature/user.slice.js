import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
  isFetching: false,
  error: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.isFetching = true;
    },
    fetchUserFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList = action.payload;
    },
    createUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList = [...state.userList, action.payload];
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList = state.userList.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    removeUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList = state.userList.filter(user => user.id !== action.payload);
    },
  },
});

export const {
  fetchUserStart,
  fetchUserFailed,
  getUserSuccess,
  createUserSuccess,
  updateUserSuccess,
  removeUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;