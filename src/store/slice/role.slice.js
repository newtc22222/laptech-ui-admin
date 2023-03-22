import makeSlice from '../helpers/makeSlice';

const roleSlice = makeSlice('role');

export const action = roleSlice.actions;
export default roleSlice.reducer;
