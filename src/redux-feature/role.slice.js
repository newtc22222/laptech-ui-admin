import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: null,
  isFetching: false,
  error: false
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    fetchRoleStart: (state) => {
      state.isFetching = true;
    },
    fetchRoleFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getRoleSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.roleList = action.payload;
    },
    createRoleSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.roleList = [...state.roleList, action.payload];
    },
    updateRoleSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.roleList = state.roleList.map((role) => {
        if (role.id === action.payload.id) {
          return action.payload;
        }
        return role;
      });
    },
    deleteRoleSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.roleList = state.roleList.filter(role => role.id !== action.payload);
    },
  },
});

export const {
  fetchRoleStart,
  fetchRoleFailed,
  getRoleSuccess,
  createRoleSuccess,
  updateRoleSuccess,
  deleteRoleSuccess,
} = roleSlice.actions;

export default roleSlice.reducer;