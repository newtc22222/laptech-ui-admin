import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
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
      state.accessToken = null;
      state.refreshToken = null;
    }
  }
});

export const { setCredentials, setNewAccessToken, setNewUserData, logout } =
  authSlice.actions;
export default authSlice.reducer;
