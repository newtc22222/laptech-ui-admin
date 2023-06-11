import makeSlice from '../common/makeSlice';

const userSlice = makeSlice('user');

export const action = userSlice.actions;
export default userSlice.reducer;
