import makeSlice from '../helpers/makeSlice';

const userSlice = makeSlice('user');

export const action = userSlice.actions;
export default userSlice.reducer;
