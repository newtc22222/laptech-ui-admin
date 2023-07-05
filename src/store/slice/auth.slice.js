import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    roleList: null,
    accessToken: null,
    refreshToken: null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, roleList, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.roleList = roleList;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setNewAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setNewUserData: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
      state.roleList = null;
      state.accessToken = null;
      state.refreshToken = null;
    }
  }
});

export const { setCredentials, setNewAccessToken, setNewUserData, logout } =
  authSlice.actions;
export default authSlice.reducer;
